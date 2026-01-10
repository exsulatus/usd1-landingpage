import React from "react";

type SplitSectionProps = {
  id: string;
  topAnchors?: string[];
  ariaLabel: string;
  title: string;
  lead: string;
  visualSide: "left" | "right";
  visual: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SplitSection({
  id,
  topAnchors,
  ariaLabel,
  title,
  lead,
  visualSide,
  visual,
  children,
  className
}: SplitSectionProps) {
  const reverse = visualSide === "right";

  return (
    <section id={id} className={["section splitSection", reverse ? "splitReverse" : "", className ?? ""].join(" ").trim()} aria-label={ariaLabel}>
      <div className="container splitContainer">
        {topAnchors?.map((anchorId) => (
          <span key={anchorId} id={anchorId} className="anchorShim" aria-hidden="true" />
        ))}
        <div className="splitInner">
          <div className="splitVisual" aria-hidden="true">
            <div className="splitVisualCard">{visual}</div>
          </div>

          <div className="splitContent">
            <div className="splitHead">
              <h2 className="sectionTitle">{title}</h2>
              <p className="sectionLead">{lead}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}


