"use client";
import Image from "next/image";
import { useState } from "react";
import type { Person } from "@/data/people";
import { initialsOf } from "@/data/teams";

/** Consistent 4:5 portrait. Falls back to a monogram when there is no photo or the file fails to load. */
export function Portrait({ person, sizes = "(max-width: 700px) 100vw, 320px", priority }: { person: Person; sizes?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const hasPhoto = !!person.photo && !failed;
  return (
    <div className="portrait" data-photo={hasPhoto || undefined}>
      {hasPhoto ? (
        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${person.photo}`} alt={`Portrait of ${person.name}`} fill sizes={sizes} priority={priority} style={{ objectPosition: person.photoPosition ?? "50% 20%" }} onError={() => setFailed(true)} />
      ) : (
        <>
          <svg viewBox="0 0 200 250" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" opacity=".5">
              <circle cx="160" cy="40" r="50" /><circle cx="160" cy="40" r="90" /><circle cx="160" cy="40" r="130" /><circle cx="160" cy="40" r="170" />
            </g>
          </svg>
          <span className="monogram" aria-hidden="true">{initialsOf(person.name)}</span>
        </>
      )}
      {person.placeholder && <span className="badge badge-warn">Placeholder</span>}
    </div>
  );
}
