import React, { useState } from 'react';
import { ApiItem, ApiMethod } from '../types';
import { ChevronDownIcon } from './Icons';

const getMethodColor = (method: ApiMethod) => {
    switch (method) {
        case 'GET': return 'text-green-400 border-green-400/50 bg-green-400/10';
        case 'POST': return 'text-blue-400 border-blue-400/50 bg-blue-400/10';
        case 'PUT': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
        case 'DELETE': return 'text-red-400 border-red-400/50 bg-red-400/10';
    }
};

interface ApiDropdownProps {
    api: ApiItem;
    onApiCall: () => void;
}

const ApiDropdown: React.FC<ApiDropdownProps> = ({ api, onApiCall }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/30 transition-all duration-300 hover:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <div className="flex items-center space-x-4">
                    <span className={`font-mono text-sm font-bold w-16 text-center px-2 py-1 rounded-md border ${getMethodColor(api.method)}`}>
                        {api.method}
                    </span>
                    <span className="font-semibold text-white">{api.name}</span>
                    <span className="font-mono text-gray-400 text-sm hidden md:block">{api.route}</span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-6 border-t border-gray-800 bg-black/20">
                    <p className="text-gray-300 mb-6">{api.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-green-400 mb-2 font-mono">Try it out</h4>
                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-sm mb-2">Request Body (JSON)</p>
                                <textarea 
                                    className="w-full h-32 bg-gray-800 text-gray-200 rounded-md p-2 font-mono text-xs resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    placeholder={`{\n  "key": "value"\n}`}
                                />
                                <button
                                    onClick={onApiCall}
                                    className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                                >
                                    Send Request
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-400 mb-2 font-mono">Example Response</h4>
                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-full">
                                <pre className="text-xs text-gray-300 overflow-x-auto">
                                    <code>
{`{
  "status": "success",
  "data": {
    "message": "API response placeholder."
  }
}`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiDropdown;