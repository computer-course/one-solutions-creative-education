import Link from "next/link";
import { site } from "@/data/site";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="9" fill="var(--navy-fixed)" />
      <path d="M18 9 5.500 15 18 21l12.500-6Z" fill="#fff" />
      <path d="M10.500 18.400v4.800c0 1.800 3.400 3.300 7.500 3.300s7.500-1.500 7.500-3.300v-4.800L18 22Z" fill="#fff" fillOpacity=".55" />
      <path d="M30.500 15v7" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30.500" cy="24" r="2" fill="var(--brand)" />
    </svg>
  );
}

export function LogoText() {
  return (
    <span className="logo-text">
      One Solutions <span>Creative</span>
      <small>For Education</small>
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${site.name} — home`}>
      <LogoMark />
      <LogoText />
    </Link>
  );
}
