import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast can only be used within ToastProvider');
  }
  return context;
};

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToast] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((toastId: string) => {
    setToast(prevState => prevState.filter(({ id }) => id !== toastId));
  }, []);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };
      if (type !== 'error') {
        setTimeout(() => {
          removeToast(id);
        }, 4000);
      }
      setToast(prevState => [...prevState, toast]);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={toasts} />
    </ToastContext.Provider>
  );
};

export { ToastProvider, useToast };
