import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';

export default function DrawerTabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable className="mr-4">
                {({ pressed }) => (
                  <View className={pressed ? 'opacity-50' : 'opacity-100'}>
                    <Ionicons name="information-circle-outline" size={25} color={Colors[colorScheme ?? 'light'].text} />
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: t('tabTwo'),
          tabBarIcon: ({ color }) => <Ionicons name="layers-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
