import { FC, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView } from 'react-native';
import { Box, Input, InputField, Pressable } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { ChatScreenHeader } from '@components/ChatScreenHeader';
import { MessagesList } from '@components/MessagesList';
import { CustomKeyboardView } from '@components/CustomKeyboardView';
import { useAuth } from '@hooks/useAuth';
import { MaterialIcons as MaterialIconsType } from '@shared/types/Icons';
import { Message } from '@shared/types/Message';
import { getRoomId } from '@utils/helpers';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/firebaseConfig';

const ChatScreen: FC = () => {
  const { username, userId } = useLocalSearchParams();
  const { user } = useAuth()
  const [messageQuery, setMessageQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView | null>(null);

  const roomId = getRoomId(`${user?.uid}`, `${userId}`);

  const createRoomIfNotExists = async () => {
    await setDoc(doc(FIRESTORE_DB, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    createRoomIfNotExists();
    const docRef = doc(FIRESTORE_DB, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(allMessages as Message[]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    );

    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const handleSendMessage = async () => {
    const message = messageQuery.trim();

    if (!message) return;

    try {
      const docRef = doc(FIRESTORE_DB, 'rooms', roomId);
      const messagesRef = collection(docRef, 'messages');

      await addDoc(messagesRef, {
        userId: user?.uid,
        text: message,
        senderName: username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setMessageQuery('');
    } catch (error: any) {
      Alert.alert('Message', error.message);
    }
  };

  return (
    <CustomKeyboardView inChat={true}>
      <StatusBar style="dark" />
      <ChatScreenHeader title={`${username}`} router={router} />
      <Box display="flex" h="100%" justifyContent="space-between">
        <Box h="85%">
          <MessagesList messages={messages} currentUser={user} roomId={roomId} scrollViewRef={scrollViewRef} />
        </Box>
        <Box h="15%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            borderWidth={1}
            borderColor="$secondary200"
            borderStyle="solid"
            borderRadius={20}
            bgColor="$light50"
            padding={2}
          >
            <Input display="flex" flexGrow={1} borderWidth={0} borderRadius={50}>
              <InputField
                type="text"
                placeholder="Type message..."
                placeholderTextColor="$secondary200"
                value={messageQuery}
                bgColor="$light50"
                onChangeText={(text) => setMessageQuery(text)}
                color="$secondary950"
              />
            </Input>
            <Pressable
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgColor="$secondary200"
              borderRadius={50}
              paddingHorizontal={8}
              onPress={handleSendMessage}
            >
              <MaterialIcons name={MaterialIconsType.SEND} size={24} color="#0C0C0C" />
            </Pressable>
          </Box>
        </Box>
      </Box>
    </CustomKeyboardView>
  );
};

export default ChatScreen;
