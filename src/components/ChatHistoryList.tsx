import React from "react";

interface ChatHistoryListProps {
  chats: { id: string; title: string }[];
  onSelectChat: (id: string) => void;
}

const ChatHistoryList: React.FC<ChatHistoryListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="h-full overflow-y-auto p-2 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Chat History</h2>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistoryList;
