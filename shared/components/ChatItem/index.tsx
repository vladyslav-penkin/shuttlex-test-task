import { FC, useState, useEffect } from 'react';
import { Box, Pressable, Text, } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import { ExpoRouter } from 'expo-router/types/expo-router';
import { Message } from '@shared/types/Message';
import { User as UserType } from '@shared/types/User';
import { User } from 'firebase/auth';
import { FIRESTORE_DB } from '@/firebaseConfig';
import { DocumentData, doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { formatDate, getRoomId, sliceLastMessage } from '@utils/helpers';

interface ChatItemProps {
  item: UserType;
  hasNoBorder: boolean;
  router: ExpoRouter.Router;
  currentUser: User | null;
}

export const ChatItem: FC<ChatItemProps> = ({ item, hasNoBorder, router, currentUser }) => {
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  useEffect(() => {
    const roomdId = getRoomId(`${currentUser?.uid || 0}`, `${item.userId || 0}`);
    const docRef = doc(FIRESTORE_DB, 'rooms', roomdId);
    const messageRef = collection(docRef, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc: DocumentData) => doc.data());
      setLastMessage(allMessages[0] as Message || null);
    });

    return unsub;
  }, []);


  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: { ...item } });
  };

  const renderTime = () => {
    if (lastMessage) {
      const date = lastMessage?.createdAt;
      return formatDate(new Date(date.seconds * 1000));
    }
  };

  const renderLastMessage = () => {
    let message = '';
    if (lastMessage === undefined) message = 'Loading...';

    if (lastMessage) {
      if (currentUser?.uid === lastMessage?.userId) {
        message = `You: ${sliceLastMessage(lastMessage?.text || '')}`;
      } else {
        message = sliceLastMessage(lastMessage?.text || '');
      }
    } else {
      message = 'Say Hi 👋';
    }

    return message;
  };
  return (
    <Pressable
      display="flex"
      flexDirection="row"
      alignItems="center"
      flexGrow={1}
      minHeight={50}
      borderBottomWidth={hasNoBorder ? 1 : 0}
      borderColor="$secondary200"
      borderStyle="solid"
      padding={10}
      onPress={openChatRoom}
    >
      <Box display="flex" alignItems="center" justifyContent="center" flexBasis="16%">
        <Image
          style={{ height: 50, aspectRatio: 1, borderRadius: 100 }}
          source={require('@assets/icons/user.png')}
          alt="user"
          transition={500}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" flexBasis="66%" paddingHorizontal={10}>
        <Text>{item.username}</Text>
        <Text size="sm">{renderLastMessage()}</Text>
      </Box>
      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexBasis="16%">
        <Text color="gray" size="sm">{renderTime()}</Text>
      </Box>
    </Pressable>
  );
};
