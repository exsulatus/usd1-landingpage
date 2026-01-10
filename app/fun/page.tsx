"use client";

import { LinkCard } from "@/components/LinkCard";

export default function FunPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Fun &amp; Games</h1>
          <p className="pageLead">Playful breaks that still reinforce the ideas USD1 teaches.</p>
        </div>

        <div className="cardGrid">
          <div className="span4">
            <LinkCard
              href="/fun/coloring"
              title="Coloring"
              description="Pick a template, grab a color, and paint. Freehand or fill-by-section."
              accent="gold"
            />
          </div>
          <div className="span4">
            <LinkCard
              href="/fun/flappy"
              title="Flappy USD1"
              description="Tap/click/press to fly between green pipes. One point per pass. Don’t bonk the pipe."
              accent="mint"
            />
          </div>
          <div className="span4">
            <LinkCard
              href="/fun/quiz"
              title="TAKE THE USD1 QUIZ"
              description="A chaotic history quiz. Answer correctly to advance. Miss too much and you restart."
              accent="red"
            />
          </div>
        </div>

        <style jsx>{`
          .span4 {
            grid-column: span 4;
          }
          @media (max-width: 980px) {
            .span4 {
              grid-column: span 12;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

