import { KeyboardAvoidingView, ScrollView } from '@gluestack-ui/themed';
import { FC, ReactNode } from 'react';

interface CustomKeyboardViewProps {
  children: ReactNode;
  inChat: boolean;
}

export const CustomKeyboardView: FC<CustomKeyboardViewProps> = ({ children, inChat }) => {
  const kavConfig = inChat ? { keyboardVerticalOffset: 90 } : {};
  const scrollViewConfig = inChat ? { contentContainerStyle: { flex: 1 } } : {};

  return (
    <KeyboardAvoidingView
      behavior="height"
      flex={1}
      {...kavConfig}
    >
      <ScrollView
        flex={1}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};