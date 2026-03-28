import { Redirect, Stack } from 'expo-router';

import { selectIsAuthenticated } from '@/features/auth';
import { useAppSelector } from '@/store/hooks';

export default function AuthGroupLayout() {
  const isAuthed = useAppSelector(selectIsAuthenticated);

  if (isAuthed) {
    return <Redirect href="/(drawer)/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
