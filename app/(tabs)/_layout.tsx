import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';
import {MaterialIcons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#F86900',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: -1 },
                shadowRadius: 4,
            },
            headerShown: false,
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Posts',
                    tabBarIcon: ({color}) => <MaterialIcons size={28} name="dashboard" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="comments" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="bell" color={color}/>,
                }}
            />
        </Tabs>
    );
}
