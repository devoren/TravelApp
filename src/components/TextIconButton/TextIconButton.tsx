import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "src/constants";

const TextIconButton: React.FC<any> = ({
	label,
	containerStyle,
	labelStyle,
	icon,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				height: 60,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: SIZES.radius,
				backgroundColor: COLORS.white,
				...containerStyle,
			}}
			onPress={onPress}
		>
			<Text
				style={{
					marginRight: SIZES.base,
					...FONTS.h2,
					...labelStyle,
				}}
			>
				{label}
			</Text>
			<Image
				source={icon}
				style={{
					width: 25,
					height: 25,
				}}
			/>
		</TouchableOpacity>
	);
};

export default TextIconButton;
