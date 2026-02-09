"use client";

import Image from "next/image";
import Link from "next/link";

export function MascotMark() {
  return (
    <Link href="/" className="markLink" aria-label="UnicornSheepDog1 home">
      <span className="mark">
        <span className="art" aria-hidden="true">
          <Image src="/images/usd1.base.jpg" alt="" width={54} height={54} priority />
        </span>
        <span className="word">
          <span className="name">UnicornSheepDog1</span>
          <span className="tag">USD1</span>
        </span>
      </span>
      <style jsx>{`
        .markLink {
          color: var(--text);
          text-decoration: none;
        }
        .mark {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 12px;
          min-width: 220px;
        }
        .art {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          border-radius: 50%;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 2px 8px rgba(17, 24, 39, 0.10);
          transition: transform 160ms ease, box-shadow 160ms ease;
          transform: translateY(0);
          display: block;
        }
        .art :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .markLink:hover .art {
          transform: translateY(-2px) rotate(-2deg);
          box-shadow: 0 6px 14px rgba(17, 24, 39, 0.14);
        }
        .word {
          display: flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1.05;
        }
        .name {
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 18px;
        }
        .tag {
          font-size: 12px;
          color: var(--muted2);
        }
      `}</style>
    </Link>
  );
}


