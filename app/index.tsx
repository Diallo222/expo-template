import { Redirect } from 'expo-router';

import { selectAuthHydrated, selectIsAuthenticated } from '@/features/auth';
import { useAppSelector } from '@/store/hooks';

export default function IndexScreen() {
  const hydrated = useAppSelector(selectAuthHydrated);
  const isAuthed = useAppSelector(selectIsAuthenticated);

  if (!hydrated) {
    return null;
  }

  if (isAuthed) {
    return <Redirect href="/(drawer)/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
