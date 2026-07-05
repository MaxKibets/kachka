import * as React from 'react';

export interface ButtonProps {
  variant?: 'secondary' | 'accent';
  /** Leading icon (rendered before children) */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  /** Block-level 100%-wide button (Add set/Add round). Set false for a flex item in a row (RestBar). Default true. */
  fullWidth?: boolean;
  /** flex shorthand, used when fullWidth is false, e.g. 1 or 1.5 */
  flex?: number | string;
  /** icon/label gap in px. Default 6 ("Skip rest" uses 8). */
  gap?: number;
  /** Override text color. The RestBar ±15s buttons use full --text instead of the default --text-2 — a documented deviation in the source, see Button.prompt.md. */
  tone?: string;
}

/** The product's only two button treatments: secondary (muted fill) and accent (solid orange + glow). */
export function Button(props: ButtonProps): JSX.Element;
