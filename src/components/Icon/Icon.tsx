import React from 'react';
import { useTheme } from 'styled-components';
import { ICONS } from './icons';

type Props = {
  icon: keyof typeof ICONS;
  size?: number;
  color?: string;
  onClick?: () => void;
};

const Icon = ({ icon, color, size = 32, ...props }: Props) => {
  const theme = useTheme();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color || theme.colors.blue}
      stroke={color || theme.colors.blue}
      {...props}
    >
      <path d={ICONS[icon]} />
    </svg>
  );
};

export default Icon;
