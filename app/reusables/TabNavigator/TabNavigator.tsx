import { Roboto_600SemiBold, useFonts } from "@expo-google-fonts/roboto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";


// Tab's Pages to render.
import Journey from "@/app/(tabs)/Journey";
import Space from "@/app/(tabs)/Space";
import You from "@/app/(tabs)/You";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    let [fontsLoaded] = useFonts({
        Roboto_600SemiBold
    });
    
    if (!fontsLoaded) {
        return;
    }

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    

                    if (route.name === "Journey") {
                        iconSource = require("../../../assets/images/tab_icons/Journey.png")
                    } else if (route.name === "Space") {
                        iconSource = require("../../../assets/images/tab_icons/Space.png")
                    } else if (route.name === "You") {
                        iconSource = require("../../../assets/images/tab_icons/You.png")
                    }

                    return <Image 
                        source={iconSource} 
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? "#6BD6CF" : "#F0F0F0",
                        }}
                    />
                }, 
                tabBarLabelStyle: {
                    fontFamily: 'Roboto_600SemiBold',
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 4,
                },
                tabBarStyle: {
                    height: 75,
                    backgroundColor: "#101B29",
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: "#6BD6CF",
                tabBarInactiveTintColor: "#F0F0F0",
            })}
        
        >
            <Tab.Screen name="Journey" component={Journey} />
            <Tab.Screen name="Space" component={Space} />
            <Tab.Screen name="You" component={You} />
        </Tab.Navigator>
    )
}

export default TabNavigator;