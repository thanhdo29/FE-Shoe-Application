import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBar from '~/components/atoms/TabBar';
import Home from './home';
import Favourite from './favourite';
import Notification from './notification';
import Setting from './setting';

const _layout = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen
                component={Home}
                name='(tabs)/home'
                options={{ title: "Home", headerShown: false }}
            />
            <Tab.Screen
                component={Favourite}
                name='(tabs)/favourite'
                options={{ title: "Favourite", headerShown: false }}
            />
            
            <Tab.Screen
                component={Notification}
                name='(tabs)/notification'
                options={{ title: "Notification", headerShown: false }}
            />
            <Tab.Screen
                component={Setting}
                name='(tabs)/setting'
                options={{ title: "Setting", headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default _layout;
