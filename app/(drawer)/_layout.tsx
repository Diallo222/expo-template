import { Drawer } from 'expo-router/drawer';
import { Redirect } from 'expo-router';

import { selectIsAuthenticated } from '@/features/auth';
import { useAppSelector } from '@/store/hooks';

export default function DrawerGroupLayout() {
  const isAuthed = useAppSelector(selectIsAuthenticated);

  if (!isAuthed) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'App',
          drawerLabel: 'Home',
        }}
      />
    </Drawer>
  );
}
