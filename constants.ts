import { Category } from './types';
import { randomBibleVerseTool } from '../API/Other/randomBibleVerse';

// This data structure now imports "detected" API tools and organizes them
// into categories for the UI to display.
export const API_CATEGORIES: Category[] = [
    {
        id: 'other',
        name: 'Other',
        apis: [
            randomBibleVerseTool,
        ],
    },
];
