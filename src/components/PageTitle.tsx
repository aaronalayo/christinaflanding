import type { CSSProperties, ReactNode } from 'react';

type PageTitleProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  iconColor?: string;
};

export default function PageTitle({
  children,
  className,
  style,
  iconColor = '#7A9274',
}: PageTitleProps) {
  return (
    <h1
      className={className}
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 'clamp(12px, 3vw, 24px)',
        width: 'fit-content',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
      }}
    >
      <CrystalCluster color={iconColor} />
      <span>{children}</span>
      <CrystalCluster color={iconColor} flipped />
    </h1>
  );
}

export function CrystalCluster({ color = '#7A9274', flipped = false }: { color?: string; flipped?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: 'block',
        width: 'clamp(24px, 4vw, 38px)',
        height: 'clamp(24px, 4vw, 38px)',
        color,
        transform: flipped ? 'scaleX(-1)' : undefined,
      }}
    >
      <path d="M19 42 17 17 23 5 30 17 29 42Z" />
      <path d="m17 17 6 3 7-3M23 5l1 15-5 22M30 17l-6 3 5 22" />
      <path d="m7 42-1-16 5-9 6 9-1 16Z" />
      <path d="m6 26 5 3 6-3M11 17v12l-1 13M17 26l-6 3 5 13" />
      <path d="m31 42-1-14 5-8 6 8-1 14Z" />
      <path d="m30 28 5 3 6-3M35 20v11l-1 11M41 28l-6 3 5 11" />
      <path d="M23 45h7M8 45h9M34 45h8" />
    </svg>
  );
}
