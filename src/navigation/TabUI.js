import React, { Component, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Cart, Home, Profile, Search } from '../screens'
import { colors, icons } from '../constants';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.main,
    tabBarInactiveTintColor: colors.placeholder,
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;

        const iconName = screenName == 'Home' ? icons.home :
            (screenName == 'Cart' ? icons.cart : 
            (screenName == 'Search' ? icons.search  : icons.profile))
        return <Image
            style={{
                height: 20,
                width: 20,
                tintColor: focused ? colors.main : colors.placeholder,
                resizeMode: 'contain'
            }}
            source={iconName}
        />
    }
})

const TabUI = (props) => {
    return <Tab.Navigator
        screenOptions={screenOptions}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Search' component={Search} />
        <Tab.Screen name='Cart' component={Cart} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
}

export default TabUI;