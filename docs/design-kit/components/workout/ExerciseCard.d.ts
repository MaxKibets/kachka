import * as React from 'react';

export interface ExerciseCardProps {
  icon: React.ReactNode;
  /** Tints the icon chip with --current-tint/--accent instead of --surface-2/--text-2. Use for the active superset. */
  accentIcon?: boolean;
  title: string;
  /** Right-aligned meta next to the kebab, e.g. "Round 2 of 3" */
  meta?: React.ReactNode;
  /** Show the "more" kebab button. Default true. */
  kebab?: boolean;
  onKebabClick?: () => void;
  /** A ProgressBar element, rendered under the header with a 16px bottom margin */
  progress?: React.ReactNode;
  /** Footer button label, e.g. "Add set" / "Add round". Omit to hide the button entirely. */
  addLabel?: string;
  onAdd?: () => void;
  /** SetTable(s) / RestDivider, stacked with a 10px gap */
  children?: React.ReactNode;
  /**
   * Strips the outer card chrome (bg/border/padding) and the add-button —
   * for the nested per-exercise header+table blocks inside a superset card.
   * Default false.
   */
  bare?: boolean;
}

/**
 * @startingPoint section="Components" subtitle="Exercise card — simple or superset (nested via bare)" viewport="390x260"
 */
export function ExerciseCard(props: ExerciseCardProps): JSX.Element;
