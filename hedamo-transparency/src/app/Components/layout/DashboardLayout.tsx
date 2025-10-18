'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // State to control sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to control dark mode
  const [darkMode, setDarkMode] = useState(false);

  return (
    // Set background color based on dark mode
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
    
      {/* Sidebar component */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top navigation bar */}
      <TopNav 
        onMenuClick={() => setSidebarOpen(true)} // Open sidebar
        darkMode={darkMode}                     // Pass current theme
        onThemeToggle={setDarkMode}             // Toggle theme
      />

      {/* Main content area */}
      <main id="main-content" className="lg:pl-72" tabIndex={-1}>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children} {/* Render page content */}
        </div>
      </main>
    </div>
  );
}
