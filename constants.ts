import { Category } from './types';
import { otherCategory } from './API/Other';

// This structure simulates "detecting" category folders by importing
// the complete category definitions from each category's index file.
export const API_CATEGORIES: Category[] = [
    otherCategory,
    // To add a new category, create a new folder in API/ with an 
    // index.ts file, define the category, and then import it here.
];
