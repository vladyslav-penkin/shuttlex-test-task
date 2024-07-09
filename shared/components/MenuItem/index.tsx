import { FC } from 'react';
import { MenuOption } from 'react-native-popup-menu';
import { Box, Text } from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
import { AntDesignIcons } from '@shared/types/Icons';

interface MenuItemProps {
  title: string;
  icon: AntDesignIcons;
  color: string;
  onSelect?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({ title, icon, color, onSelect }) => {
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
        <AntDesign name={icon} size={24} color={color} />
      </Box>
    </MenuOption>
  );
};