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
        <BottomSheetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
          <Text className="text-center text-lg font-semibold">{title}</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
