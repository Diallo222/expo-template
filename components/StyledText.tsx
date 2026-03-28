import { Text, type TextProps } from 'react-native';

export function MonoText(props: TextProps) {
  const { style, ...rest } = props;
  return <Text {...rest} style={[{ fontFamily: 'SpaceMono' }, style]} />;
}
