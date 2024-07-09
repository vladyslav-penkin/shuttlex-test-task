import { FC } from 'react';
import { Stack } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialIcons as MaterialIconsType } from '@shared/types/Icons';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { Image } from 'expo-image';

interface ChatScreenHeaderProps {
  title: string;
  router: ExpoRouter.Router;
}

export const ChatScreenHeader: FC<ChatScreenHeaderProps> = ({ title, router }) => {
  const handleMoveBack = () => router.back();
  return (
    <Stack.Screen
      options={{
        headerLeft: () => (
          <Box display="flex" flexDirection="row" alignItems="center" gap={20}>
            <TouchableOpacity onPress={handleMoveBack}>
              <MaterialIcons name={MaterialIconsType.ARROWLEFT} size={24} color="#0C0C0C" />
            </TouchableOpacity>
            <Box display="flex" flexDirection="row" alignItems="center" gap={10}>
              <Image
                style={{ height: 40, aspectRatio: 1, borderRadius: 100 }}
                source={require('@assets/icons/user.png')}
                transition={500}
              />
              <Text size="lg" paddingBottom={5}>{title}</Text>
            </Box>
          </Box>
        ),
        headerTitle: '',
        headerShadowVisible: false,
      }}
    />
  );
};