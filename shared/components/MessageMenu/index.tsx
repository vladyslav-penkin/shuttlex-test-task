import { FC, ReactNode } from 'react';
import { Menu as MenuContainer, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Box } from '@gluestack-ui/themed';
import { MessageMenuItem } from '@components/MessageMenuItem';
import { MaterialIcons as MaterialIconsType } from '@shared/types/Icons';

interface MessageMenuProps {
  children: ReactNode;
  onOpenModal: () => void;
}

export const MessageMenu: FC<MessageMenuProps> = ({ children, onOpenModal }) => {
  const items = [
    { title: 'Copy', icon: MaterialIconsType.COPY, color: '#0C0C0C' },
    { title: 'Delete', icon: MaterialIconsType.DELETE, color: '#ef4444', onSelect: onOpenModal },
  ];
  return (
    <MenuContainer>
      <MenuTrigger>
        {children}
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer: {
          borderRadius: 10,
          borderCurve: 'continuous',
          marginTop: -40,
          marginLeft: 30,
        }
      }}>
        {items.map(({ title, icon, color, onSelect }, index) => {
          const isNotLast = items.length !== index + 1;
          return (
            <>
              <MessageMenuItem
                title={title}
                icon={icon}
                color={color}
                onSelect={onSelect}
              />
              {isNotLast && (
                <Box w="100%" h={1} backgroundColor="$secondary200" borderRadius={20} />
              )}
            </>
          );
        })}
      </MenuOptions>
    </MenuContainer>
  );
};