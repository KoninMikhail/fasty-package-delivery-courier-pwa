import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text }from './Text';

describe('Text', () => {
  it('renders a default p tag', () => {
    const { getByText } = render(<Text>Hello, world!</Text>);
    const textElement = getByText('Hello, world!');
    expect(textElement.tagName).toBe('P');
  });

  it('renders the correct HTML tag based on the "as" prop', () => {
    const { getByText } = render(<Text as="span">Inline Text</Text>);
    const textElement = getByText('Inline Text');
    expect(textElement.tagName).toBe('SPAN');
  });

  it('applies size classes correctly', () => {
    const { getByText } = render(<Text size="large">Large Text</Text>);
    const textElement = getByText('Large Text');
    expect(textElement).toHaveClass('text-lg');
  });

  it('applies weight classes correctly', () => {
    const { getByText } = render(<Text weight="bold">Bold Text</Text>);
    const textElement = getByText('Bold Text');
    expect(textElement).toHaveClass('font-bold');
  });

  it('includes extra className when passed', () => {
    const { getByText } = render(<Text className="underline">Underlined Text</Text>);
    const textElement = getByText('Underlined Text');
    expect(textElement).toHaveClass('underline');
  });

  it('passes other HTML attributes correctly', () => {
    const { getByText } = render(<Text id="main-text">Main Text</Text>);
    const textElement = getByText('Main Text');
    expect(textElement).toHaveAttribute('id', 'main-text');
  });
});