import { ContentService } from '../features/content/services/ContentService';

// Minimal shim kept for compatibility with legacy imports of DataService
const instance = ContentService.getInstance();
export default instance;

// Also re-export useful functions for legacy call sites
export const initialize = (settings: any) => instance.initialize(settings);
export const getCategories = () => instance.getCategories();
export const getRulesByCategory = (name: string) => instance.getRulesByCategory(name);
export const getAllRules = () => instance.getAllRules();
export const searchRules = (q: string) => instance.searchRules(q);
