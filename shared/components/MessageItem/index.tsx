import { FC, useState } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { Alert } from 'react-native';
import { DeleteMessageModal } from '@components/DeleteMessageModal';
import { MessageMenu } from '@components/MessageMenu';
import { Message } from '@shared/types/Message';
import { User } from 'firebase/auth';
import { FIRESTORE_DB } from '@/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

interface MessageItemProps {
  message: Message;
  currentUser: User | null;
  roomId: string;
}

export const MessageItem: FC<MessageItemProps> = ({ message, currentUser, roomId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteMessage = async () => {
    try {
      const docRef = doc(FIRESTORE_DB, 'rooms', roomId);
      const messagesRef = collection(docRef, 'messages');

      const q = query(messagesRef, where('createdAt', '==', message.createdAt));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('deleted');
      });

      setModalVisible(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const isCurrentUser = currentUser?.uid === message?.userId;

  return (
    <MessageMenu onOpenModal={handleOpenModal}>
      <Box
        display="flex"
        flexDirection="row"
        flexGrow={1}
        justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
        paddingHorizontal={20}
      >
        <Box
          paddingHorizontal={12}
          paddingVertical={10}
          marginVertical={5}
          borderRadius={12}
          borderWidth={1}
          borderStyle="solid"
          borderColor={isCurrentUser ? "$indigo600" : "$secondary200"}
          bgColor={isCurrentUser ? "$indigo600" : "$light50"}
          maxWidth="80%"
        >
          <Text color={isCurrentUser ? "$light50" : "$secondary950"}>{message.text}</Text>
        </Box>
      </Box>
      <DeleteMessageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDeleteMessage}
      />
    </MessageMenu>
  );
};