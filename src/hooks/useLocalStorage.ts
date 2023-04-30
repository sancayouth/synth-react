import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: unknown) => {
    const [storedValue, setStoredVAlue] = useState<any>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue
        }
    });

    const setValue = (value: any): void => {
        try {
            setStoredVAlue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};
