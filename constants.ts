import { Category } from './types';

// This data simulates the dynamic detection of API files from a folder structure
// as requested. For example, `API/Other/randomBible.js` would be detected and
// transformed into the data structure below.
export const API_CATEGORIES: Category[] = [
    {
        id: 'other',
        name: 'Other',
        apis: [
            {
                id: 'random-bible-verse',
                method: 'POST',
                name: 'Get Random Bible Verse',
                route: '/api/other/random-bible',
                description: 'Fetches a random verse from the Bible, providing a source of inspiration or reflection.',
            },
        ],
    },
];