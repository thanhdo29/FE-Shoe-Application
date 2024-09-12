import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const TabBar = ({ state, descriptors, navigation }: any) => {

    const icons: Record<string, (props: any) => JSX.Element> = {
        "(tabs)/home": (props: any) => <Feather name="home" size={24} color="black" {...props} />,
        "(tabs)/favourite": (props: any) => <AntDesign name="hearto" size={24} color="black" {...props} />,
        "(tabs)/notification": (props: any) => <Ionicons name="notifications-outline" size={24} color="black" {...props} />,
        "(tabs)/setting": (props: any) => <Ionicons name="settings-outline" size={24} color="black" {...props} />,

    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabBarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        {icons[route.name]({ color: isFocused ? '#5B9EE1' : '#222' })}
                        <Text style={{ color: isFocused ? '#5B9EE1' : '#222', fontSize:11 }}>
                            {typeof label === 'string' ? label : ''}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: "continuous",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    }
});
