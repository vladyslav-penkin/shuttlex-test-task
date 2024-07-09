import { FC } from 'react';
import { ScrollView } from 'react-native';
import { MessageItem } from '@components/MessageItem';
import { Message } from '@shared/types/Message';
import { User } from 'firebase/auth';

interface MessagesListProps {
  messages: Message[];
  currentUser: User | null;
  roomId: string;
  scrollViewRef: React.MutableRefObject<ScrollView | null>;
}

export const MessagesList: FC<MessagesListProps> = ({ messages, currentUser, roomId, scrollViewRef }) => {
  return (
    <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
      {messages.map((message: Message, index: number) => (
        <MessageItem key={index} message={message} roomId={roomId} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
};