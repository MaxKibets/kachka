export interface SetMarkerProps {
  /** Default 'pending' */
  status?: 'pending' | 'active' | 'complete';
  /** Container diameter in px. Default 30. */
  size?: number;
}

/** Per-set status marker: outline ring (pending), spinning conic-gradient ring (active/in-progress), or filled check (complete). */
export function SetMarker(props: SetMarkerProps): JSX.Element;
