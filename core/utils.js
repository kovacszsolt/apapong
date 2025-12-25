// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Loads a value from localStorage with fallback to default
 * @param {string} key - localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist or parsing fails
 * @returns {*} Parsed value or default
 */
function loadFromLocalStorage(key, defaultValue) {
    if (typeof localStorage === 'undefined') {
        return defaultValue;
    }
    
    const saved = localStorage.getItem(key);
    if (!saved) {
        return defaultValue;
    }
    
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.error(`Error loading ${key} from localStorage:`, e);
        return defaultValue;
    }
}

/**
 * Exports functions to window for testing
 * @param {Object} functions - Object with function names as keys and functions as values
 */
function exportForTesting(functions) {
    if (typeof window !== 'undefined' && window.__TEST__) {
        Object.keys(functions).forEach(name => {
            window[name] = functions[name];
        });
    }
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.loadFromLocalStorage = loadFromLocalStorage;
    window.exportForTesting = exportForTesting;
}

// Also make available in Node.js/test environment
if (typeof global !== 'undefined') {
    global.loadFromLocalStorage = loadFromLocalStorage;
    global.exportForTesting = exportForTesting;
}

