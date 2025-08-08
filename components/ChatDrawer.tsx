import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Dummy chat data
const dummyChats = [
  {
    id: 1,
    title: "Bankroll Management Tips",
    lastMessage: "Thanks for the advice on managing...",
    timestamp: "2 mins ago",
    unread: 2
  },
  {
    id: 2,
    title: "Today's Matches Analysis",
    lastMessage: "What about the Liverpool vs Arsenal...",
    timestamp: "15 mins ago",
    unread: 0
  },
  {
    id: 3,
    title: "Best Bookies Discussion",
    lastMessage: "I've been using Bet365 for a while...",
    timestamp: "1 hour ago",
    unread: 1
  },
  {
    id: 4,
    title: "Football Predictions",
    lastMessage: "The odds look good for tonight's...",
    timestamp: "3 hours ago",
    unread: 0
  },
  {
    id: 5,
    title: "Strategy Questions",
    lastMessage: "How do you calculate value bets...",
    timestamp: "1 day ago",
    unread: 0
  }
];

interface ChatDrawerProps {
  onChatSelect?: (chatId: number) => void;
}

const ChatItem = ({ chat, onPress }: { chat: typeof dummyChats[0], onPress: () => void }) => (
  <TouchableOpacity
    className="flex-row items-center px-4 py-3 border-b border-gray-100"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-3">
      <MaterialIcons name="chat" size={24} color="#6B7280" />
    </View>
    <View className="flex-1">
      <Text className="text-gray-900 font-medium text-base" numberOfLines={1}>
        {chat.title}
      </Text>
      <Text className="text-gray-500 text-sm mt-1" numberOfLines={1}>
        {chat.lastMessage}
      </Text>
    </View>
    <View className="items-end">
      <Text className="text-gray-400 text-xs">{chat.timestamp}</Text>
      {chat.unread > 0 && (
        <View className="w-5 h-5 rounded-full bg-orange-500 items-center justify-center mt-1">
          <Text className="text-white text-xs font-bold">{chat.unread}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default function ChatDrawer({ onChatSelect }: ChatDrawerProps) {
  const [searchText, setSearchText] = useState('');

  const filteredChats = dummyChats.filter(chat =>
    chat.title.toLowerCase().includes(searchText.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
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
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <MaterialIcons name="clear" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Chat List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredChats.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            onPress={() => onChatSelect?.(chat.id)}
          />
        ))}
        
        {filteredChats.length === 0 && searchText.length > 0 && (
          <View className="flex-1 items-center justify-center p-8">
            <MaterialIcons name="search-off" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 text-center mt-4">
              No chats found for "{searchText}"
            </Text>
          </View>
        )}
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
  );
}