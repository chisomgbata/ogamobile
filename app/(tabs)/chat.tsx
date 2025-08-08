import React, { useState } from 'react';
import {ScrollView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import {MaterialIcons, FontAwesome} from "@expo/vector-icons";

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
    <View className={`mb-4 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
        <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${
            message.type === 'user' 
                ? 'bg-[#F86900] rounded-tr-md' 
                : 'bg-white border border-gray-100 rounded-tl-md'
        }`}>
            <Text className={`leading-5 ${
                message.type === 'user' ? 'text-white' : 'text-gray-900'
            }`}>
                {message.content}
            </Text>
        </View>
        <Text className="text-xs text-gray-500 mt-1 mx-2">{message.timestamp}</Text>
    </View>
);

const SuggestedPrompt = ({text, onPress}: {text: string, onPress: () => void}) => (
    <TouchableOpacity 
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 mr-3 mb-3"
        onPress={onPress}
    >
        <Text className="text-gray-700 text-sm">{text}</Text>
    </TouchableOpacity>
);

export default function ChatPage() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState(dummyMessages);

    const suggestedPrompts = [
        "Explain React Native hooks",
        "Best practices for styling",
        "How to optimize performance?",
        "State management options"
    ];

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
            
            // Simulate AI response after a short delay
            setTimeout(() => {
                const aiResponse = {
                    id: messages.length + 2,
                    type: 'ai' as const,
                    content: "That's a great question! I'm processing your request and will provide a detailed response shortly. This is a demo response to show the chat functionality.",
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                };
                setMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    const handleSuggestedPrompt = (prompt: string) => {
        setInputText(prompt);
    };

    return (
        <KeyboardAvoidingView 
            className="flex-1 bg-gray-50"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{backgroundColor: '#F86900'}}>
                            <MaterialIcons name="smart-toy" size={18} color="white" />
                        </View>
                        <View>
                            <Text className="text-xl font-bold text-gray-900">AI Assistant</Text>
                            <Text className="text-sm text-gray-500">Always here to help</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                        <MaterialIcons name="more-vert" size={20} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Messages */}
            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
                
                {/* Suggested Prompts - only show if no recent messages */}
                {messages.length <= 4 && (
                    <View className="mt-6 mb-4">
                        <Text className="text-gray-600 font-medium mb-3">Try asking:</Text>
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
            <View className="bg-white border-t border-gray-100 px-4 py-3 pb-8">
                <View className="flex-row items-end bg-gray-50 rounded-2xl px-4 py-2">
                    <TextInput
                        className="flex-1 text-gray-900 py-2 max-h-24"
                        placeholder="Ask me anything..."
                        placeholderTextColor="#9CA3AF"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        style={{fontSize: 16}}
                    />
                    <TouchableOpacity 
                        className="ml-2 w-8 h-8 rounded-full items-center justify-center"
                        style={{backgroundColor: inputText.trim() ? '#F86900' : '#D1D5DB'}}
                        onPress={handleSendMessage}
                        disabled={!inputText.trim()}
                    >
                        <MaterialIcons 
                            name="send" 
                            size={18} 
                            color={inputText.trim() ? 'white' : '#9CA3AF'} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
