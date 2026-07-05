import * as React from 'react';

export interface IconButtonProps {
  /** Icon element — an inline SVG using stroke="currentColor" or fill="currentColor" */
  icon: React.ReactNode;
  /** 44px for primary nav/header actions, 30px for secondary/kebab actions. Default 'lg'. */
  size?: 'lg' | 'sm';
  onClick?: () => void;
  ariaLabel?: string;
}

/** The product's only icon-button shape: a circular ghost button in two sizes. */
export function IconButton(props: IconButtonProps): JSX.Element;
