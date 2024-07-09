import { FC } from 'react';
import { useAuth } from '@hooks/useAuth';
import { Image } from 'expo-image';
import { Menu as MenuContainer, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { MenuItem } from '@components/MenuItem';
import { AntDesignIcons } from '@shared/types/Icons';
import { Box } from '@gluestack-ui/themed';

export const Menu: FC = () => {
  const { logout } = useAuth();
  const items = [
    { title: 'Profile', icon: AntDesignIcons.USER, color: '#0C0C0C' },
    { title: 'Sign Out', icon: AntDesignIcons.LOGOUT, color: '#ef4444', onSelect: async () => await logout() },
  ];

  return (
    <MenuContainer>
      <MenuTrigger>
        <Image
          style={{ height: 40, aspectRatio: 1, borderRadius: 100 }}
          source={require('@assets/icons/user.png')}
          alt="user"
          transition={500}
        />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer: {
          borderRadius: 10,
          borderCurve: 'continuous',
          marginTop: 40,
          marginLeft: -30,
        }
      }}>
        {items.map(({ title, icon, color, onSelect }, index) => {
          const isNotLast = items.length !== index + 1;
          return (
            <Box key={title}>
              <MenuItem
                title={title}
                icon={icon}
                color={color}
                onSelect={onSelect}
              />
              {isNotLast && (
                <Box w="100%" h={1} backgroundColor="$secondary200" borderRadius={20} />
              )}
            </Box>
          );
        })}
      </MenuOptions>
    </MenuContainer>
  );
};