// Shared TypeScript types

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'white' | 'secondary' | 'secondaryBlue' | 'ghost' | 'ghostWhite' | 'social' | 'apple';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ComponentType<any>;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
  justify?: 'center' | 'space-between' | 'start' | 'end';
  type?: 'button' | 'submit';
}

export interface InputProps {
  label?: string;
  error?: string;
  icon?: string | React.ComponentType<any>;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  className?: string;
  onIconPress?: () => void;
  iconPosition?: 'start' | 'end';
  textAlign?: 'left' | 'right';
  placeholderAlign?: 'left' | 'right';
  labelColor?: string;
  customPrefix?: React.ReactNode;
  autoComplete?: string;
  secureTextEntry?: boolean;
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export interface NavigationParams {
  [key: string]: any;
}
