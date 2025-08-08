import React, {useEffect, useRef, useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View, Platform, Animated, Dimensions} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

// Dummy chat messages
const dummyMessages: ({ id: number; type: string; content: string; timestamp: string })[] = [];

const MessageBubble = ({message}: { message: typeof dummyMessages[0] }) => (
    <View className={`mb-6 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>

        <View className={`max-w-[90%] px-5 py-4 ${
            message.type === 'user'
                ? 'rounded-3xl rounded-br-lg shadow-lg bg-gray-200'
                : ''
        }`}>
            <Text className={`leading-6 text-base ${
                message.type === 'user' ? 'text-black' : 'text-gray-900'
            }`}>
                {message.content}
            </Text>
        </View>
        <Text className="text-xs text-gray-400 mt-2 mx-3">{message.timestamp}</Text>
    </View>
);

const SuggestedPrompt = ({text, onPress, icon}: { text: string, onPress: () => void, icon?: React.ReactNode }) => (
    <TouchableOpacity
        className="bg-white border border-gray-200 rounded-2xl px-5 py-4 mr-3 mb-3 shadow-sm"
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View className="flex-row items-center mb-2">
            {icon ? (
                <View className="w-7 h-7 rounded-full items-center justify-center mr-2"
                      style={{backgroundColor: '#8B5CF6'}}>
                    {icon}
                </View>
            ) : (
                <View className="w-7 h-7 rounded-full items-center justify-center mr-2 bg-gray-200">
                    <MaterialIcons name="lightbulb" size={16} color="#6B7280"/>
                </View>
            )}
            <Text className="text-gray-700 text-sm font-medium">{text}</Text>
        </View>
    </TouchableOpacity>
);

export default function ChatPage() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState(dummyMessages);
    const scrollViewRef = useRef<ScrollView>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerAnimation = useRef(new Animated.Value(-280)).current;
    const overlayAnimation = useRef(new Animated.Value(0)).current;

    const { width: screenWidth } = Dimensions.get('window');

    const suggestedPrompts = [
        "What are the active matches today?",
        "Give me 3 tips for managing bankroll",
        "Which Bookie is the best"
    ];

    useEffect(() => {
        // Auto scroll to bottom when new messages are added
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({animated: true});
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim()) {
            // Add user message
            const newMessage = {
                id: messages.length + 1,
                type: 'user' as const,
                content: inputText.trim(),
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            };

            setMessages(prev => [...prev, newMessage]);
            setInputText('');
            setIsTyping(true);

            // Simulate AI response after a short delay
            setTimeout(() => {
                const aiResponse = {
                    id: messages.length + 2,
                    type: 'ai' as const,
                    content: "That's a great question! I'm processing your request and will provide a detailed response shortly. This is a demo response to show the chat functionality.",
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                };
                setMessages(prev => [...prev, aiResponse]);
                setIsTyping(false);
            }, 1500);
        }
    };

    const handleSuggestedPrompt = (prompt: string) => {
        setInputText(prompt);
    };

    const handleChatSelect = (chatId: number) => {
        // Close drawer and switch to selected chat
        closeDrawer();
        // Here you would typically load the selected chat's messages
        console.log('Selected chat:', chatId);
    };

    const openDrawer = () => {
        setIsDrawerOpen(true);
        Animated.parallel([
            Animated.timing(drawerAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(overlayAnimation, {
                toValue: 0.5,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeDrawer = () => {
        Animated.parallel([
            Animated.timing(drawerAnimation, {
                toValue: -280,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(overlayAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsDrawerOpen(false);
        });
    };

    return (
        <View className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1 bg-white"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {/* Header */}
                <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-100">
                    <View className="flex-row items-center justify-between">
                        {/* Menu button on left */}
                        <TouchableOpacity 
                            className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center"
                            onPress={openDrawer}
                        >
                            <MaterialIcons name="menu" size={22} color="#6B7280"/>
                        </TouchableOpacity>
                        
                        {/* Icon and name to the right */}
                        <View className="flex-row items-center">
                            <Image source={require("../../assets/images/logo-60.png")}
                                   width={40}
                                   height={40}
                                   className="w-10 h-10 rounded-2xl items-center justify-center mr-3 shadow-lg"
                            />
                            <View>
                                <Text className="text-2xl font-bold text-gray-900">Oga</Text>
                                <Text className="text-sm text-gray-500">Powered by advanced AI</Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
                            <MaterialIcons name="more-vert" size={22} color="#6B7280"/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Chat Messages if message or else suggestions */}
                {
                    messages.length > 0 ? (
                        <ScrollView
                            ref={scrollViewRef}
                            className="flex-1 px-6 pt-4"
                            showsVerticalScrollIndicator={false}
                        >
                            {messages.map(message => (
                                <MessageBubble key={message.id} message={message}/>
                            ))}
                            {isTyping && (
                                <View className="flex-row items-center mb-6">
                                    <View className="w-10 h-10 rounded-full bg-gray-200 mr-3"/>
                                    <Text className="text-sm text-gray-500">AI is typing...</Text>
                                </View>
                            )}
                        </ScrollView>
                    ) : (
                        <ScrollView
                            className="flex-1 px-6 pt-4"
                            showsVerticalScrollIndicator={false}
                        >
                            <Text className="text-lg text-gray-700 mb-4">How can I assist you today?</Text>
                            {suggestedPrompts.map((prompt, index) => (
                                <SuggestedPrompt
                                    key={index}
                                    text={prompt}
                                    onPress={() => handleSuggestedPrompt(prompt)}
                                />
                            ))}
                        </ScrollView>
                    )
                }

                {/* Input Area */}
                <View className="bg-white border-t border-gray-100 px-4 py-4">
                    <View className="flex-row items-end bg-gray-50 rounded-3xl px-5 py-3 shadow-sm border border-gray-200">
                        <TextInput
                            className="flex-1 text-gray-900 py-2 max-h-32 text-base"
                            placeholder="Send me a message..."
                            placeholderTextColor="#9CA3AF"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            style={{fontSize: 16}}
                        />
                        <TouchableOpacity
                            className="ml-3 w-10 h-10 rounded-2xl items-center justify-center shadow-lg"
                            style={{
                                backgroundColor: inputText.trim() ? '#F86900' : 'rgba(248,105,0,0.66)',
                            }}
                            onPress={handleSendMessage}
                            disabled={!inputText.trim()}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons
                                name="send"
                                size={20}
                                color={inputText.trim() ? 'white' : '#9CA3AF'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {/* Drawer Overlay */}
            {isDrawerOpen && (
                <Animated.View
                    className="absolute inset-0 bg-black"
                    style={{
                        opacity: overlayAnimation,
                        zIndex: 998,
                    }}
                >
                    <TouchableOpacity
                        className="flex-1"
                        onPress={closeDrawer}
                        activeOpacity={1}
                    />
                </Animated.View>
            )}

            {/* Drawer */}
            <Animated.View
                className="absolute top-0 left-0 bottom-0 bg-white shadow-2xl"
                style={{
                    width: 280,
                    transform: [{ translateX: drawerAnimation }],
                    zIndex: 999,
                }}
            >
                <View className="flex-1 bg-white">
                    {/* Header */}
                    <View className="pt-12 pb-4 px-4 border-b border-gray-100">
                        <Text className="text-2xl font-bold text-gray-900 mb-4">Chats</Text>
                        
                        {/* Search Bar */}
                        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
                            <MaterialIcons name="search" size={20} color="#9CA3AF" />
                            <TextInput
                                className="flex-1 ml-3 text-gray-900"
                                placeholder="Search chats..."
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    {/* Chat List */}
                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        {/* Dummy chat items */}
                        <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-100">
                            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-3">
                                <MaterialIcons name="chat" size={24} color="#6B7280" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-900 font-medium text-base">Bankroll Management</Text>
                                <Text className="text-gray-500 text-sm mt-1">Thanks for the advice...</Text>
                            </View>
                            <Text className="text-gray-400 text-xs">2m</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-100">
                            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-3">
                                <MaterialIcons name="chat" size={24} color="#6B7280" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-900 font-medium text-base">Match Analysis</Text>
                                <Text className="text-gray-500 text-sm mt-1">Liverpool vs Arsenal...</Text>
                            </View>
                            <Text className="text-gray-400 text-xs">15m</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    {/* New Chat Button */}
                    <View className="p-4 border-t border-gray-100">
                        <TouchableOpacity 
                            className="bg-orange-500 rounded-xl py-3 items-center"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-semibold text-base">New Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}
