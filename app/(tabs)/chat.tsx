import React, {useEffect, useRef, useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
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

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
        >
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Image source={require("../../assets/images/logo-60.png")}
                               width={40}
                               height={40}
                               className="w-10 h-10 rounded-2xl items-center justify-center mr-4 shadow-lg"
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
            <View className="bg-white border-t border-gray-100 px-4 py-4 pb-8">
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
    );
}
