import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	Image,
	Pressable,
	Animated,
	TouchableOpacity,
	Platform,
} from "react-native";
import MapView, {
	AnimatedRegion,
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import SlidingUpPanel from "rn-sliding-up-panel";
import HeaderBar from "src/components/HeaderBar";
import Rating from "src/components/Rating";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import { MapStyle } from "src/styles";

interface Hotel {
	id: string;
	name: string;
	image: any;
	rate: number;
	price: number;
	latlng: {
		latitude: number;
		longitude: number;
	};
}

const Place: React.FC<any> = ({ navigation, route }) => {
	const [selectedPlace, setSelectedPlace] = useState(route.params);
	const [selectedHotel, setSelectedHotel] = useState<Partial<Hotel> | null>(
		null
	);
	const [allowDragging, setAllowDragging] = useState(true);
	const mapView = useRef<MapView | null>(null);
	const draggedValue = useRef(new Animated.Value(0)).current;
	const panel = useRef<SlidingUpPanel | null>(null);

	useEffect(() => {
		draggedValue.addListener((valueObj) => {
			if (valueObj.value > SIZES.height) {
				setAllowDragging(false);
			}
		});
		return () => {
			draggedValue.removeAllListeners();
		};
	}, []);

	const renderPlace = () => {
		return (
			<ImageBackground
				source={selectedPlace?.image}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<HeaderBar
					title=""
					leftOnPressed={() => navigation.goBack()}
					right={false}
					containerStyle={{
						marginTop: SIZES.padding,
					}}
				/>
				<View
					style={{
						flex: 1,
						paddingHorizontal: SIZES.padding,
						justifyContent: "flex-end",
						marginBottom: 100,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.largeTitle,
							}}
						>
							{selectedPlace?.name}
						</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									marginRight: 5,
									color: COLORS.white,
									...FONTS.h3,
								}}
							>
								{selectedPlace?.rate}
							</Text>
							<Image
								source={icons.star}
								style={{
									width: 20,
									height: 20,
								}}
							/>
						</View>
					</View>
					<Text
						style={{
							marginTop: SIZES.base,
							color: COLORS.white,
							...FONTS.body3,
						}}
					>
						{selectedPlace?.description}
					</Text>

					<TextIconButton
						containerStyle={{
							marginTop: SIZES.padding,
						}}
						label="Book a flight"
						icon={icons.aeroplane}
						onPress={() => console.log("Book a flight")}
					/>
				</View>
			</ImageBackground>
		);
	};

	const renderMap = () => {
		return (
			<SlidingUpPanel
				ref={panel}
				draggableRange={{ top: SIZES.height + 120, bottom: 120 }}
				showBackdrop={true}
				snappingPoints={[SIZES.height + 120]}
				height={SIZES.height + 120}
				friction={0.8}
				allowDragging={allowDragging}
				animatedValue={draggedValue}
				onBottomReached={() => setAllowDragging(true)}
				// allowDragging={false}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "transparent",
					}}
				>
					{/* Panel Header */}

					<TouchableOpacity
						style={{
							height: 120,
							backgroundColor: "transparent",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Image
							source={icons.up_arrow}
							style={{
								width: 20,
								height: 20,
								tintColor: COLORS.white,
							}}
						/>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.h3,
							}}
						>
							SWIPE UP
						</Text>
					</TouchableOpacity>
					{/* Panel Detail  */}
					<View
						style={{
							flex: 1,
							backgroundColor: COLORS.white,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<MapView
							ref={mapView}
							style={{
								flex: 1,
								width: "100%",
								height: "100%",
							}}
							customMapStyle={MapStyle}
							provider={PROVIDER_GOOGLE}
							initialRegion={{
								latitude: 1.557177,
								longitude: 110.351902,
								latitudeDelta: 0.0053,
								longitudeDelta: 0.0044,
							}}
						>
							{selectedPlace?.hotels.map(
								(
									hotel: {
										latlng: LatLng | AnimatedRegion;
										id: string | undefined;
									},
									index: number
								) => (
									<Marker
										key={`Map-${index}`}
										coordinate={hotel.latlng}
										onPress={() => {
											setSelectedHotel(hotel);
										}}
										// icon={
										// 	selectedHotel?.id == hotel.id
										// 		? icons.bed_on
										// 		: icons.bed_off
										// }
									>
										<Image
											source={
												selectedHotel?.id === hotel.id
													? icons.bed_on
													: icons.bed_off
											}
											style={{
												height:
													selectedHotel?.id ===
													hotel.id
														? 50
														: 40,
												width:
													selectedHotel?.id ===
													hotel.id
														? 50
														: 40,
											}}
										/>
									</Marker>
								)
							)}
						</MapView>
						<HeaderBar
							title={selectedPlace?.name}
							leftOnPressed={() => panel.current?.hide()}
							right={true}
							containerStyle={{
								position: "absolute",
								top: SIZES.padding * 2,
							}}
						/>
						{/* Hotel Details  */}
						{selectedHotel && (
							<View
								style={{
									position: "absolute",
									bottom: 30,
									left: 0,
									right: 0,
									padding: SIZES.radius,
								}}
							>
								<Text
									style={{
										color: COLORS.white,
										...FONTS.h1,
									}}
								>
									Hotels in {selectedPlace?.name}
								</Text>
								<View
									style={{
										flexDirection: "row",
										marginTop: SIZES.radius,
										padding: SIZES.radius,
										borderRadius: 15,
										backgroundColor:
											COLORS.transparentBlack1,
									}}
								>
									<Image
										source={selectedHotel?.image}
										resizeMode="cover"
										style={{
											width: 90,
											height: 120,
											borderRadius: 15,
										}}
									/>
									<View
										style={{
											flex: 1,
											marginLeft: SIZES.radius,
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												color: COLORS.white,
												...FONTS.h3,
											}}
										>
											{selectedHotel?.name}
										</Text>
										<Rating
											containerStyle={{
												marginTop: SIZES.base,
											}}
											rate={selectedHotel?.rate}
										/>
										<View
											style={{
												flexDirection: "row",
												marginTop: SIZES.base,
											}}
										>
											<TextButton
												label="Details"
												containerStyle={{
													marginTop: SIZES.base,
													height: 45,
													width: 100,
												}}
												labelStyle={{
													...FONTS.h3,
												}}
												onPress={() =>
													console.log("Details")
												}
											/>
											<View
												style={{
													flex: 1,
													alignItems: "flex-end",
													justifyContent: "center",
												}}
											>
												<Text
													style={{
														color: COLORS.lightGray,
														...FONTS.body3,
													}}
												>
													from ${" "}
													{selectedHotel?.price} /
													night
												</Text>
											</View>
										</View>
									</View>
								</View>
							</View>
						)}
					</View>
				</View>
			</SlidingUpPanel>
		);
	};

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			{renderPlace()}
			{renderMap()}
		</View>
	);
};

export default Place;
