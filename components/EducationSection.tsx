"use client";

import React from "react";
import { TeacherMascot } from "@/components/TeacherMascot";
import { LinkCard } from "@/components/LinkCard";

type Stick = {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  visible: boolean;
};

const TEACHER_FACES_CARDS = true;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function EducationSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const teacherRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<Record<string, HTMLDivElement | null>>({
    left: null,
    mid: null,
    right: null
  });

  const [active, setActive] = React.useState<"left" | "mid" | "right">("mid");
  const [stick, setStick] = React.useState<Stick>({
    sx: 0,
    sy: 0,
    ex: 0,
    ey: 0,
    visible: false
  });

  const [angle, setAngle] = React.useState(190);

  function computeBasePoint() {
    const section = sectionRef.current;
    const teacher = teacherRef.current;
    if (!section || !teacher) return null;
    const sr = section.getBoundingClientRect();
    const tr = teacher.getBoundingClientRect();

    // “Hand” area anchor (matches the TeacherMascot proportions)
    // If we mirror the mascot to face the cards, the “hand” anchor must mirror too.
    const handXFrac = TEACHER_FACES_CARDS ? 0.30 : 0.70;
    const baseX = tr.left + tr.width * handXFrac;
    const baseY = tr.top + tr.height * 0.66;
    return { sr, baseX, baseY };
  }

  function computeCardTarget(which: "left" | "mid" | "right") {
    const el = cardRefs.current[which];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { cx: r.left + r.width * 0.5, cy: r.top + r.height * 0.42, r };
  }

  function pointTo(clientX: number, clientY: number, clampTo?: DOMRect) {
    const base = computeBasePoint();
    if (!base) return;
    const { sr, baseX, baseY } = base;

    const tx = clampTo ? clamp(clientX, clampTo.left + 20, clampTo.right - 20) : clientX;
    const ty = clampTo ? clamp(clientY, clampTo.top + 20, clampTo.bottom - 20) : clientY;

    const dx = tx - baseX;
    const dy = ty - baseY;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;

    // For the on-body stick (if enabled) we keep it sane;
    // for the overlay stick we can point anywhere, but clamp to a friendly range.
    setAngle(clamp(deg, 135, 225));

    setStick({
      sx: baseX - sr.left,
      sy: baseY - sr.top,
      ex: tx - sr.left,
      ey: ty - sr.top,
      visible: true
    });
  }

  function resetToMiddle() {
    const t = computeCardTarget("mid");
    if (!t) return;
    setActive("mid");
    pointTo(t.cx, t.cy, t.r);
  }

  React.useEffect(() => {
    resetToMiddle();
    function onResize() {
      resetToMiddle();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="learn"
      className="section edu"
      ref={(n) => {
        sectionRef.current = n;
      }}
    >
      <div className="container">
        <h2 className="sectionTitle">Learn</h2>
        <p className="sectionLead">
          Pick a track. Hover a card — USD1 will point right at what you’re choosing.
        </p>

        <div className="stage">
          {/* teacher (in front of middle card) */}
          <div
            className={TEACHER_FACES_CARDS ? "teacher flipped" : "teacher"}
            ref={(n) => {
              teacherRef.current = n;
            }}
            aria-hidden="true"
          >
            <TeacherMascot stickAngleDeg={angle} showStick={false} />
          </div>

          {/* long stick overlay */}
          <svg className="stickOverlay" aria-hidden="true">
            {stick.visible ? (
              <>
                <path
                  d={`M${stick.sx} ${stick.sy} L${stick.ex} ${stick.ey}`}
                  stroke="rgba(17, 24, 39, 0.18)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d={`M${stick.sx} ${stick.sy} L${stick.ex} ${stick.ey}`}
                  stroke="#6b5b3f"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d={`M${stick.sx} ${stick.sy} L${stick.ex} ${stick.ey}`}
                  stroke="rgba(33, 181, 143, 0.42)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx={stick.ex} cy={stick.ey} r="10" fill="var(--accentMint)" opacity="0.9" />
              </>
            ) : null}
          </svg>

          {/* cards */}
          <div
            className="cards"
            onMouseLeave={() => resetToMiddle()}
          >
            <div
              className={active === "left" ? "slot active" : "slot"}
              ref={(n) => {
                cardRefs.current.left = n;
              }}
              onMouseEnter={() => {
                setActive("left");
                const t = computeCardTarget("left");
                if (t) pointTo(t.cx, t.cy, t.r);
              }}
              onMouseMove={(e) => {
                const t = computeCardTarget("left");
                if (t) pointTo(e.clientX, e.clientY, t.r);
              }}
            >
              <LinkCard
                href="/learn/money-simply"
                title="Money, Simply"
                description="What money is, why it exists, and how to think about value—without jargon."
                accent="blue"
              />
            </div>

            <div
              className={active === "mid" ? "slot mid active" : "slot mid"}
              ref={(n) => {
                cardRefs.current.mid = n;
              }}
              onMouseEnter={() => {
                setActive("mid");
                const t = computeCardTarget("mid");
                if (t) pointTo(t.cx, t.cy, t.r);
              }}
              onMouseMove={(e) => {
                const t = computeCardTarget("mid");
                if (t) pointTo(e.clientX, e.clientY, t.r);
              }}
            >
              <LinkCard
                href="/learn/how-the-game-works"
                title="How the Game Works"
                description="Inflation, incentives, and why the rules matter—told like a story you can follow."
                accent="gold"
              />
            </div>

            <div
              className={active === "right" ? "slot active" : "slot"}
              ref={(n) => {
                cardRefs.current.right = n;
              }}
              onMouseEnter={() => {
                setActive("right");
                const t = computeCardTarget("right");
                if (t) pointTo(t.cx, t.cy, t.r);
              }}
              onMouseMove={(e) => {
                const t = computeCardTarget("right");
                if (t) pointTo(e.clientX, e.clientY, t.r);
              }}
            >
              <LinkCard
                href="/learn/the-trenches"
                title="The Trenches"
                description="Risk, hype, and decision-making—how to stay calm when timelines get loud."
                accent="red"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stage {
          position: relative;
          margin-top: 16px;
          padding-top: 160px; /* room for USD1 at the top */
        }
        .teacher {
          position: absolute;
          top: -6px;
          left: 50%;
          width: min(380px, 70vw);
          /* Slightly to the right so he “sits” in front of the middle card more than the side cards */
          transform: translateX(-32%);
          z-index: 5; /* in front of cards */
          pointer-events: none;
          opacity: 0.98;
        }
        @keyframes teacherFloat {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
        :global(.teacher svg) {
          animation: teacherFloat 7.5s ease-in-out infinite;
        }
        .teacher.flipped {
          transform: translateX(-32%) scaleX(-1);
          transform-origin: 50% 70%;
        }
        .stickOverlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 6; /* above cards + teacher to “overlap” */
          pointer-events: none;
        }
        .cards {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
          align-items: stretch;
        }
        .slot {
          grid-column: span 4;
          position: relative;
        }
        /* Course-style cards (consistent height, not squares) */
        :global(.slot .linkCard) {
          min-height: 210px;
        }
        /* Middle card hides teacher body behind it */
        .mid {
          z-index: 3;
          margin-top: -44px; /* show USD1 torso/head clearly */
        }
        .slot.active :global(.linkCard) {
          border-color: rgba(33, 181, 143, 0.30);
          box-shadow: var(--shadow);
        }
        /* Portrait stacks; landscape keeps side-by-side */
        @media (max-width: 980px) and (orientation: portrait) {
          .stage {
            padding-top: 140px;
          }
          .teacher {
            width: min(340px, 86vw);
            transform: translateX(-50%);
          }
          .teacher.flipped {
            transform: translateX(-50%) scaleX(-1);
          }
          .slot {
            grid-column: span 12;
          }
          .mid {
            margin-top: 0;
          }
        }
      `}</style>
    </section>
  );
}


