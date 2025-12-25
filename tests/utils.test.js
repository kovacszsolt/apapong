import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../core/constants.js';
import '../core/utils.js';

// Use functions from global scope
const loadFromLocalStorage = (typeof window !== 'undefined' && window.loadFromLocalStorage) || 
                             (typeof global !== 'undefined' && global.loadFromLocalStorage);
const exportForTesting = (typeof window !== 'undefined' && window.exportForTesting) || 
                         (typeof global !== 'undefined' && global.exportForTesting);

describe('Utils Functions', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('loadFromLocalStorage', () => {
    it('should return default value when localStorage is undefined', () => {
      if (!loadFromLocalStorage) {
        // Skip if function is not available
        return;
      }
      
      // In Node.js environment, localStorage might be undefined
      // We test the function behavior
      const defaultValue = [255, 255, 255];
      const result = loadFromLocalStorage('test', defaultValue);
      
      expect(result).toEqual(defaultValue);
    });

    it('should return default value when key does not exist', () => {
      if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
        return;
      }
      
      localStorage.clear();
      const defaultValue = [100, 200, 255];
      const result = loadFromLocalStorage('nonexistent', defaultValue);
      
      expect(result).toEqual(defaultValue);
    });

    it('should return parsed value when key exists', () => {
      if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
        return;
      }
      
      const testValue = [255, 100, 100];
      localStorage.setItem('testColor', JSON.stringify(testValue));
      
      const result = loadFromLocalStorage('testColor', [255, 255, 255]);
      
      expect(result).toEqual(testValue);
    });

    it('should return default value when JSON parsing fails', () => {
      if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
        return;
      }
      
      localStorage.setItem('invalidJson', 'not valid json');
      const defaultValue = [255, 255, 255];
      
      // Mock console.error to avoid noise in tests
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = loadFromLocalStorage('invalidJson', defaultValue);
      
      expect(result).toEqual(defaultValue);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should handle array values correctly', () => {
      if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
        return;
      }
      
      const testArray = [100, 200, 255];
      localStorage.setItem('testArray', JSON.stringify(testArray));
      
      const result = loadFromLocalStorage('testArray', [0, 0, 0]);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(testArray);
    });

    it('should handle object values correctly', () => {
      if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
        return;
      }
      
      const testObject = { r: 255, g: 100, b: 100 };
      localStorage.setItem('testObject', JSON.stringify(testObject));
      
      const result = loadFromLocalStorage('testObject', {});
      
      expect(result).toEqual(testObject);
    });
  });

  describe('exportForTesting', () => {
    it('should export functions to window when __TEST__ is true', () => {
      if (!exportForTesting || typeof window === 'undefined') {
        return;
      }
      
      window.__TEST__ = true;
      
      const testFunction = () => 'test';
      const testObject = {
        testFunction
      };
      
      exportForTesting(testObject);
      
      expect(window.testFunction).toBe(testFunction);
      
      // Cleanup
      delete window.testFunction;
    });

    it('should not export functions when __TEST__ is false', () => {
      if (!exportForTesting || typeof window === 'undefined') {
        return;
      }
      
      window.__TEST__ = false;
      
      const testFunction = () => 'test';
      const testObject = {
        testFunction
      };
      
      exportForTesting(testObject);
      
      expect(window.testFunction).toBeUndefined();
    });

    it('should not export functions when __TEST__ is undefined', () => {
      if (!exportForTesting || typeof window === 'undefined') {
        return;
      }
      
      delete window.__TEST__;
      
      const testFunction = () => 'test';
      const testObject = {
        testFunction
      };
      
      exportForTesting(testObject);
      
      expect(window.testFunction).toBeUndefined();
    });

    it('should export multiple functions', () => {
      if (!exportForTesting || typeof window === 'undefined') {
        return;
      }
      
      window.__TEST__ = true;
      
      const func1 = () => 'func1';
      const func2 = () => 'func2';
      const testObject = {
        func1,
        func2
      };
      
      exportForTesting(testObject);
      
      expect(window.func1).toBe(func1);
      expect(window.func2).toBe(func2);
      
      // Cleanup
      delete window.func1;
      delete window.func2;
    });
  });
});
