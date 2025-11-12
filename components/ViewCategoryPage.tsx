import React from 'react';
import { Category } from '../types';
import ApiDropdown from './ApiDropdown';

interface ViewCategoryPageProps {
  category: Category;
  onApiCall: () => void;
}

const ViewCategoryPage: React.FC<ViewCategoryPageProps> = ({ category, onApiCall }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">{category.name}</h2>
        <p className="text-gray-400 mt-1">
          Explore the endpoints available in the {category.name} category.
        </p>
      </div>

      <div className="space-y-4">
        {category.apis.length > 0 ? (
          category.apis.map(api => <ApiDropdown key={api.id} api={api} onApiCall={onApiCall} />)
        ) : (
          <div className="text-center py-16 px-8 border-2 border-dashed border-gray-800 rounded-lg bg-gray-900/20">
            <h3 className="text-xl font-semibold text-gray-400">No APIs Here... Yet</h3>
            <p className="text-gray-500 mt-2">
              The APIs for the "{category.name}" category are currently under development.
              <br/>
              Check back soon for exciting new features!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategoryPage;