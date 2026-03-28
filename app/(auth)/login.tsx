import { Link } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { login, selectLoginError, selectLoginStatus } from '@/features/auth';
import { useAlerts } from '@/providers/AlertsProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showMessage } = useAlerts();
  const loginStatus = useAppSelector(selectLoginStatus);
  const loginError = useAppSelector(selectLoginError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const busy = loginStatus === 'loading';

  const onSubmit = () => {
    void dispatch(login({ email: email.trim(), password }))
      .unwrap()
      .then(() => {
        showMessage('Signed in');
      })
      .catch((err: unknown) => {
        const msg = typeof err === 'string' ? err : 'Login failed';
        showMessage(msg);
      });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center bg-white px-6 dark:bg-neutral-950"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="gap-4">
        <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{t('loginTitle')}</Text>
        <TextInput
          mode="outlined"
          label={t('email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          disabled={busy}
        />
        <TextInput
          mode="outlined"
          label={t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          disabled={busy}
        />
        {loginError ? <Text className="text-sm text-red-600">{loginError}</Text> : null}
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
