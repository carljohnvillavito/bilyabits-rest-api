import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Dashboard from './components/Dashboard';
import ViewCategoryPage from './components/ViewCategoryPage';
import Footer from './components/Footer';
import { API_CATEGORIES } from './constants';
import { Category } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('dashboard'); // 'dashboard' or category.id
  
  const [totalApiCalls, setTotalApiCalls] = useState(() => {
    const savedCalls = localStorage.getItem('bilyabits_api_calls');
    return savedCalls ? parseInt(savedCalls, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('bilyabits_api_calls', String(totalApiCalls));
  }, [totalApiCalls]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (page: 'Dashboard' | 'Category', itemId?: string) => {
    if (itemId) {
      setActiveItemId(itemId);
    }
    if (window.innerWidth < 768) { // Close menu on navigation on mobile
      setIsMenuOpen(false);
    }
  };
  
  const handleApiCall = () => {
    setTotalApiCalls(prevCount => prevCount + 1);
  };

  const { currentPage, currentPageName, currentCategory } = useMemo(() => {
    if (activeItemId === 'dashboard') {
      return { 
        currentPage: 'Dashboard', 
        currentPageName: 'Dashboard', 
        currentCategory: null 
      };
    }
    const category = API_CATEGORIES.find(c => c.id === activeItemId);
    return {
      currentPage: 'Category',
      currentPageName: category?.name || 'Unknown',
      currentCategory: category || null,
    };
  }, [activeItemId]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-green-500/30">
      <Header currentPageName={currentPageName} onMenuToggle={handleMenuToggle} />
      <SideMenu isOpen={isMenuOpen} onNavigate={handleNavigate} activeItemId={activeItemId} />
      
      <main className="pt-24 pb-12 px-4 md:pl-72 md:px-8 transition-all duration-300 ease-in-out">
        {currentPage === 'Dashboard' && <Dashboard totalApiCalls={totalApiCalls} />}
        {currentPage === 'Category' && currentCategory && (
          <ViewCategoryPage category={currentCategory} onApiCall={handleApiCall} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;