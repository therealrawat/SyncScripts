import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function baseProps(size: number): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

export function IconBolt({ size = 18, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

export function IconTarget({ size = 18, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconLock({ size = 18, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

export function IconCheck({ size = 14, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconArrowLeft({ size = 16, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function IconSettings({ size = 16, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconFlask({ size = 16, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M9 3h6" />
      <path d="M10 3v6.341c0 .402-.148.788-.415 1.087L5.333 16c-.957 1.077-.19 2.75 1.25 2.75h10.834c1.44 0 2.207-1.673 1.25-2.75l-4.252-4.572a1.532 1.532 0 0 0-.415-1.087V3" />
      <path d="M8.5 15h7" />
    </svg>
  );
}

export function IconFileText({ size = 16, ...rest }: Props) {
  return (
    <svg {...baseProps(size)} {...rest}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
