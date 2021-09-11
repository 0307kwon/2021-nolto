import { useEffect, useState } from 'react';

export const useDocument = () => {
  const [myDocument, setMyDocument] = useState(null);

  useEffect(() => {
    setMyDocument(document);
  }, []);

  return myDocument;
};
