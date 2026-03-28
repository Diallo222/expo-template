import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react';
import { Snackbar } from 'react-native-paper';

type AlertContextValue = {
  showMessage: (message: string) => void;
};

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function AlertsProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string | null>(null);
  const showMessage = useCallback((m: string) => {
    setMessage(m);
  }, []);

  return (
    <AlertContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar visible={message !== null} onDismiss={() => setMessage(null)} duration={4000}>
        {message ?? ''}
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlerts(): AlertContextValue {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlerts must be used within AlertsProvider');
  }
  return ctx;
}
