import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";


import Journey from "@/app/screens/MainPages/Journey";
import Space from "@/app/screens/MainPages/Space";
import You from "@/app/screens/MainPages/You";

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            
        
        >
            <Tab.Screen name="Journey" component={Journey} />
            <Tab.Screen name="Space" component={Space} />
            <Tab.Screen name="You" component={You} />
        </Tab.Navigator>
    )
}

export default TabNavigator;