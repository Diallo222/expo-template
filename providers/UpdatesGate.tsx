import * as Updates from 'expo-updates';
import { useEffect, type PropsWithChildren } from 'react';

/**
 * Checks for OTA updates in production. Does not auto-reload; call `Updates.reloadAsync()` when appropriate.
 */
export function UpdatesGate({ children }: PropsWithChildren) {
  useEffect(() => {
    if (__DEV__) {
      return;
    }
    void (async () => {
      try {
        const result = await Updates.checkForUpdateAsync();
        if (result.isAvailable) {
          await Updates.fetchUpdateAsync();
        }
      } catch {
        // Network or updates unavailable — ignore for template startup.
      }
    })();
  }, []);

  return <>{children}</>;
}
