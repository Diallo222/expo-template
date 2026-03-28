import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

type DemoBottomSheetProps = {
  label: string;
  title: string;
};

export function DemoBottomSheet({ label, title }: DemoBottomSheetProps) {
  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  );

  return (
    <View className="mt-4 w-full items-center">
      <Button mode="contained-tonal" onPress={() => modalRef.current?.present()}>
        {label}
      </Button>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <View className="flex-1 items-center justify-center px-4 py-6">
            <Text className="text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
