import React, { useState, useRef, useEffect } from 'react';
import {ScrollView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions} from "react-native";
import {MaterialIcons, Ionicons} from "@expo/vector-icons";

// Dummy chat messages
const dummyMessages = [
    {
        id: 1,
        type: 'user',
        content: "Hello! Can you help me with React Native development?",
        timestamp: "10:30 AM"
    },
    {
        id: 2,
        type: 'ai',
        content: "Hello! I'd be happy to help you with React Native development. I can assist with components, navigation, state management, styling, and best practices. What specific topic would you like to explore?",
        timestamp: "10:30 AM"
    },
    {
        id: 3,
        type: 'user',
        content: "What's the best way to handle navigation in React Native?",
        timestamp: "10:32 AM"
    },
    {
        id: 4,
        type: 'ai',
        content: "For React Native navigation, I recommend React Navigation v6 or Expo Router. React Navigation offers:\n\n• Stack Navigation for hierarchical screens\n• Tab Navigation for bottom tabs\n• Drawer Navigation for side menus\n\nExpo Router (which you're using) provides file-based routing similar to Next.js, making it very intuitive for web developers. It's built on top of React Navigation and offers excellent TypeScript support.",
        timestamp: "10:32 AM"
    }
];

const MessageBubble = ({message}: {message: typeof dummyMessages[0]}) => (
    <View className={`mb-6 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
        {message.type === 'ai' && (
            <View className="flex-row items-center mb-2">
                <View className="w-7 h-7 rounded-full items-center justify-center mr-2" style={{backgroundColor: '#8B5CF6'}}>
                    <MaterialIcons name="auto-awesome" size={14} color="white" />
                </View>
                <Text className="text-sm font-medium text-gray-700">AI Assistant</Text>
            </View>
        )}
        <View className={`max-w-[85%] px-5 py-4 ${
            message.type === 'user' 
                ? 'rounded-3xl rounded-br-lg shadow-lg' 
                : 'bg-white rounded-3xl rounded-tl-lg shadow-sm border border-gray-100'
        }`} style={message.type === 'user' ? {backgroundColor: '#3B82F6'} : {}}>
            <Text className={`leading-6 text-base ${
                message.type === 'user' ? 'text-white' : 'text-gray-800'
            }`}>
                {message.content}
            </Text>
        </View>
        <Text className="text-xs text-gray-400 mt-2 mx-3">{message.timestamp}</Text>
    </View>
);

const SuggestedPrompt = ({text, onPress}: {text: string, onPress: () => void}) => (
    <TouchableOpacity 
        className="bg-white border border-gray-200 rounded-2xl px-5 py-4 mr-3 mb-3 shadow-sm"
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Text className="text-gray-700 text-sm font-medium">{text}</Text>
        <Ionicons name="arrow-forward" size={14} color="#9CA3AF" style={{position: 'absolute', right: 12, top: 16}} />
    </TouchableOpacity>
);

export default function ChatPage() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState(dummyMessages);
    const scrollViewRef = useRef<ScrollView>(null);
    const [isTyping, setIsTyping] = useState(false);

    const suggestedPrompts = [
        "Explain React Native hooks",
        "Best practices for styling", 
        "How to optimize performance?",
        "State management options"
    ];

    useEffect(() => {
        // Auto scroll to bottom when new messages are added
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim()) {
            // Add user message
            const newMessage = {
                id: messages.length + 1,
                type: 'user' as const,
                content: inputText.trim(),
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
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
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                };
                setMessages(prev => [...prev, aiResponse]);
                setIsTyping(false);
            }, 1500);
        }
    };

    const handleSuggestedPrompt = (prompt: string) => {
        setInputText(prompt);
    };

    return (
        <KeyboardAvoidingView 
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            style={{backgroundColor: '#F9FAFB'}}
        >
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-10 h-10 rounded-2xl items-center justify-center mr-4 shadow-lg" style={{backgroundColor: '#8B5CF6'}}>
                            <MaterialIcons name="auto-awesome" size={20} color="white" />
                        </View>
                        <View>
                            <Text className="text-2xl font-bold text-gray-900">AI Assistant</Text>
                            <Text className="text-sm text-gray-500">Powered by advanced AI</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
                        <MaterialIcons name="more-vert" size={22} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Messages */}
            <ScrollView 
                ref={scrollViewRef}
                className="flex-1 px-4 pt-6" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 20}}
            >
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                    <View className="mb-6 items-start">
                        <View className="flex-row items-center mb-2">
                            <View className="w-7 h-7 rounded-full items-center justify-center mr-2" style={{backgroundColor: '#8B5CF6'}}>
                                <MaterialIcons name="auto-awesome" size={14} color="white" />
                            </View>
                            <Text className="text-sm font-medium text-gray-700">AI Assistant</Text>
                        </View>
                        <View className="bg-white rounded-3xl rounded-tl-lg shadow-sm border border-gray-100 px-5 py-4">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 bg-gray-400 rounded-full mr-1" />
                                <View className="w-2 h-2 bg-gray-400 rounded-full mr-1" />
                                <View className="w-2 h-2 bg-gray-400 rounded-full" />
                            </View>
                        </View>
                    </View>
                )}
                
                {/* Suggested Prompts - only show if no recent messages */}
                {messages.length <= 4 && (
                    <View className="mt-8 mb-6">
                        <Text className="text-gray-600 font-semibold mb-4 text-lg">Suggested questions</Text>
                        <View className="flex-row flex-wrap">
                            {suggestedPrompts.map((prompt, index) => (
                                <SuggestedPrompt 
                                    key={index} 
                                    text={prompt} 
                                    onPress={() => handleSuggestedPrompt(prompt)}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Input Area */}
            <View className="bg-white border-t border-gray-100 px-4 py-4 pb-8">
                <View className="flex-row items-end bg-gray-50 rounded-3xl px-5 py-3 shadow-sm border border-gray-200">
                    <TextInput
                        className="flex-1 text-gray-900 py-2 max-h-32 text-base"
                        placeholder="Message AI Assistant..."
                        placeholderTextColor="#9CA3AF"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        style={{fontSize: 16}}
                    />
                    <TouchableOpacity 
                        className="ml-3 w-10 h-10 rounded-2xl items-center justify-center shadow-lg"
                        style={{
                            backgroundColor: inputText.trim() ? '#3B82F6' : '#E5E7EB',
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
    );
}
