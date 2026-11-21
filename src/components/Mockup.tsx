import type { ReactNode } from "react";
import type { MockupKind } from "@/data/services";

/**
 * Theme-aware product illustrations drawn in SVG.
 * Colours come from design tokens (see .mockup rules in globals.css).
 */
function Window({ children, x = 40, y = 26, w = 320, h = 208 }: { children: ReactNode; x?: number; y?: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y + 6} width={w} height={h} rx="10" className="m-shadow" />
      <rect x={x} y={y} width={w} height={h} rx="10" className="m-surface m-stroke" />
      <path d={`M${x} ${y + 24}h${w}`} className="m-stroke" fill="none" />
      <circle cx={x + 14} cy={y + 12} r="3" className="m-brand" />
      <circle cx={x + 25} cy={y + 12} r="3" className="m-mute" />
      <circle cx={x + 36} cy={y + 12} r="3" className="m-mute" />
      {children}
    </g>
  );
}

const art: Record<MockupKind, ReactNode> = {
  browser: (
    <Window>
      <rect x="58" y="66" width="90" height="9" rx="4.5" className="m-ink" />
      <rect x="58" y="82" width="120" height="9" rx="4.5" className="m-ink" />
      <rect x="58" y="100" width="104" height="5" rx="2.5" className="m-mute" />
      <rect x="58" y="110" width="84" height="5" rx="2.5" className="m-mute" />
      <rect x="58" y="126" width="52" height="16" rx="5" className="m-brand" />
      <rect x="116" y="126" width="46" height="16" rx="5" className="m-surface m-stroke" />
      <rect x="208" y="62" width="134" height="86" rx="8" className="m-soft" />
      <circle cx="306" cy="88" r="12" className="m-brand" opacity=".85" />
      <path d="M208 140l36-34 26 22 22-16 50 36v0a8 8 0 0 1-8 0H216a8 8 0 0 1-8-8Z" className="m-brand" opacity=".35" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={58 + i * 98} y="166" width="88" height="52" rx="7" className="m-surface-2 m-stroke" />
          <rect x={68 + i * 98} y="176" width="16" height="16" rx="5" className={i === 0 ? "m-brand" : "m-soft"} />
          <rect x={68 + i * 98} y="200" width="54" height="5" rx="2.5" className="m-mute" />
        </g>
      ))}
    </Window>
  ),
  dashboard: (
    <Window>
      <rect x="40" y="51" width="62" height="183" className="m-surface-2" />
      <path d="M102 51v183" className="m-stroke" fill="none" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="52" y={66 + i * 20} width={i === 0 ? 40 : 34} height="8" rx="4" className={i === 0 ? "m-brand" : "m-mute"} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={114 + i * 80} y="62" width="72" height="40" rx="7" className="m-surface m-stroke" />
          <rect x={122 + i * 80} y="70" width="30" height="5" rx="2.5" className="m-mute" />
          <rect x={122 + i * 80} y="82" width="42" height="10" rx="3" className="m-ink" />
          <circle cx={174 + i * 80} cy="74" r="4" className={i === 1 ? "m-violet" : "m-brand"} />
        </g>
      ))}
      <rect x="114" y="112" width="152" height="110" rx="7" className="m-surface m-stroke" />
      <path d="M124 200l22-18 20 8 24-34 22 14 24-36 20 10V212H124Z" className="m-brand" opacity=".14" />
      <path d="M124 200l22-18 20 8 24-34 22 14 24-36 20 10" className="m-line-brand" fill="none" />
      <circle cx="236" cy="134" r="4" className="m-surface m-line-brand" />
      <rect x="274" y="112" width="72" height="110" rx="7" className="m-surface m-stroke" />
      {[34, 54, 42, 68, 50].map((h, i) => (
        <rect key={i} x={283 + i * 12} y={212 - h} width="7" height={h} rx="3" className={i === 3 ? "m-brand" : "m-soft"} />
      ))}
    </Window>
  ),
  erp: (
    <g>
      {[
        [200, 46], [318, 92], [318, 176], [200, 222], [82, 176], [82, 92],
      ].map(([x, y], i) => (
        <path key={i} d={`M200 134L${x} ${y}`} className="m-stroke m-dash" fill="none" />
      ))}
      <circle cx="200" cy="134" r="58" className="m-ring" fill="none" />
      {[
        [200, 46], [318, 92], [318, 176], [200, 222], [82, 176], [82, 92],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x! - 44} y={y! - 19 + 4} width="88" height="38" rx="9" className="m-shadow" />
          <rect x={x! - 44} y={y! - 19} width="88" height="38" rx="9" className="m-surface m-stroke" />
          <rect x={x! - 34} y={y! - 9} width="18" height="18" rx="5" className={i % 3 === 0 ? "m-brand" : "m-soft"} />
          <rect x={x! - 8} y={y! - 7} width="38" height="5" rx="2.5" className="m-ink" />
          <rect x={x! - 8} y={y! + 3} width="26" height="4" rx="2" className="m-mute" />
        </g>
      ))}
      <circle cx="200" cy="134" r="30" className="m-navy" />
      <circle cx="200" cy="134" r="12" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="200" cy="134" r="4.5" className="m-brand" />
    </g>
  ),
  lms: (
    <Window>
      <rect x="54" y="62" width="176" height="104" rx="8" className="m-navy" />
      <circle cx="142" cy="114" r="20" className="m-brand" />
      <path d="M136 104v20l17-10Z" fill="#fff" />
      <rect x="54" y="176" width="176" height="6" rx="3" className="m-mute" />
      <rect x="54" y="176" width="108" height="6" rx="3" className="m-brand" />
      <rect x="54" y="194" width="96" height="8" rx="4" className="m-ink" />
      <rect x="54" y="208" width="130" height="5" rx="2.5" className="m-mute" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="242" y={62 + i * 40} width="104" height="32" rx="7" className={i === 1 ? "m-soft" : "m-surface-2 m-stroke"} />
          <circle cx="258" cy={78 + i * 40} r="7" className={i < 2 ? "m-brand" : "m-mute"} />
          {i < 2 && <path d={`M254.500 ${78 + i * 40}l2.500 2.500 4.500-5`} stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
          <rect x="272" y={72 + i * 40} width="56" height="5" rx="2.5" className="m-ink" />
          <rect x="272" y={81 + i * 40} width="36" height="4" rx="2" className="m-mute" />
        </g>
      ))}
    </Window>
  ),
  brand: (
    <g>
      <rect x="44" y="34" width="150" height="126" rx="12" className="m-navy" />
      <circle cx="119" cy="97" r="30" fill="none" stroke="#fff" strokeWidth="7" />
      <circle cx="119" cy="97" r="10" className="m-brand" />
      <path d="M141 75l16-16" className="m-line-brand" strokeWidth="7" />
      <rect x="206" y="34" width="150" height="58" rx="12" className="m-surface m-stroke" />
      <text x="222" y="76" className="m-type">Aa</text>
      <rect x="282" y="52" width="58" height="6" rx="3" className="m-ink" />
      <rect x="282" y="64" width="42" height="5" rx="2.500" className="m-mute" />
      <rect x="282" y="75" width="50" height="5" rx="2.500" className="m-mute" />
      {["m-brand", "m-navy", "m-violet", "m-soft"].map((c, i) => (
        <rect key={c} x={206 + i * 38.700} y="102" width="33.900" height="58" rx="9" className={`${c} m-stroke`} />
      ))}
      <rect x="44" y="172" width="98" height="58" rx="12" className="m-soft" />
      <path d="M60 214c10-26 22-26 32 0s22-26 34-22" className="m-line-brand" fill="none" />
      <rect x="154" y="172" width="202" height="58" rx="12" className="m-surface m-stroke" />
      <rect x="168" y="186" width="30" height="30" rx="8" className="m-brand" />
      <rect x="208" y="190" width="78" height="7" rx="3.500" className="m-ink" />
      <rect x="208" y="204" width="120" height="5" rx="2.500" className="m-mute" />
    </g>
  ),
  growth: (
    <g>
      <rect x="44" y="40" width="312" height="190" rx="12" className="m-surface m-stroke" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M64 ${84 + i * 36}h272`} className="m-stroke m-dash" fill="none" />
      ))}
      {[38, 56, 50, 78, 92, 118, 140].map((h, i) => (
        <rect key={i} x={76 + i * 37} y={210 - h} width="20" height={h} rx="5" className={i > 4 ? "m-brand" : "m-soft"} />
      ))}
      <path d="M86 164l37-16 37 6 37-28 37-16 37-26 37-24" className="m-line-ink" fill="none" />
      <circle cx="308" cy="60" r="5" className="m-surface m-line-ink" />
      <rect x="60" y="54" width="96" height="44" rx="9" className="m-shadow" transform="translate(0 4)" />
      <rect x="60" y="54" width="96" height="44" rx="9" className="m-surface m-stroke" />
      <circle cx="78" cy="76" r="9" className="m-soft" />
      <path d="M74 78l3-4 3 2 3-5" className="m-line-brand" strokeWidth="1.800" fill="none" />
      <rect x="94" y="66" width="36" height="5" rx="2.500" className="m-mute" />
      <rect x="94" y="77" width="50" height="9" rx="3" className="m-ink" />
    </g>
  ),
  search: (
    <g>
      <rect x="60" y="34" width="280" height="40" rx="20" className="m-shadow" transform="translate(0 4)" />
      <rect x="60" y="34" width="280" height="40" rx="20" className="m-surface m-stroke" />
      <circle cx="84" cy="53" r="7" className="m-line-brand" fill="none" />
      <path d="M89 58l6 6" className="m-line-brand" />
      <rect x="106" y="49" width="110" height="8" rx="4" className="m-ink" />
      <rect x="290" y="42" width="40" height="24" rx="12" className="m-brand" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="60" y={88 + i * 50} width="280" height="42" rx="9" className={i === 0 ? "m-soft" : "m-surface m-stroke"} />
          <rect x="74" y={99 + i * 50} width="20" height="20" rx="6" className={i === 0 ? "m-brand" : "m-mute"} />
          <text x="84" y={113.500 + i * 50} textAnchor="middle" className="m-num" fill={i === 0 ? "#fff" : undefined}>{i + 1}</text>
          <rect x="106" y={100 + i * 50} width={130 - i * 16} height="7" rx="3.500" className="m-ink" />
          <rect x="106" y={113 + i * 50} width={180 - i * 20} height="5" rx="2.500" className="m-mute" />
          {i === 0 && <path d="M312 114v-12m-5 5 5-5 5 5" className="m-line-brand" fill="none" />}
        </g>
      ))}
    </g>
  ),
  social: (
    <g>
      <rect x="60" y="24" width="124" height="216" rx="18" className="m-navy" />
      <rect x="66" y="30" width="112" height="204" rx="13" className="m-surface" />
      <circle cx="82" cy="48" r="8" className="m-brand" />
      <rect x="96" y="42" width="44" height="5" rx="2.500" className="m-ink" />
      <rect x="96" y="51" width="28" height="4" rx="2" className="m-mute" />
      <rect x="74" y="64" width="96" height="96" rx="8" className="m-soft" />
      <circle cx="122" cy="112" r="20" className="m-brand" opacity=".9" />
      <path d="M116 102v20l17-10Z" fill="#fff" />
      <path d="M80 178c0-5 6-6 7-2 1-4 7-3 7 2s-7 9-7 9-7-4-7-9Z" className="m-brand" />
      <rect x="102" y="176" width="40" height="5" rx="2.500" className="m-mute" />
      <rect x="74" y="196" width="88" height="5" rx="2.500" className="m-mute" />
      <rect x="74" y="207" width="60" height="5" rx="2.500" className="m-mute" />
      <rect x="204" y="50" width="146" height="150" rx="12" className="m-surface m-stroke" />
      <rect x="216" y="62" width="50" height="7" rx="3.500" className="m-ink" />
      {Array.from({ length: 20 }).map((_, i) => {
        const c = i % 5;
        const r = Math.floor(i / 5);
        const hot = [1, 7, 8, 13, 16].includes(i);
        return <rect key={i} x={216 + c * 25.400} y={82 + r * 27} width="20.400" height="21" rx="5" className={hot ? (i === 8 ? "m-violet" : "m-brand") : "m-surface-2 m-stroke"} />;
      })}
    </g>
  ),
  campus: (
    <Window>
      <rect x="54" y="62" width="120" height="84" rx="8" className="m-soft" />
      <path d="M78 96l36-18 36 18Z" className="m-brand" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={84 + i * 17} y="100" width="8" height="26" rx="2" className="m-navy" />
      ))}
      <rect x="76" y="128" width="76" height="6" rx="2" className="m-navy" />
      <rect x="186" y="62" width="160" height="84" rx="8" className="m-surface m-stroke" />
      <circle cx="210" cy="88" r="13" className="m-soft" />
      <circle cx="210" cy="84" r="5" className="m-brand" />
      <path d="M200 97a10 8 0 0 1 20 0Z" className="m-brand" />
      <rect x="232" y="78" width="70" height="7" rx="3.500" className="m-ink" />
      <rect x="232" y="91" width="48" height="5" rx="2.500" className="m-mute" />
      <rect x="198" y="114" width="136" height="6" rx="3" className="m-mute" />
      <rect x="198" y="114" width="92" height="6" rx="3" className="m-brand" />
      <rect x="198" y="128" width="50" height="5" rx="2.500" className="m-mute" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="54" y={156 + i * 24} width="292" height="18" rx="5" className={i === 0 ? "m-surface-2" : "m-surface m-stroke"} />
          <rect x="64" y={162.500 + i * 24} width="60" height="5" rx="2.500" className={i === 0 ? "m-ink" : "m-mute"} />
          <rect x="160" y={162.500 + i * 24} width="44" height="5" rx="2.500" className="m-mute" />
          <rect x="300" y={160 + i * 24} width="34" height="10" rx="5" className={i === 1 ? "m-brand" : "m-soft"} />
        </g>
      ))}
    </Window>
  ),
  flow: (
    <g>
      <path d="M118 80h52M230 80h40a12 12 0 0 1 12 12v22M200 104v40M170 180h-40a12 12 0 0 0-12 12v0M230 180h52" className="m-stroke m-dash" fill="none" strokeWidth="1.500" />
      <rect x="40" y="58" width="80" height="44" rx="10" className="m-surface m-stroke" />
      <circle cx="60" cy="80" r="9" className="m-brand" />
      <path d="M61 74l-4 7h6l-4 7" stroke="#fff" strokeWidth="1.600" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="76" y="72" width="34" height="6" rx="3" className="m-ink" />
      <rect x="76" y="83" width="24" height="4" rx="2" className="m-mute" />
      <rect x="170" y="56" width="60" height="48" rx="12" className="m-navy" />
      <path d="M190 80h20m-6-6 6 6-6 6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="244" y="116" width="96" height="44" rx="10" className="m-surface m-stroke" />
      <rect x="256" y="128" width="20" height="20" rx="6" className="m-violet" />
      <rect x="284" y="130" width="42" height="6" rx="3" className="m-ink" />
      <rect x="284" y="141" width="30" height="4" rx="2" className="m-mute" />
      <path d="M200 146l34 34-34 34-34-34Z" className="m-soft m-stroke" />
      <path d="M192 180l6 6 11-12" className="m-line-brand" fill="none" />
      <rect x="60" y="192" width="96" height="40" rx="10" className="m-surface m-stroke" />
      <rect x="72" y="202" width="20" height="20" rx="6" className="m-soft" />
      <rect x="100" y="204" width="42" height="6" rx="3" className="m-ink" />
      <rect x="100" y="215" width="30" height="4" rx="2" className="m-mute" />
      <rect x="282" y="160" width="0" height="0" />
      <rect x="282" y="186" width="70" height="40" rx="10" className="m-brand" transform="translate(0 -26)" opacity="0" />
      <circle cx="300" cy="200" r="16" className="m-brand" />
      <path d="M293 200l5 5 9-10" stroke="#fff" strokeWidth="2.200" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M234 180h46" className="m-stroke m-dash" fill="none" />
    </g>
  ),
  accred: (
    <g>
      <rect x="70" y="30" width="170" height="206" rx="10" className="m-shadow" transform="translate(0 6)" />
      <rect x="70" y="30" width="170" height="206" rx="10" className="m-surface m-stroke" />
      <rect x="88" y="48" width="84" height="9" rx="4.500" className="m-ink" />
      <rect x="88" y="64" width="56" height="5" rx="2.500" className="m-mute" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="97" cy={97 + i * 27} r="9" className={i < 4 ? "m-brand" : "m-soft"} />
          {i < 4 && <path d={`M92.500 ${97 + i * 27}l3 3 6-6.500`} stroke="#fff" strokeWidth="1.800" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="114" y={91 + i * 27} width={96 - (i % 3) * 14} height="6" rx="3" className="m-ink" />
          <rect x="114" y={101 + i * 27} width={66 - (i % 2) * 12} height="4" rx="2" className="m-mute" />
        </g>
      ))}
      <rect x="226" y="60" width="118" height="92" rx="10" className="m-shadow" transform="translate(0 5)" />
      <rect x="226" y="60" width="118" height="92" rx="10" className="m-surface m-stroke" />
      <rect x="240" y="74" width="46" height="5" rx="2.500" className="m-mute" />
      {[30, 44, 38, 56, 50].map((h, i) => (
        <rect key={i} x={242 + i * 19} y={140 - h} width="11" height={h} rx="3" className={i === 3 ? "m-brand" : i === 4 ? "m-violet" : "m-soft"} />
      ))}
      <circle cx="286" cy="194" r="30" className="m-navy" />
      <circle cx="286" cy="194" r="21" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="2 4" />
      <path d="M286 180l4.200 8.600 9.500 1.300-6.900 6.600 1.700 9.400-8.500-4.500-8.500 4.500 1.700-9.400-6.900-6.600 9.500-1.300Z" className="m-brand" />
    </g>
  ),
};

export function Mockup({ kind, label }: { kind: MockupKind; label?: string }) {
  return (
    <div className="mockup">
      <svg viewBox="0 0 400 260" role="img" aria-label={label ?? `${kind} illustration`} preserveAspectRatio="xMidYMid meet">
        {art[kind]}
      </svg>
    </div>
  );
}
