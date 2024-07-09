import { FC } from 'react';
import { FlatList } from 'react-native';
import { ChatItem } from '@components/ChatItem';
import { useRouter } from 'expo-router';
import { User as UserType } from '@shared/types/User';
import { User } from 'firebase/auth';

interface ChatListProps {
  users: UserType[];
  currentUser: User | null;
}

export const ChatList: FC<ChatListProps> = ({ users, currentUser }) => {
  const router = useRouter();
  return (
    <FlatList
      data={users}
      renderItem={({ item, index }) => (
        <ChatItem
          item={item}
          hasNoBorder={users.length !== index + 1}
          router={router}
          currentUser={currentUser}
        />
      )}
      keyExtractor={(item) => `${item.userId}`}
    />
  );
};