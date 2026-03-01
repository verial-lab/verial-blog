/** SVG filter definitions for the Verial brand */

export function neonFilter(): string {
  return `
    <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur3"/>
      <feMerge>
        <feMergeNode in="blur3"/>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`;
}

export function watermarkFilter(): string {
  return `
    <filter id="wm" x="-10%" y="-10%" width="120%" height="120%">
      <feFlood flood-color="#060606" result="fill"/>
      <feComposite in="fill" in2="SourceGraphic" operator="in" result="base"/>
      <feOffset in="SourceAlpha" dx="-1" dy="-1" result="shadowOff"/>
      <feFlood flood-color="white" flood-opacity="0.7" result="shadowColor"/>
      <feComposite in="shadowColor" in2="shadowOff" operator="in" result="shadow"/>
      <feOffset in="SourceAlpha" dx="1" dy="1" result="hlOff"/>
      <feFlood flood-color="white" flood-opacity="0.18" result="hlColor"/>
      <feComposite in="hlColor" in2="hlOff" operator="in" result="highlight"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="base"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>`;
}

export function chevronMarkers(): string {
  return `
    <marker id="chevron" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <polyline points="1,1 9,5 1,9" fill="none" stroke="white" stroke-width="1.5"/>
    </marker>
    <marker id="chevron-accent" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <polyline points="1,1 9,5 1,9" fill="none" stroke="#999" stroke-width="1.5"/>
    </marker>`;
}

export function allFilters(): string {
  return `${neonFilter()}${watermarkFilter()}${chevronMarkers()}`;
}
