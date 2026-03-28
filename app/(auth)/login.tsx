import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { login, loginFormSchema, selectLoginStatus, type LoginFormValues } from '@/features/auth';
import { useAlerts } from '@/providers/AlertsProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showMessage } = useAlerts();
  const loginStatus = useAppSelector(selectLoginStatus);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const busy = loginStatus === 'loading';

  const onSubmit = handleSubmit((data) => {
    void dispatch(login({ email: data.email.trim(), password: data.password }))
      .unwrap()
      .then(() => {
        showMessage('Signed in');
      })
      .catch((err: unknown) => {
        const msg = typeof err === 'string' ? err : 'Login failed';
        setError('root', { message: msg });
        showMessage(msg);
      });
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center bg-white px-6 dark:bg-neutral-950"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="gap-4">
        <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{t('loginTitle')}</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t('email')}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              disabled={busy}
              error={Boolean(errors.email)}
            />
          )}
        />
        {errors.email ? <Text className="text-sm text-red-600">{errors.email.message}</Text> : null}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t('password')}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              autoComplete="password"
              disabled={busy}
              error={Boolean(errors.password)}
            />
          )}
        />
        {errors.password ? <Text className="text-sm text-red-600">{errors.password.message}</Text> : null}
        {errors.root ? <Text className="text-sm text-red-600">{errors.root.message}</Text> : null}
        <Button mode="contained" onPress={onSubmit} loading={busy} disabled={busy}>
          {t('signIn')}
        </Button>
        <Text className="text-center text-sm text-neutral-500">
          Set EXPO_PUBLIC_MOCK_AUTH=true for a demo login without an API.
        </Text>
        <Link href="/modal" asChild>
          <Button mode="text">Modal route</Button>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
