export interface CTAButtonProps {
  /** Default "FINISH" */
  label?: string;
  /** Text shown mid-cycle, hinting the hold gesture. Default "Hold to" */
  holdLabel?: string;
  onClick?: () => void;
}

/** The bottom-bar primary action — a flag-flanked label that periodically swaps to a hold-to-confirm hint. */
export function CTAButton(props: CTAButtonProps): JSX.Element;
