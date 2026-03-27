export const PaceFormatter = {
  /** Format seconds as H:MM:SS or MM:SS */
  formatDuration(totalSeconds: number): string {
    const s = Math.round(totalSeconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  },

  /** Format seconds as M:SS (for pace display) */
  formatPace(totalSeconds: number): string {
    const s = Math.round(totalSeconds);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  },

  /** Format speed as km/h with 1 decimal */
  formatSpeed(kmh: number): string {
    return `${kmh.toFixed(1)} km/h`;
  },

  /** Format speed as mph with 1 decimal */
  formatSpeedMph(mph: number): string {
    return `${mph.toFixed(1)} mph`;
  },

  /** Parse H:MM:SS or MM:SS to total seconds */
  parseDuration(input: string): number | null {
    const parts = input.split(':').map((p) => parseInt(p, 10));
    if (parts.some(isNaN)) return null;
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return null;
  },

  /** Parse MM:SS pace to seconds */
  parsePace(input: string): number | null {
    const parts = input.split(':').map((p) => parseInt(p, 10));
    if (parts.some(isNaN) || parts.length !== 2) return null;
    return parts[0] * 60 + parts[1];
  },
};
