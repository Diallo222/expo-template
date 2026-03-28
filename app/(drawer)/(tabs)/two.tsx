import { Text, View } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <Text className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-50">Tab Two</Text>
      <View className="my-6 h-px w-4/5 bg-neutral-200 dark:bg-neutral-700" />
      <EditScreenInfo path="app/(drawer)/(tabs)/two.tsx" />
    </View>
  );
}
