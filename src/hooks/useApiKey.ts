import { useState, useEffect } from 'react';

function useApiKey(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedApiKey = window.localStorage.getItem("apiKey") || "";
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && apiKey!=="") {
      window.localStorage.setItem("apiKey", apiKey);
    }
  }, [apiKey]);

  return [apiKey, setApiKey];
};

export default useApiKey;