import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { DemoBottomSheet } from '@/components/common/DemoBottomSheet';
import EditScreenInfo from '@/components/EditScreenInfo';
import { logout } from '@/features/auth';
import { useAppDispatch } from '@/store/hooks';

export default function TabOneScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <Text className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-50">Tab One</Text>
      <View className="my-6 h-px w-4/5 bg-neutral-200 dark:bg-neutral-700" />
      <EditScreenInfo path="app/(drawer)/(tabs)/index.tsx" />
      <DemoBottomSheet label={t('openSheet')} title={t('sheetTitle')} />
      <View className="mt-6">
        <Button mode="outlined" onPress={() => void dispatch(logout())}>
          Sign out
        </Button>
      </View>
    </View>
  );
}
