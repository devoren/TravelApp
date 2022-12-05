import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "src/constants";

const TextButton: React.FC<any> = ({ containerStyle, rate }) => {
	const starComponents = [];
	for (var i = 0; i < rate; i++) {
		starComponents.push(
			<Image
				key={`full-${i}`}
				source={icons.star}
				resizeMode="cover"
				style={{
					marginLeft: i == 0 ? 0 : 5,
					width: 15,
					height: 15,
				}}
			/>
		);
	}
	return (
		<View
			style={{
				flexDirection: "row",
				...containerStyle,
			}}
		>
			{starComponents}
		</View>
	);
};

export default TextButton;
