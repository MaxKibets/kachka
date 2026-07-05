import * as React from 'react';

export interface RestDividerProps {
  /** Default "Rest" — source uses e.g. "90s rest" */
  label?: string;
  /** Default a clock glyph */
  icon?: React.ReactNode;
}

/** Line—pill—line divider between exercises inside a superset, labeling the rest interval. */
export function RestDivider(props: RestDividerProps): JSX.Element;
