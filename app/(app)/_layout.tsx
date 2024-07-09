import { Stack } from 'expo-router';
import { Menu } from '@components/Menu';

const RootLayout = () => {
  const ChatsHeaderRight = () => <Menu />;
  const chatsOptions = {
    headerStyle: { backgroundColor: '#6366f1' },
    headerTitleStyle: { color: '#FCFCFC' },
    headerTitle: 'Chats',
    headerRight: ChatsHeaderRight
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={chatsOptions} />
      <Stack.Screen name="chatRoom" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}

export default RootLayout;
