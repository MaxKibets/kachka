export interface LiveIndicatorProps {
  /** Elapsed time display, e.g. "22:08" */
  time: string;
}

/** Pulsing accent dot + tabular elapsed-time readout, shown under the screen title. */
export function LiveIndicator(props: LiveIndicatorProps): JSX.Element;
