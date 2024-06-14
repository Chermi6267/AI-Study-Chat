import { useState, useEffect } from "react";

// A hook for retrieving and storing data in localStorage
export const useLocalStorage = (key, defData) => {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);
    return JSON.parse(localData) || defData;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
