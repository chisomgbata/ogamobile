import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from "react-native";
import {MaterialIcons, FontAwesome} from "@expo/vector-icons";

// Dummy notifications data
const dummyNotifications = [
    {
        id: 1,
        type: 'like',
        title: 'New Like',
        message: 'john_doe liked your post about React Native development',
        time: '2 minutes ago',
        read: false,
        icon: 'favorite',
        iconColor: '#EF4444'
    },
    {
        id: 2,
        type: 'comment',
        title: 'New Comment',
        message: 'jane_smith commented on your post: "Great insights!"',
        time: '15 minutes ago',
        read: false,
        icon: 'chat-bubble',
        iconColor: '#3B82F6'
    },
    {
        id: 3,
        type: 'follow',
        title: 'New Follower',
        message: 'dev_guru started following you',
        time: '1 hour ago',
        read: true,
        icon: 'person-add',
        iconColor: '#10B981'
    },
    {
        id: 4,
        type: 'system',
        title: 'App Update',
        message: 'New features available! Update to the latest version',
        time: '2 hours ago',
        read: true,
        icon: 'system-update',
        iconColor: '#F86900'
    },
    {
        id: 5,
        type: 'mention',
        title: 'Mentioned You',
        message: 'design_lover mentioned you in a post about UI design',
        time: '3 hours ago',
        read: true,
        icon: 'alternate-email',
        iconColor: '#8B5CF6'
    },
    {
        id: 6,
        type: 'like',
        title: 'Multiple Likes',
        message: 'Your post received 25+ likes in the last hour',
        time: '4 hours ago',
        read: true,
        icon: 'favorite',
        iconColor: '#EF4444'
    }
];

const NotificationCard = ({notification}: {notification: typeof dummyNotifications[0]}) => (
    <TouchableOpacity className={`bg-white mx-4 mb-3 rounded-xl p-4 border ${
        notification.read ? 'border-gray-100' : 'border-[#F86900] border-opacity-20 bg-orange-50'
    }`}>
        <View className="flex-row items-start">
            <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{backgroundColor: `${notification.iconColor}15`}}
            >
                <MaterialIcons 
                    name={notification.icon as any} 
                    size={20} 
                    color={notification.iconColor} 
                />
            </View>
            
            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="font-semibold text-gray-900">{notification.title}</Text>
                    {!notification.read && (
                        <View className="w-2 h-2 rounded-full" style={{backgroundColor: '#F86900'}} />
                    )}
                </View>
                
                <Text className="text-gray-600 leading-5 mb-2">{notification.message}</Text>
                
                <Text className="text-sm text-gray-400">{notification.time}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const FilterTab = ({title, active, onPress}: {title: string, active: boolean, onPress: () => void}) => (
    <TouchableOpacity
        className={`px-4 py-2 rounded-full mr-3 ${
            active ? 'bg-[#F86900]' : 'bg-gray-100'
        }`}
        onPress={onPress}
    >
        <Text className={`font-medium ${
            active ? 'text-white' : 'text-gray-600'
        }`}>
            {title}
        </Text>
    </TouchableOpacity>
);

export default function NotificationPage() {
    const [activeFilter, setActiveFilter] = React.useState('All');
    const filterOptions = ['All', 'Unread', 'Likes', 'Comments', 'Follows'];
    
    const unreadCount = dummyNotifications.filter(n => !n.read).length;
    
    const filteredNotifications = dummyNotifications.filter(notification => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Unread') return !notification.read;
        if (activeFilter === 'Likes') return notification.type === 'like';
        if (activeFilter === 'Comments') return notification.type === 'comment';
        if (activeFilter === 'Follows') return notification.type === 'follow';
        return true;
    });

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
                <View className="flex-row items-center justify-between mb-4">
                    <View>
                        <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
                        {unreadCount > 0 && (
                            <Text className="text-sm text-gray-500 mt-1">
                                {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                        <MaterialIcons name="done-all" size={20} color="#6B7280" />
                    </TouchableOpacity>
                </View>
                
                {/* Filter Tabs */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                >
                    {filterOptions.map((option) => (
                        <FilterTab
                            key={option}
                            title={option}
                            active={activeFilter === option}
                            onPress={() => setActiveFilter(option)}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Notifications List */}
            <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
                {filteredNotifications.length > 0 ? (
                    <>
                        {filteredNotifications.map((notification) => (
                            <NotificationCard key={notification.id} notification={notification} />
                        ))}
                        <View className="h-20" />
                    </>
                ) : (
                    <View className="flex-1 items-center justify-center mt-20">
                        <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
                            <MaterialIcons name="notifications-off" size={32} color="#9CA3AF" />
                        </View>
                        <Text className="text-lg font-medium text-gray-600 mb-2">No notifications</Text>
                        <Text className="text-gray-500 text-center px-8">
                            You're all caught up! No {activeFilter.toLowerCase()} notifications at the moment.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
