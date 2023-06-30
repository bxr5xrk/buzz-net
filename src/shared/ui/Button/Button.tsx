import { cl } from '@/shared/lib';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import Spinner from '../Spinner/Spinner';
import {
  DEFAULT_SIZE,
  DEFAULT_THEME,
  SIZE_OPTIONS,
  THEME_OPTIONS,
} from './config';
import { Size, Theme } from './types';

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
        className={cl(
          SIZE_OPTIONS[size],
          THEME_OPTIONS[theme],
          'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900',
          className
        )}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
