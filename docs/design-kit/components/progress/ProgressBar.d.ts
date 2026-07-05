export interface ProgressBarProps {
  /** Number of discrete segments (superset rounds). 1 = continuous mode. Default 1. */
  segments?: number;
  /** Segments filled/active, left to right. Only used when segments > 1. */
  current?: number;
  /** Fill percentage (0–100). Only used in continuous mode (segments === 1). */
  value?: number;
  /** Track/fill thickness in px. Default 4. */
  height?: number;
}

/** Segmented (round progress) or continuous (rest countdown) progress track — same visual language, one component. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
