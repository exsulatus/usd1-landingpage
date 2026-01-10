"use client";

import React from "react";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="learnSectionLayout">
      <div className="learnAmbient" aria-hidden="true">
        <div className="learnBlob learnBlobTR" />
        <div className="learnBlob learnBlobML" />
        <div className="learnBlob learnBlobBR" />
      </div>
      <div className="learnContent">
        {children}
      </div>

      <style jsx>{`
        .learnSectionLayout {
          position: relative;
          overflow: hidden;
          background: var(--tintMint);
        }
        .learnContent {
          position: relative;
          z-index: 2;
        }
        .learnAmbient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .learnBlob {
          position: absolute;
          border-radius: 28px;
          clip-path: polygon(
            10% 0%,
            90% 0%,
            100% 10%,
            100% 90%,
            90% 100%,
            10% 100%,
            0% 90%,
            0% 10%
          );
          filter: none;
          opacity: 0.44;
          mix-blend-mode: normal;
          background-image:
            linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.08) 55%, rgba(255, 255, 255, 0.16) 100%),
            linear-gradient(35deg, rgba(33, 181, 143, 0.18) 0%, rgba(33, 181, 143, 0.06) 58%, transparent 100%),
            linear-gradient(115deg, transparent 0% 36%, rgba(255, 255, 255, 0.14) 36% 44%, transparent 44% 100%),
            linear-gradient(205deg, transparent 0% 52%, rgba(255, 255, 255, 0.10) 52% 60%, transparent 60% 100%);
          border: 1px solid rgba(255, 255, 255, 0.46);
          box-shadow:
            0 18px 44px rgba(17, 24, 39, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.30),
            inset 0 -22px 46px rgba(33, 181, 143, 0.10);
          transform: translate3d(0, 0, 0) scale(1);
          will-change: transform;
        }
        :global(html:not(.dark)) .learnBlob {
          opacity: 0.64;
          border-color: rgba(255, 255, 255, 0.62);
          box-shadow:
            0 22px 54px rgba(17, 24, 39, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.36),
            inset 0 -26px 56px rgba(33, 181, 143, 0.14);
          background-image:
            linear-gradient(135deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0.10) 55%, rgba(255, 255, 255, 0.22) 100%),
            linear-gradient(35deg, rgba(33, 181, 143, 0.30) 0%, rgba(33, 181, 143, 0.12) 58%, transparent 100%),
            linear-gradient(115deg, transparent 0% 36%, rgba(255, 255, 255, 0.18) 36% 44%, transparent 44% 100%),
            linear-gradient(205deg, transparent 0% 52%, rgba(255, 255, 255, 0.12) 52% 60%, transparent 60% 100%);
        }
        .learnBlob::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 22px;
          clip-path: inherit;
          pointer-events: none;
          background:
            radial-gradient(circle at 26% 22%, rgba(255, 255, 255, 0.34) 0%, transparent 55%),
            radial-gradient(circle at 72% 78%, rgba(255, 255, 255, 0.18) 0%, transparent 60%);
          opacity: 0.9;
        }
        .learnBlobTR {
          width: 440px;
          height: 440px;
          top: -120px;
          right: -220px;
          opacity: 0.48;
          transform: rotate(8deg);
          animation: learnBlobTR 24s ease-in-out infinite;
        }
        .learnBlobML {
          width: 560px;
          height: 560px;
          top: 30%;
          left: -420px;
          opacity: 0.42;
          transform: rotate(-10deg);
          animation: learnBlobML 28s ease-in-out infinite;
          animation-delay: -5s;
        }
        .learnBlobBR {
          width: 520px;
          height: 520px;
          right: -320px;
          bottom: -340px;
          opacity: 0.36;
          transform: rotate(14deg);
          animation: learnBlobBR 31s ease-in-out infinite;
          animation-delay: -12s;
        }

        @keyframes learnBlobTR {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.01) rotate(8deg); }
          33% { transform: translate3d(22px, -14px, 0) scale(1.04) rotate(10deg); }
          66% { transform: translate3d(-16px, 18px, 0) scale(1.02) rotate(6deg); }
        }
        @keyframes learnBlobML {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.01) rotate(-10deg); }
          40% { transform: translate3d(-24px, 12px, 0) scale(1.03) rotate(-7deg); }
          75% { transform: translate3d(16px, -18px, 0) scale(1.02) rotate(-12deg); }
        }
        @keyframes learnBlobBR {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.01) rotate(14deg); }
          30% { transform: translate3d(18px, 22px, 0) scale(1.03) rotate(12deg); }
          65% { transform: translate3d(-18px, -20px, 0) scale(1.04) rotate(16deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .learnBlob {
            animation: none !important;
            transform: translate3d(0, 0, 0) scale(1) !important;
          }
        }
      `}</style>
    </div>
  );
}

