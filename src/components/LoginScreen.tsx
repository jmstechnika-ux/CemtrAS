import React from 'react';
import { Factory, LogIn, UserPlus, ArrowRight, Shield, Zap } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onGuestAccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGuestAccess }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl">
              <Factory className="text-white w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            👷 Welcome to Cement Plant Expert AI
          </h1>
          <p className="text-xl text-gray-600 font-semibold mb-2">
            Your Partner in Optimizing Operations, Safety & Efficiency
          </p>
          <p className="text-lg text-gray-500">
            I am <strong className="text-blue-600">Vipul</strong>, your technical assistant, here to provide expert guidance for cement plant operations, maintenance, and performance improvement.
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg">
                <img 
                  src="/untitled (10).jpeg" 
                  alt="Vipul Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Vipul Sharma</h3>
                <p className="text-blue-600 font-semibold">Technical Assistant & Plant Operations Expert</p>
                <p className="text-gray-500 text-sm mt-1">Ready to assist with your cement plant challenges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Login/Register Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-3xl">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <LogIn className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🔑 Login / Register</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access advanced features including:
              </p>
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <Shield className="text-blue-600 w-5 h-5" />
                  <span className="text-gray-700">Save chat history & detailed reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="text-yellow-500 w-5 h-5" />
                  <span className="text-gray-700">Extended session capabilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <Factory className="text-green-600 w-5 h-5" />
                  <span className="text-gray-700">Personalized plant recommendations</span>
                </div>
              </div>
              <button
                onClick={onLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 text-lg"
              >
                <LogIn size={20} />
                Login / Register
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Guest Access Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-3xl">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚡ Quick Guest Access</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Continue without login for fast one-time queries
              </p>
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-yellow-600 w-5 h-5" />
                  <span className="text-gray-700">Instant access to AI assistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-yellow-600 w-5 h-5" />
                  <span className="text-gray-700">No registration required</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-yellow-600 w-5 h-5" />
                  <span className="text-gray-700">Perfect for quick consultations</span>
                </div>
              </div>
              <button
                onClick={onGuestAccess}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 text-lg"
              >
                <Zap size={20} />
                Continue as Guest
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-gray-200">
          <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔧 Expert Capabilities</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-red-100 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-red-600 font-bold">🔧</span>
              </div>
              <h5 className="font-bold text-gray-800 mb-2">Troubleshooting</h5>
              <p className="text-gray-600 text-sm">Plant machinery issues & solutions</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 font-bold">⚡</span>
              </div>
              <h5 className="font-bold text-gray-800 mb-2">Optimization</h5>
              <p className="text-gray-600 text-sm">Process efficiency improvements</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-green-600 font-bold">🛡️</span>
              </div>
              <h5 className="font-bold text-gray-800 mb-2">Safety</h5>
              <p className="text-gray-600 text-sm">Compliance & safety guidelines</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Powered by <span className="text-blue-600 font-bold">Advanced AI Technology</span> | 
            © 2024 Cement Plant Expert
          </p>
        </div>
      </div>
    </div>
  );
};