import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

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

const PostCard = ({post}: { post: typeof dummyPosts[0] }) => {
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <View className="bg-white border-b border-gray-100 px-4 py-4">
            <View className="flex-row">
                {/* Avatar */}
                <View className="mr-3">
                    <Image
                        source={{uri: post.avatar}}
                        className="w-12 h-12 rounded-full"
                        style={{backgroundColor: '#E5E7EB'}}
                    />
                </View>

                {/* Content */}
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center mb-1">
                        <Text className="font-bold text-gray-900 text-base mr-2">{post.username}</Text>
                        <MaterialIcons name="verified" size={16} color="#1DA1F2"/>
                        <Text className="text-gray-500 text-sm ml-2">{post.handle}</Text>
                        <Text className="text-gray-500 text-sm mx-1">·</Text>
                        <Text className="text-gray-500 text-sm">{post.time}</Text>
                        <View className="flex-1"/>
                        <TouchableOpacity className="p-1">
                            <MaterialIcons name="more-horiz" size={20} color="#6B7280"/>
                        </TouchableOpacity>
                    </View>

                    {/* Post Content */}
                    <Text className="text-gray-900 text-base leading-6 mb-3">{post.content}</Text>

                    {/* Engagement Actions */}
                    <View className="flex-row items-center justify-between mt-2 max-w-80">
                        {/* Reply */}
                        <TouchableOpacity className="flex-row items-center p-2 -ml-2 rounded-full active:bg-blue-50">
                            <Ionicons name="chatbubble-outline" size={18} color="#6B7280"/>
                            <Text className="text-gray-500 text-sm ml-2">{post.comments}</Text>
                        </TouchableOpacity>

                        {/* Retweet */}
                        <TouchableOpacity
                            className="flex-row items-center p-2 rounded-full active:bg-green-50"
                            onPress={() => setRetweeted(!retweeted)}
                        >
                            <Ionicons
                                name="repeat"
                                size={18}
                                color={retweeted ? "#10B981" : "#6B7280"}
                            />
                            <Text className={`text-sm ml-2 ${retweeted ? 'text-green-600' : 'text-gray-500'}`}>
                                {post.retweets + (retweeted ? 1 : 0)}
                            </Text>
                        </TouchableOpacity>

                        {/* Like */}
                        <TouchableOpacity
                            className="flex-row items-center p-2 rounded-full active:bg-red-50"
                            onPress={() => setLiked(!liked)}
                        >
                            <Ionicons
                                name={liked ? "heart" : "heart-outline"}
                                size={18}
                                color={liked ? "#EF4444" : "#6B7280"}
                            />
                            <Text className={`text-sm ml-2 ${liked ? 'text-red-600' : 'text-gray-500'}`}>
                                {post.likes + (liked ? 1 : 0)}
                            </Text>
                        </TouchableOpacity>

                        {/* Share */}
                        <TouchableOpacity className="flex-row items-center p-2 rounded-full active:bg-blue-50">
                            <Ionicons name="share-outline" size={18} color="#6B7280"/>
                        </TouchableOpacity>

                        {/* Bookmark */}
                        <TouchableOpacity
                            className="flex-row items-center p-2 -mr-2 rounded-full active:bg-blue-50"
                            onPress={() => setBookmarked(!bookmarked)}
                        >
                            <Ionicons
                                name={bookmarked ? "bookmark" : "bookmark-outline"}
                                size={18}
                                color={bookmarked ? "#3B82F6" : "#6B7280"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default function PostsPage() {
    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-white pt-12 pb-3 px-4 border-b border-gray-100 sticky top-0 z-10">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-2xl font-bold text-gray-900">Home</Text>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                            <MaterialIcons name="settings" size={20} color="#6B7280"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Posts Feed */}
                <View className="pb-20">
                    {dummyPosts.map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full items-center justify-center shadow-lg"
                activeOpacity={0.8}
            >
                <MaterialIcons name="edit" size={24} color="white"/>
            </TouchableOpacity>
        </View>
    );
}
