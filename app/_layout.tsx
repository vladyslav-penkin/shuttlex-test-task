import { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Stack, useRouter, useSegments } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '@contexts/AuthContext';
import { useAuth } from '@shared/hooks/useAuth';
import { MenuProvider } from 'react-native-popup-menu';

export const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isAuthenticated === null) return;
    const inApp = segments[0] === '(app)';

    if (isAuthenticated) {
      if (!inApp) router.replace('(app)');
    } else if (!isAuthenticated) {
      if (inApp) router.replace('signin');
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <GluestackUIProvider config={config}>
      <MenuProvider>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </MenuProvider>
    </GluestackUIProvider>
  );
};

export default RootLayout;
