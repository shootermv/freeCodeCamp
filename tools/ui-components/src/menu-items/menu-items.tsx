import { Menu } from '@headlessui/react';
import React, { useCallback } from 'react';
import type { ButtonProps } from '../button';

export type MenuItemsProps = React.ComponentPropsWithoutRef<typeof Menu.Items> &
  ButtonProps;

const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>(
  ({ className, type, onClick, disabled, children, ...rest }, ref) => {
    // Manually prevent click event if the button is disabled
    // as `aria-disabled` marks the element disabled but still registers the click event.
    // Ref: https://css-tricks.com/making-disabled-buttons-more-inclusive/#aa-the-difference-between-disabled-and-aria-disabled
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const ariaDisabled = event.currentTarget.getAttribute('aria-disabled');

        if (!ariaDisabled && onClick) {
          onClick(event);
        }
      },
      [onClick]
    );
    return (
      <button
        className={className}
        type={type ?? 'button'}
        onClick={handleClick}
        aria-disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

const Link = React.forwardRef<React.ElementRef<'a'>, ButtonProps>(
  ({ className, href, download, target, children, ...rest }, ref) => {
    return (
      <a
        className={className}
        href={href}
        download={download}
        target={target}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

export const HeadlessButton = React.forwardRef<
  React.ElementRef<'button' | 'a'>,
  ButtonProps
>(
  (
    { type, onClick, className, children, disabled, href, download, target },
    ref
  ) => {
    if (href || !disabled) {
      return (
        <Link
          className={className}
          href={href}
          download={download}
          target={target}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <Button
          className={className}
          type={type}
          onClick={onClick}
          aria-disabled={disabled}
          ref={ref as React.Ref<HTMLButtonElement>}
        >
          {children}
        </Button>
      );
    }
  }
);

const defaultClass =
  'block w-full text-start no-underline px-[20px] py-[3px] bg-foreground-primary text-background-primary bg-foreground-primary text-background-primary focus:text-foreground-primary focus:bg-background-primary hover:text-foreground-primary hover:bg-background-primary';

export const MenuItems = ({
  children,
  className,
  ...props
}: MenuItemsProps): JSX.Element => {
  const classes = [defaultClass, className].join(' ');
  return (
    <Menu.Items as='li'>
      <HeadlessButton className={classes} {...props}>
        {children}
      </HeadlessButton>
    </Menu.Items>
  );
};

Button.displayName = 'Button';
Link.displayName = 'Link';
HeadlessButton.displayName = 'HeadlessButton';
