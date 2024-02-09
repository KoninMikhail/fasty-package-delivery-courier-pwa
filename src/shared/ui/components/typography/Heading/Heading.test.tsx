import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders a default h1 tag', () => {
    const { getByText } = render(<Heading>Hello, world!</Heading>);
    const headingElement = getByText('Hello, world!');
    expect(headingElement.tagName).toBe('H1');
  });

  it('renders the correct HTML tag based on the "tag" prop', () => {
    const { getByText } = render(<Heading tag="h3">Section Title</Heading>);
    const headingElement = getByText('Section Title');
    expect(headingElement.tagName).toBe('H3');
  });

  it('applies size classes correctly', () => {
    const { getByText } = render(<Heading size="large">Large Title</Heading>);
    const headingElement = getByText('Large Title');
    expect(headingElement).toHaveClass('text-2xl');
  });

  it('applies weight classes correctly', () => {
    const { getByText } = render(<Heading weight="bold">Bold Title</Heading>);
    const headingElement = getByText('Bold Title');
    expect(headingElement).toHaveClass('font-bold');
  });

  it('includes extra className when passed', () => {
    const { getByText } = render(<Heading className="underline">Underlined</Heading>);
    const headingElement = getByText('Underlined');
    expect(headingElement).toHaveClass('underline');
  });

  it('passes other HTML attributes correctly', () => {
    const { getByText } = render(<Heading id="main-title">Main Title</Heading>);
    const headingElement = getByText('Main Title');
    expect(headingElement).toHaveAttribute('id', 'main-title');
  });
});