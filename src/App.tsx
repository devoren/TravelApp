import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import React from "react";

import Tabs from "./navigation/Tabs";
import { Place } from "./screens";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
				initialRouteName={"MainScreen"}
			>
				<Stack.Screen name="MainScreen" component={Tabs} />
				<Stack.Screen name="Place" component={Place} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
