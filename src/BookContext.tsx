import { createContext, ReactNode, useContext, useState } from 'react';

type Book = { name: string };

type BookContextValue = {
  book: Book;
  changeName: (newName: string) => void;
};

const BookContext = createContext<BookContextValue | null>(null);

const BookProvider = ({ children }: { children: ReactNode }) => {
  console.log('BookProvider called');
  const [book, setBook] = useState<Book>({ name: '' });

  const changeName = (name: string) => {
    setBook((book) => ({ ...book, name }));
  };

  const value = { book, changeName };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

const useBook = () => {
  console.log('useBook called');
  const value = useContext(BookContext);

  if (!value) {
    throw new Error('🗣️ useBook hook used without BookContext');
  }

  return value;
};

export { BookProvider, BookContext, useBook };
