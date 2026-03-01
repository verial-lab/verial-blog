/** SVG filter definitions — matches render-legibility-final.js exactly */

export function neonFilter(): string {
  return `
    <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b2"/>
      <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
}

export function watermarkFilter(): string {
  return `
    <filter id="wm" x="-15%" y="-15%" width="140%" height="140%">
      <feFlood flood-color="#060606" result="dark"/>
      <feComposite in="dark" in2="SourceAlpha" operator="in" result="recess"/>
      <feOffset in="SourceAlpha" dx="2" dy="2" result="tl-shift"/>
      <feComposite in="SourceAlpha" in2="tl-shift" operator="out" result="tl-edge"/>
      <feFlood flood-color="#000000" flood-opacity="0.7" result="tl-color"/>
      <feComposite in="tl-color" in2="tl-edge" operator="in" result="tl-shadow"/>
      <feOffset in="SourceAlpha" dx="-1.5" dy="-1.5" result="br-shift"/>
      <feComposite in="SourceAlpha" in2="br-shift" operator="out" result="br-edge"/>
      <feFlood flood-color="#FFFFFF" flood-opacity="0.18" result="br-color"/>
      <feComposite in="br-color" in2="br-edge" operator="in" result="br-highlight"/>
      <feMerge>
        <feMergeNode in="recess"/>
        <feMergeNode in="tl-shadow"/>
        <feMergeNode in="br-highlight"/>
      </feMerge>
    </filter>`;
}

export function chevronMarkers(): string {
  return `
    <marker id="chevron" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <polyline points="2,2 10,6 2,10" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="chevron-accent" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <polyline points="2,2 10,6 2,10" fill="none" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>`;
}

export function allFilters(): string {
  return `${neonFilter()}${watermarkFilter()}${chevronMarkers()}`;
}
