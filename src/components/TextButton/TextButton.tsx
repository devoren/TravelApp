import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "src/constants";

const TextButton: React.FC<any> = ({
	label,
	containerStyle,
	labelStyle,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				height: 55,
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
					...FONTS.h2,
					...labelStyle,
				}}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default TextButton;
