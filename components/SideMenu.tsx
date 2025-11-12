import React from 'react';
import { Category } from '../types';
import { DashboardIcon, FolderIcon } from './Icons';
import { API_CATEGORIES } from '../constants';

interface SideMenuProps {
  isOpen: boolean;
  onNavigate: (page: 'Dashboard' | 'Category', categoryId?: string) => void;
  activeItemId: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onNavigate, activeItemId }) => {
  const categories = API_CATEGORIES;

  const baseItemClass = "flex items-center p-3 my-1 rounded-md cursor-pointer transition-all duration-200 ease-in-out font-mono text-sm";
  const activeItemClass = "bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)]";
  const inactiveItemClass = "text-gray-400 hover:bg-gray-800/50 hover:text-white";

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-[#0c0c0c] border-r border-gray-800 w-64 pt-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4">
          <div
            onClick={() => onNavigate('Dashboard', 'dashboard')}
            className={`${baseItemClass} ${activeItemId === 'dashboard' ? activeItemClass : inactiveItemClass}`}
          >
            <DashboardIcon className="w-5 h-5 mr-4" />
            Dashboard
          </div>

          <h2 className="text-xs text-gray-500 font-semibold uppercase mt-6 mb-2 px-3">
            API Categories
          </h2>

          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('Category', cat.id)}
                className={`${baseItemClass} ${activeItemId === cat.id ? activeItemClass : inactiveItemClass}`}
              >
                <FolderIcon className="w-5 h-5 mr-4" />
                {cat.name}
              </div>
            ))
          ) : (
            <p className="px-3 py-2 text-xs text-gray-600 font-mono italic">
              No categories found.
            </p>
          )}
        </div>
      </aside>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => onNavigate(activeItemId === 'dashboard' ? 'Dashboard' : 'Category', activeItemId)}></div>}
    </>
  );
};

export default SideMenu;
