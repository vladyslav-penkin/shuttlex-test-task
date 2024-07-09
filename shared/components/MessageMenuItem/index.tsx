import { FC } from 'react';
import { MenuOption } from 'react-native-popup-menu';
import { Box, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialIcons as MaterialIconsType } from '@shared/types/Icons';

interface MessageMenuItemProps {
  title: string;
  icon: MaterialIconsType;
  color: string;
  onSelect?: () => void;
}

export const MessageMenuItem: FC<MessageMenuItemProps> = ({ title, icon, color, onSelect }) => {
  return (
    <MenuOption onSelect={onSelect}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical={5}
        paddingHorizontal={10}
      >
        <Text color={color}>{title}</Text>
        <MaterialIcons name={icon} size={24} color={color} />
      </Box>
    </MenuOption>
  );
};