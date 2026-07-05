export interface RestBarProps {
  /** e.g. "Superset A · Dumbbell row" */
  exerciseLabel: string;
  /** Countdown display, e.g. "01:24" */
  time: string;
  /** Countdown progress, 0–100. Default 56. */
  value?: number;
  /** Called with -15 or +15 */
  onAdjust?: (deltaSeconds: number) => void;
  onSkip?: () => void;
}

/**
 * @startingPoint section="Components" subtitle="Rest-timer bottom sheet" viewport="390x230"
 */
export function RestBar(props: RestBarProps): JSX.Element;
