import React from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import {MaterialIcons, FontAwesome} from "@expo/vector-icons";

// Dummy data for posts
const dummyPosts = [
    {
        id: 1,
        username: "john_doe",
        handle: "@johndoe",
        time: "2h",
        content: "Just finished an amazing React Native project! The expo router makes navigation so much easier. 🚀",
        likes: 24,
        comments: 5,
        retweets: 8,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    {
        id: 2,
        username: "jane_smith",
        handle: "@janesmith",
        time: "4h",
        content: "Beautiful sunset today! Sometimes you need to step away from the code and enjoy nature 🌅",
        likes: 67,
        comments: 12,
        retweets: 23,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
        id: 3,
        username: "dev_guru",
        handle: "@devguru",
        time: "6h",
        content: "Pro tip: Always test your mobile app on real devices. Simulators are great but nothing beats the real thing! 📱",
        likes: 89,
        comments: 18,
        retweets: 34,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
        id: 4,
        username: "design_lover",
        handle: "@designlover",
        time: "8h",
        content: "Clean UI is not just about looks - it's about creating intuitive user experiences that delight users ✨",
        likes: 156,
        comments: 28,
        retweets: 67,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    }
];

const PostCard = ({post}: {post: typeof dummyPosts[0]}) => (
    <View className="bg-white mx-4 mb-4 rounded-xl p-4 shadow-sm border border-gray-100">
        <View className="flex-row items-start mb-3">
            <View className="w-12 h-12 rounded-full bg-gray-200 mr-3" />
            <View className="flex-1">
                <View className="flex-row items-center">
                    <Text className="font-semibold text-gray-900 mr-1">{post.username}</Text>
                    <Text className="text-gray-500 text-sm mr-2">{post.handle}</Text>
                    <Text className="text-gray-500 text-sm">·</Text>
                    <Text className="text-gray-500 text-sm ml-2">{post.time}</Text>
                </View>
            </View>
        </View>
        
        <Text className="text-gray-900 leading-5 mb-4">{post.content}</Text>
        
        <View className="flex-row justify-between pt-2 border-t border-gray-100">
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="comment-o" size={16} color="#6B7280" />
                <Text className="ml-2 text-gray-500 text-sm">{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="retweet" size={16} color="#6B7280" />
                <Text className="ml-2 text-gray-500 text-sm">{post.retweets}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="heart-o" size={16} color="#6B7280" />
                <Text className="ml-2 text-gray-500 text-sm">{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="share" size={16} color="#6B7280" />
            </TouchableOpacity>
        </View>
    </View>
);

const QuickActionBox = ({icon, title, color}: {icon: string, title: string, color: string}) => (
    <TouchableOpacity className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 items-center justify-center" style={{backgroundColor: `${color}10`}}>
        <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{backgroundColor: color}}>
            <MaterialIcons name={icon as any} size={24} color="white" />
        </View>
        <Text className="text-gray-700 font-medium text-sm text-center">{title}</Text>
    </TouchableOpacity>
);

export default function PostsPage() {
    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-gray-900">Posts</Text>
                    <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center" style={{backgroundColor: '#F86900'}}>
                        <MaterialIcons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Quick Actions - 4 boxes */}
                <View className="p-4">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</Text>
                    <View className="flex-row justify-between mb-6">
                        <View className="w-[22%]">
                            <QuickActionBox icon="create" title="Create Post" color="#F86900" />
                        </View>
                        <View className="w-[22%]">
                            <QuickActionBox icon="photo" title="Photo" color="#10B981" />
                        </View>
                        <View className="w-[22%]">
                            <QuickActionBox icon="videocam" title="Video" color="#3B82F6" />
                        </View>
                        <View className="w-[22%]">
                            <QuickActionBox icon="poll" title="Poll" color="#8B5CF6" />
                        </View>
                    </View>
                </View>

                {/* Posts Feed */}
                <View className="pb-20">
                    <View className="px-4 mb-4">
                        <Text className="text-lg font-semibold text-gray-900">Recent Posts</Text>
                    </View>
                    
                    {dummyPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
