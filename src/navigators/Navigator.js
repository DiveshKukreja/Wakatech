import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/Ionicons";
import Home from '../screen/Home';
import Productdetails from '../screen/Producrdetails';


const Stack = createNativeStackNavigator();

const Navigator = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true
                }}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="Productdetails"
                    component={Productdetails}
                    options={{ headerShown: false }}
                >
                </Stack.Screen>
            </Stack.Navigator>

        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#222831'
    },
})

export default Navigator;