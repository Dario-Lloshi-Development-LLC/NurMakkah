import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { theme } from '../styles/theme';

interface Props {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Button;
