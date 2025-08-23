import React, { useState, useRef, useEffect } from 'react';
import { Factory, Settings, User, MessageSquare, Zap, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { RoleSelector } from './components/RoleSelector';
import { LoadingMessage } from './components/LoadingMessage';
import { ErrorMessage } from './components/ErrorMessage';
import { LoginScreen } from './components/LoginScreen';
import { generateResponse } from './utils/gemini';
import type { Message, UserRole, ChatState } from './types';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedRole: 'Engineering'
  });
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isLoading]);

  // Check if API key is available
  useEffect(() => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setError('GEMINI_API_KEY is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }
  }, []);

  const handleLogin = () => {
    setShowLogin(false);
    setIsGuest(false);
  };

  const handleGuestAccess = () => {
    setShowLogin(false);
    setIsGuest(true);
  };

  const handleSendMessage = async (content: string) => {
    if (error) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    try {
      const aiResponse = await generateResponse(content, chatState.selectedRole);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (err) {
      setChatState(prev => ({ ...prev, isLoading: false }));
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setChatState(prev => ({ ...prev, selectedRole: role }));
  };

  const clearError = () => setError(null);

  if (showLogin) {
    return <LoginScreen onLogin={handleLogin} onGuestAccess={handleGuestAccess} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-gradient-to-b from-gray-800 to-gray-900 border-r-4 border-yellow-500 flex flex-col shadow-2xl`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="text-gray-300" size={20} />
            </button>
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                  <Factory className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wide">CEMENT PLANT</h1>
                  <p className="text-yellow-400 text-sm font-semibold">EXPERT AI</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        {sidebarOpen && (
          <div className="p-6 border-b-2 border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg">
                <img 
                  src="/untitled (10).jpeg" 
                  alt="Vipul Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Vipul Sharma</h3>
                <p className="text-yellow-400 text-sm font-semibold">Technical Assistant</p>
                <p className="text-gray-400 text-xs">Plant Operations Expert</p>
              </div>
            </div>
            
            {/* Role Selector */}
            <div className="space-y-3">
              <h4 className="text-gray-300 font-semibold text-sm uppercase tracking-wide">Select Department:</h4>
              <RoleSelector 
                selectedRole={chatState.selectedRole}
                onRoleChange={handleRoleChange}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        {sidebarOpen && (
          <div className="p-6 flex-1">
            <div className="space-y-4">
              <div className="bg-gray-800/80 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="text-blue-400" size={18} />
                  <span className="text-gray-300 text-sm font-semibold">QUERIES PROCESSED</span>
                </div>
                <p className="text-white text-2xl font-bold">{chatState.messages.length}</p>
              </div>
              
              <div className="bg-gray-800/80 rounded-lg p-4 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-yellow-400" size={18} />
                  <span className="text-gray-300 text-sm font-semibold">SYSTEM STATUS</span>
                </div>
                <p className={`text-sm font-bold ${chatState.isLoading ? 'text-yellow-400' : 'text-green-400'}`}>
                  {chatState.isLoading ? 'ANALYZING...' : 'READY'}
                </p>
              </div>

              {isGuest && (
                <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500">
                  <p className="text-yellow-300 text-xs font-semibold mb-2">GUEST MODE</p>
                  <p className="text-gray-300 text-xs">Login to save chats & access detailed reports</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t-2 border-gray-700">
          {sidebarOpen ? (
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Powered by <span className="text-yellow-400 font-bold">AI Technology</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">© 2024 Cement Plant Expert</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">VS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b-4 border-blue-600 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                <Factory className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-gray-800 font-bold text-xl">👷 Cement Plant Expert AI</h2>
                <p className="text-gray-600 text-sm font-semibold">
                  Department: <span className="text-blue-600 font-bold">{chatState.selectedRole}</span>
                  {isGuest && <span className="ml-2 text-yellow-600">(Guest Mode)</span>}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-gray-700 text-sm font-semibold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4">
            <ErrorMessage 
              message={error} 
              onRetry={error.includes('GEMINI_API_KEY') ? undefined : clearError}
            />
          </div>
        )}

        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-gray-50 to-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatState.messages.length === 0 && !error ? (
              <div className="text-center py-12">
                <div className="p-8 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-3xl w-32 h-32 mx-auto mb-8 flex items-center justify-center border-4 border-blue-200 shadow-xl">
                  <Factory className="text-blue-600 w-16 h-16" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">👷 Welcome to Cement Plant Expert AI</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  Your Partner in Optimizing Operations, Safety & Efficiency.<br/>
                  <strong>I am Vipul</strong>, your technical assistant, here to provide expert guidance for cement plant operations, maintenance, and performance improvement.
                </p>
                <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto border-4 border-gray-200 shadow-xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">🔧 My Capabilities:</h4>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="text-left space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <p className="text-gray-700 font-semibold">Troubleshooting plant machinery issues</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="text-gray-700 font-semibold">Process optimization recommendations</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="text-gray-700 font-semibold">Safety & compliance guidelines</p>
                      </div>
                    </div>
                    <div className="text-left space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <p className="text-gray-700 font-semibold">Maintenance planning & predictive checks</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <p className="text-gray-700 font-semibold">Efficiency & cost-saving strategies</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <p className="text-gray-700 font-semibold">Sustainability improvements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chatState.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {chatState.isLoading && <LoadingMessage />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-4 border-blue-600 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
            <ChatInput 
              onSend={handleSendMessage}
              isLoading={chatState.isLoading || !!error}
              placeholder={`Ask about cement plant operations (${chatState.selectedRole} perspective)...`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;