export interface StatBlockProps {
  value: React.ReactNode;
  /** Full-size, --text-2 colored suffix after the value, e.g. "/ 14" */
  suffix?: React.ReactNode;
  /** Smaller (10px), --text-2 colored unit after the value, e.g. "kg" */
  unit?: React.ReactNode;
  label: string;
}

/** Bottom-bar stat block: a tabular-nums value (with optional suffix/unit) over an uppercase caption. */
export function StatBlock(props: StatBlockProps): JSX.Element;
