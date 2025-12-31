"use client";

import Image from "next/image";
import Link from "next/link";

export function MascotMark() {
  return (
    <Link href="/" className="mark" aria-label="UnicornSheepDog1 home">
      <div className="art" aria-hidden="true">
        <Image src="/mascot/mark.svg" alt="" width={54} height={54} priority />
      </div>
      <div className="word">
        <span className="name">UnicornSheepDog1</span>
        <span className="tag">USD1</span>
      </div>
      <style jsx>{`
        .mark {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text);
          min-width: 220px;
        }
        .art {
          width: 54px;
          height: 54px;
          flex: 0 0 auto;
          filter: drop-shadow(0 6px 12px rgba(17, 24, 39, 0.14));
          transition: transform 160ms ease, filter 160ms ease;
          transform: translateY(0);
        }
        .mark:hover .art {
          transform: translateY(-2px) rotate(-2deg);
          filter: drop-shadow(0 10px 18px rgba(17, 24, 39, 0.16));
        }
        .word {
          display: grid;
          gap: 2px;
          line-height: 1.05;
        }
        .name {
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 18px;
        }
        .mark:hover .name {
          color: var(--text);
        }
        .tag {
          font-size: 12px;
          color: var(--muted2);
        }
      `}</style>
    </Link>
  );
}


