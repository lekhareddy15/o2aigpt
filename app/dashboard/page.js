'use client';
import { useEffect, useState, useRef } from 'react';
//Import icons from react-icons
import { MdSearch, MdPeople, MdAttachMoney, MdGavel, MdOutlineSettings, MdHistory } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { SiAiohttp } from 'react-icons/si';

const sidebarData = [
  {
    label: 'AI Search',
    icon: <MdSearch size={20} className="text-blue-500" />,
    subItems: [
      { label: 'Talent Acquisition', icon: <MdPeople size={18} className="text-blue-500" /> },
      { label: 'Procurement Search', icon: <MdOutlineSettings size={18} className="text-blue-500" /> },
      { label: 'Finance Search', icon: <MdAttachMoney size={18} className="text-blue-500" /> },
      { label: 'Legal Search', icon: <MdGavel size={18} className="text-blue-500" /> },
    ],
  },
  {
    label: 'Employee Enablement',
    icon: <FaUserFriends size={20} className="text-blue-500" />,
    subItems: [
      { label: 'HR Compensation & Benefits', icon: <MdPeople size={18} className="text-blue-500" /> },
      { label: 'Finance Analysis', icon: <MdAttachMoney size={18} className="text-blue-500" /> },
      { label: 'Legal Analysis', icon: <MdGavel size={18} className="text-blue-500" /> },
    ],
  },
  {
    label: 'AIOps',
    icon: <SiAiohttp size={20} className="text-blue-500" />,
    subItems: [],
  },
];

const quickActionIcons = {
  'Talent Acquisition': <MdPeople size={18} className="text-blue-500" />,
  'Procurement Search': <MdOutlineSettings size={18} className="text-blue-500" />,
  'Finance Search': <MdAttachMoney size={18} className="text-blue-500" />,
  'Legal Search': <MdGavel size={18} className="text-blue-500" />,
  'HR Compensation & Benefits': <MdPeople size={18} className="text-blue-500" />,
  'Finance Analysis': <MdAttachMoney size={18} className="text-blue-500" />,
  'Legal Analysis': <MdGavel size={18} className="text-blue-500" />,
};

export default function DashboardPage() {
  const [firstName, setFirstName] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const [selectedSection, setSelectedSection] = useState('AI Search');
  const [selectedSub, setSelectedSub] = useState('');
  const [openSections, setOpenSections] = useState(['AI Search']);
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    if (storedFirstName) setFirstName(storedFirstName);
    else setFirstName('David');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const toggleSection = (label) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  let illustration = '/ai.jpg';
  let quickActions = [];
  let description = '';
  if (selectedSection === 'AI Search') {
    illustration = '/mission.jpg';
    quickActions = [
      'Talent Acquisition',
      'Procurement Search',
      'Finance Search',
      'Legal Search',
    ];
    description = 'Use the prompts below to begin your journey. Feel free to customise them to suit your needs.';
  } else if (selectedSection === 'Employee Enablement') {
    illustration = '/Employee-Enhancement.jpg';
    quickActions = [
      'HR Compensation & Benefits',
      'Finance Analysis',
      'Legal Analysis',
    ];
    description = 'Start unlocking employee potential, customize these prompts to drive engagement and growth.';
  } else if (selectedSection === 'AIOps') {
    illustration = '/Aiop.jpg';
    description = 'Leverage these AI-powered prompts to streamline your IT operations, customize them to fit your environment.';
  }

  const onLogout = () => {
    localStorage.removeItem('firstName');
    window.location.href = '/login';
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (message.trim() || attachedFile) {
      const newMessage = {
        text: message.trim(),
        file: attachedFile?.name || null,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages(prev => [...prev, newMessage]);
      setMessage('');
      setAttachedFile(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col gap-4 shadow-sm">
        <button
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
  onClick={() => {
    if (chatMessages.length > 0) {
      setChatHistory(prev => [
        ...prev,
        {
          title: chatMessages[0].text?.slice(0, 20) || 'Untitled Chat',
          messages: chatMessages,
          timestamp: new Date().toISOString(),
        }
      ]);
    }
    setChatMessages([]);
    setMessage('');
    setAttachedFile(null);
  }}
>
  + New Chat
</button>
        {sidebarData.map((section) => (
          <div key={section.label}>
            <div
              className={`flex items-center gap-2 cursor-pointer px-2 py-2 rounded text-black ${selectedSection === section.label ? 'bg-blue-100 font-bold' : ''}`}
              onClick={() => {
                setSelectedSection(section.label);
                if (section.subItems.length) toggleSection(section.label);
                else setSelectedSub('');
              }}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
              {section.subItems.length > 0 && (
                <span className="ml-auto">{openSections.includes(section.label) ? '▼' : '▶'}</span>
              )}
            </div>
            {section.subItems.length > 0 && openSections.includes(section.label) && (
              <div className="ml-8 flex flex-col gap-1">
                {section.subItems.map((sub) => (
                  <div
                    key={sub.label}
                    className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded text-black ${selectedSub === sub.label ? 'bg-blue-200 font-semibold' : ''}`}
                    onClick={() => setSelectedSub(sub.label)}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-[#f5f9fd] flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-8">
          <img src="/logo.jpg" alt="O2 Logo" className="h-8" />
            <div className="flex items-center gap-4 relative">
            <button
      className="p-2 rounded-full hover:bg-blue-100 transition"
      onClick={() => setShowHistoryModal(true)}
      title="Chat History"
    >
      <MdHistory size={26} className="text-blue-500" />
    </button>
 <div className="flex items-center gap-2 relative">
      <img
        src="/john-avatar.jpg"
        alt="User Avatar"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => setShowLogout(!showLogout)}
      />
      <span className="text-sm font-medium text-black">{firstName}</span>
      {showLogout && (
        <button
          onClick={onLogout}
          className="absolute right-0 mt-10 bg-white border px-3 py-1 text-sm rounded shadow text-black"
        >
          Logout
        </button>
      )}
    </div>
  </div>
</div>
        
        {/* Welcome Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center w-full max-w-4xl px-4 pb-4">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1">
                <img src="/ai.jpg" alt="O2 Logo" className="h-12" />
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-semibold">
                    <span className="text-blue-600">Hi, {firstName}</span>
                  </span>
                </div>
                <div className="text-3xl font-semibold mb-2 text-[#1d1d1f]">
                  What would like to know?
                </div>
                <div className="text-md text-[#1d1d1f] font-medium mb-2">
                  {description}
                </div>
                <div className="flex gap-3 mt-4">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      className="flex items-center gap-2 bg-white border px-4 py-2 rounded shadow text-black text-sm font-medium hover:bg-blue-50 transition"
                    >
                      <span>{quickActionIcons[action]}</span>
                      {action}
                    </button>
                  ))}
                </div>
              </div>
              <img src={illustration} alt="Illustration" className="w-56 h-44 object-contain" />
            </div>
          </div>
          {/* Chat message display section */}
          <div className="w-full max-w-4xl space-y-4 mb-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className="flex justify-start">
                <div className="bg-white text-black px-4 py-2 rounded-2xl shadow max-w-[75%]">
                  <p className="text-sm">{msg.text}</p>
                  {msg.file && (
                    <p className="text-xs text-gray-500 mt-1">📎 {msg.file}</p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1 text-right">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat Input Box */}
          <div className="w-full max-w-4xl">
            <div className="flex items-center bg-white rounded-3xl px-4 py-3 shadow border">
              {/* File upload */}
              <label className="cursor-pointer text-xl text-gray-400 mr-3 hover:text-gray-600">
                <svg className="inline-block w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656l-6.586 6.586a6 6 0 108.486 8.486l6.586-6.586" />
                </svg>
                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>
              {/* Text input */}
              <input
                type="text"
                placeholder="Type your messages here…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 text-sm text-black bg-transparent focus:outline-none"
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              {/* Send button */}
              <button
                onClick={handleSend}
                className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-2 ml-2 transition text-base font-semibold flex items-center gap-2"
              >
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="text-xs text-center text-gray-400 py-4">
          ©️ 2025. All rights reserved.
        </div>
        {showHistoryModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        onClick={() => setShowHistoryModal(false)}
      >
        &times;
      </button>
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Search chat history</div>
        <div className="flex items-center border rounded px-2 py-1">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none px-2 py-1"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <MdSearch size={20} className="text-gray-400" />
        </div>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {['Today', 'Yesterday'].map(group => {
          // Group chats by date
          const now = new Date();
          const filtered = chatHistory.filter(chat => {
            const chatDate = new Date(chat.timestamp);
            if (group === 'Today') {
              return (
                chatDate.getDate() === now.getDate() &&
                chatDate.getMonth() === now.getMonth() &&
                chatDate.getFullYear() === now.getFullYear()
              );
            } else {
              const yesterday = new Date(now);
              yesterday.setDate(now.getDate() - 1);
              return (
                chatDate.getDate() === yesterday.getDate() &&
                chatDate.getMonth() === yesterday.getMonth() &&
                chatDate.getFullYear() === yesterday.getFullYear()
              );
            }
          }).filter(chat =>
            chat.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filtered.length === 0) return null;
          return (
            <div key={group} className="mb-2">
              <div className="text-xs text-gray-400 mb-1">{group}</div>
              {filtered.map((chat, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setChatMessages(chat.messages);
                    setShowHistoryModal(false);
                  }}
                >
                  <div className="font-medium text-black">{chat.title}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}