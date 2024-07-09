import { MaterialIcons } from '@shared/types/Icons';

export interface MessageMenu {
  title: string;
  icon: MaterialIcons;
  color: string;
  onSelect?: () => void;
}