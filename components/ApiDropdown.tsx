import React, { useState } from 'react';
import { ApiItem, ApiMethod } from '../types';
import { ChevronDownIcon } from './Icons';
import { getRandomBibleVerse } from '../data/bibleVerses';

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
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendRequest = async () => {
        setIsLoading(true);
        setResponse(null);
        onApiCall();

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        let resultData: any;

        if (api.id === 'random-bible-verse') {
            const { book } = formData;
            resultData = getRandomBibleVerse(book);
        } else {
            // Generic placeholder response for other potential APIs
            resultData = {
                message: `This is a simulated response for ${api.name}.`,
                params: formData,
            };
        }
        
        const responseJson = {
            status: "success",
            data: resultData
        };

        setResponse(JSON.stringify(responseJson, null, 2));
        setIsLoading(false);
    };

    const showParameters = api.method === 'GET' && api.parameters && api.parameters.length > 0;

    const staticResponsePlaceholder = `{
  "status": "success",
  "data": {
    "message": "API response placeholder."
  }
}`;

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
                                {showParameters ? (
                                    <div className="space-y-4">
                                        {api.parameters?.map(param => (
                                            <div key={param.name}>
                                                <label htmlFor={`${api.id}-${param.name}`} className="block text-sm font-mono text-gray-300">
                                                    {param.name} {param.required && <span className="text-red-400">*</span>}
                                                </label>
                                                <p className="text-xs text-gray-500 mb-1">{param.description}</p>
                                                <input
                                                    type={param.type === 'number' ? 'number' : 'text'}
                                                    id={`${api.id}-${param.name}`}
                                                    name={param.name}
                                                    value={formData[param.name] || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-800 text-gray-200 rounded-md p-2 font-mono text-xs focus:ring-2 focus:ring-green-500 focus:outline-none placeholder:text-gray-600"
                                                    placeholder={`Enter ${param.name}...`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm font-mono">This request does not require parameters.</p>
                                )}
                                
                                <div className="mt-4">
                                     <button
                                        onClick={handleSendRequest}
                                        disabled={isLoading}
                                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : 'Send Request'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-400 mb-2 font-mono">Response</h4>
                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-full min-h-[150px]">
                                <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                                    <code>
                                        {isLoading && 'Fetching response...'}
                                        {!isLoading && (response || staticResponsePlaceholder)}
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