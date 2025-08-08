import {Tabs} from 'expo-router';
import {MaterialIcons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#F86900',
            tabBarInactiveTintColor: 'gray',
            animation: "shift",
            tabBarStyle: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0.1,
                shadowOffset: {width: 0, height: -1},
                shadowRadius: 4,
            },
            headerShown: false,
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Posts',
                    tabBarIcon: ({color}) => <MaterialIcons size={22} name="dashboard" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({color}) => <MaterialIcons size={22} name="comment" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({color}) => <MaterialIcons size={22} name="notifications" color={color}/>,
                }}
            />
        </Tabs>
    );
}
