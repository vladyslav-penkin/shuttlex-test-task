import React, { FC } from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';

interface BasicButtonProps {
  title: string;
  w?: number;
  h?: number;
  style?: object;
  otherProps?: object;
  onPress?: () => void;
}

export const BasicButton: FC<BasicButtonProps> = ({ title, w, h, style, onPress, ...otherProps }) => {
  return (
    <Button w={w} h={h} style={style} backgroundColor="$violet500" borderRadius={10} onPress={onPress} {...otherProps}>
      <ButtonText fontWeight="700">{title}</ButtonText>
    </Button>
  );
};