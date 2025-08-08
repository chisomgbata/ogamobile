import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";

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

const PostCard = ({post}: { post: typeof dummyPosts[0] }) => (
    <View className="bg-white mx-4 mb-4 rounded-xl p-4 shadow-sm border border-gray-100">
        <View className="flex-row items-center mb-3">
            <View className="w-12 h-12 rounded-full bg-gray-200 mr-3"/>
            <View className="flex-1">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="font-semibold text-gray-900 mr-1">{post.username}</Text>
                        <Text className="text-gray-500 text-sm mr-2">{post.handle}</Text>
                    </View>
                    <Text className="text-gray-500 text-sm">·</Text>
                    <Text className="text-gray-500 text-sm ml-2">{post.time}</Text>
                </View>
            </View>
        </View>

        <Text className="text-gray-900 leading-5 mb-4">{post.content}</Text>

    </View>
);

export default function PostsPage() {
    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
                <View className="flex-row items-center justify-between p-2">
                    <Text className="text-2xl font-bold text-gray-900">Posts</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Posts Feed */}
                <View className="pb-20 pt-5">
                    <View className="px-4 mb-4">
                        <Text className="text-lg font-semibold text-gray-900">Recent Posts</Text>
                    </View>

                    {dummyPosts.map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </View>
            </ScrollView>

            {/*    Floating Action Button*/}
            <TouchableOpacity
                className="absolute bottom-6 right-6 w-16 h-16 bg-orange-500 rounded-lg items-center justify-center shadow-lg"
                activeOpacity={0.7}>
                <FontAwesome6 name="plus" size={28} color="white"/>
            </TouchableOpacity>

        </View>
    );
}
