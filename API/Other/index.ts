import { randomBibleVerseTool } from './randomBibleVerse';
import { Category } from '../../types';

// This file defines the category based on its folder name ("Other").
// It collects all the API tools in this directory.
export const otherCategory: Category = {
    id: 'other',
    name: 'Other',
    apis: [
        randomBibleVerseTool,
        // Future tools in the "Other" category would be imported and added here.
    ],
};
