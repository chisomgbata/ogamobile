import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';
import {EvilIcons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#F86900',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                elevation: 0,
            },

        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <EvilIcons size={28} name="heart" color={color}/>,
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
                    title: 'Settings',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="cog" color={color}/>,
                }}
            />
        </Tabs>
    );
}
