export interface SetRow {
  /** Set number, or "W" for a warmup row (rendered in --warmup color) */
  set: number | string;
  /** Previous session's value, e.g. "70 × 8" */
  previous: string;
  /** "Pre" column value (optional column) */
  pre?: string | number;
  /** Weight logged. null/undefined renders "—" at the larger 18px placeholder size. */
  kg?: number | string | null;
  /** Reps logged. null/undefined renders "—" at the larger 18px placeholder size. */
  reps?: number | string | null;
  status?: 'pending' | 'active' | 'complete';
  /** Colors the set-number cell with --warmup instead of --text */
  warmup?: boolean;
}

export interface SetTableProps {
  sets: SetRow[];
  /** Shows/hides the "Pre" grid column. Default true. */
  showPreColumn?: boolean;
  /** Optional row-click handler, e.g. to log/complete a set */
  onSetClick?: (index: number, row: SetRow) => void;
}

/** The 6-column (or 5, without Pre) set-tracking table: header + rows, each row ending in a SetMarker. */
export function SetTable(props: SetTableProps): JSX.Element;
