'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [activeSection, setActiveSection] = useState('AI Search');
  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedFirstName = localStorage.getItem('firstName');
    if (!token) {
      router.push('/login');
    } else {
      setFirstName(storedFirstName || 'David');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    router.push('/login');
  };

  const navItems = [
    { id: 'AI Search', icon: '🔍', active: true },
    { id: 'Talent Acquisition', icon: '👥' },
    { id: 'Procurement Search', icon: '📦' },
    { id: 'Finance Search', icon: '💰' },
    { id: 'Legal Search', icon: '⚖️' },
    { id: 'Employee Enablement', icon: '👥', hasDropdown: true },
    { id: 'AIOps', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Image
              src="/o2-logo.png"
              alt="O2 Logo"
              width={40}
              height={40}
              className="mr-2"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 mb-6 text-sm font-medium">
            + New Chat
          </button>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                  item.active ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{item.icon}</span>
                  <span className="text-sm">{item.id}</span>
                </div>
                {item.hasDropdown && (
                  <span className="text-gray-400">▼</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button className="text-xl">←</button>
            <span className="text-sm font-medium">{activeSection}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2">
              <span>⚙️</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span className="text-sm">{firstName}</span>
            </div>
          </div>
        </header>

        {/* Welcome Panel */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-8">
              <span className="text-4xl">🤖</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">Hi, {firstName}</h1>
            <h2 className="text-2xl mb-3">What would you like to know?</h2>
            <p className="text-sm text-gray-600 mb-8">
              Use the prompts below to begin your journey. Feel free to customise them to suit your needs.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
              {navItems.slice(1, 5).map((item) => (
                <button
                  key={item.id}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              className="w-full px-4 py-3 pr-24 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Type your messages here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Send →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 