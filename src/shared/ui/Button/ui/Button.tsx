import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import Spinner from '../../Spinner/Spinner';
import { buttonVariants, DEFAULT_SIZE, DEFAULT_THEME } from '../config/config';
import { Size, Theme } from '../types/types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: Size;
  theme?: Theme;
  isLoading?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      theme = DEFAULT_SIZE,
      isLoading,
      size = DEFAULT_THEME,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={buttonVariants({ size, theme, className })}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
