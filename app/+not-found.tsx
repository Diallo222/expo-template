import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-white p-5 dark:bg-neutral-950">
        <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-50">This screen does not exist.</Text>

        <Link href="/" className="mt-4 py-4">
          <Text className="text-center text-sm text-[#2e78b7]">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
