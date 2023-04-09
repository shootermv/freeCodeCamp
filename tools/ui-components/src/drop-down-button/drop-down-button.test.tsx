import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { MenuItems } from '../menu-items/menu-items';
import { DropDownButton } from './drop-down-button';

describe('<DropDownButton>', () => {
  it('should render button with text', () => {
    render(
      <DropDownButton toggleLabel='Some Button'>
        <MenuItems href=''>Option</MenuItems>
        <MenuItems href=''>Option</MenuItems>
        <MenuItems href=''>Option</MenuItems>
      </DropDownButton>
    );
    const dropdown = screen.getByText('Some Button');
    const unorderedList = screen.getByRole('menu');
    const MenuItem = within(unorderedList).getAllByText('Option');
    expect(unorderedList).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    within(dropdown).getByRole('img');
    expect(MenuItem.length).toBe(3);

    unorderedList.childNodes.forEach((menuItem, index) => {
      expect(menuItem).toBe(MenuItem[index]);
    });
  });

  it('should render button with direction to up', () => {
    render(
      <DropDownButton toggleLabel='Some Button' dropup={true}>
        <MenuItems href=''>Option</MenuItems>
        <MenuItems href=''>Option</MenuItems>
        <MenuItems href=''>Option</MenuItems>
      </DropDownButton>
    );
    const unorderedList = screen.getByRole('menu');
    expect(unorderedList).toHaveClass(
      'shadow-lg bg-foreground-primary text-background-primary text-center ring-1 ring-black ring-opacity-5 focus:outline-transparent origin-top-right absolute py-1 transform -translate-y-full top-2 w-full'
    );
  });
});
