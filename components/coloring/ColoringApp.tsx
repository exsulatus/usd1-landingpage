"use client";

import React from "react";
import { COLORING_TEMPLATES, ColoringTemplate } from "@/components/coloring/templates";

const PALETTE = [
  "#111827",
  "#ffffff",
  "#ff7a6b",
  "#21b58f",
  "#7b6cff",
  "#8b5cf6",
  "#f97316",
  "#22c55e",
  "#94a3b8"
];

type Mode = "draw" | "fill";

type SavedTemplateState = {
  fills: Record<string, string>;
  canvas?: string; // dataURL
};

function storageKey(templateId: string) {
  return `usd1-coloring:${templateId}`;
}

function loadState(templateId: string): SavedTemplateState {
  if (typeof window === "undefined") return { fills: {} };
  try {
    const raw = window.localStorage.getItem(storageKey(templateId));
    if (!raw) return { fills: {} };
    const parsed = JSON.parse(raw) as SavedTemplateState;
    return { fills: parsed.fills ?? {}, canvas: parsed.canvas };
  } catch {
    return { fills: {} };
  }
}

function saveState(templateId: string, state: SavedTemplateState) {
  try {
    window.localStorage.setItem(storageKey(templateId), JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function ColoringApp() {
  const [templateId, setTemplateId] = React.useState(COLORING_TEMPLATES[0]?.id ?? "t1");
  const [mode, setMode] = React.useState<Mode>("fill");
  const [color, setColor] = React.useState(PALETTE[2]);
  const [fills, setFills] = React.useState<Record<string, string>>({});

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const drawingRef = React.useRef(false);
  const lastRef = React.useRef<{ x: number; y: number } | null>(null);

  const template = COLORING_TEMPLATES.find((t) => t.id === templateId) as ColoringTemplate;

  React.useEffect(() => {
    const s = loadState(templateId);
    setFills(s.fills ?? {});
    // Restore canvas drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (s.canvas) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = s.canvas;
    }
  }, [templateId]);

  React.useEffect(() => {
    // Resize canvas to match wrapper
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ro = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect();
      const prev = canvas.toDataURL("image/png");
      canvas.width = Math.max(1, Math.floor(r.width));
      canvas.height = Math.max(1, Math.floor(r.height));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = prev;
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  function persist() {
    const canvas = canvasRef.current;
    const canvasData = canvas ? canvas.toDataURL("image/png") : undefined;
    saveState(templateId, { fills, canvas: canvasData });
  }

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fills, templateId]);

  function setRegion(regionId: string) {
    setFills((prev) => ({ ...prev, [regionId]: color }));
  }

  function pointerPos(e: React.PointerEvent) {
    const wrap = wrapRef.current;
    if (!wrap) return { x: 0, y: 0 };
    const r = wrap.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function drawLine(from: { x: number; y: number }, to: { x: number; y: number }) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function onPointerDown(e: React.PointerEvent) {
    if (mode !== "draw") return;
    drawingRef.current = true;
    const p = pointerPos(e);
    lastRef.current = p;
    drawLine(p, { x: p.x + 0.1, y: p.y + 0.1 });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (mode !== "draw") return;
    if (!drawingRef.current) return;
    const p = pointerPos(e);
    const last = lastRef.current;
    if (!last) return;
    drawLine(last, p);
    lastRef.current = p;
  }

  function onPointerUp() {
    if (mode !== "draw") return;
    drawingRef.current = false;
    lastRef.current = null;
    persist();
  }

  function clearAll() {
    setFills({});
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    saveState(templateId, { fills: {}, canvas: undefined });
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Coloring</h1>
          <p className="pageLead">
            Pick a template. Choose a color. Use <strong>Fill</strong> (tap shapes) or{" "}
            <strong>Draw</strong> (paint anywhere).
          </p>
        </div>

        <div className="top card">
          <div className="templates">
            {COLORING_TEMPLATES.map((t) => (
              <button
                key={t.id}
                className={t.id === templateId ? "thumb active" : "thumb"}
                type="button"
                onClick={() => setTemplateId(t.id)}
              >
                <span className="thumbTitle">{t.title}</span>
              </button>
            ))}
          </div>

          <div className="modes">
            <button className={mode === "fill" ? "btn btnPrimary" : "btn"} type="button" onClick={() => setMode("fill")}>
              Fill-by-section
            </button>
            <button className={mode === "draw" ? "btn btnPrimary" : "btn"} type="button" onClick={() => setMode("draw")}>
              Freehand draw
            </button>
            <button className="btn btnDanger" type="button" onClick={clearAll}>
              Clear
            </button>
          </div>
        </div>

        <div className="work card">
          <div className="palette" aria-label="Color palette">
            <div className="paletteWood" aria-hidden="true" />
            {PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                className={c === color ? "swatch active" : "swatch"}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
                title={c}
                style={{ background: c }}
              />
            ))}
            <div className="modePill pill">
              Mode: <strong>{mode === "fill" ? "Fill" : "Draw"}</strong>
            </div>
          </div>

          <div
            className="canvasWrap"
            ref={(n) => {
              wrapRef.current = n;
            }}
          >
            <svg className="template" viewBox={template.viewBox} preserveAspectRatio="xMidYMid meet">
              {template.regions.map((r) => (
                <path
                  key={r.id}
                  d={r.d}
                  fill={fills[r.id] ?? "rgba(255,255,255,0.55)"}
                  stroke={r.stroke ?? "rgba(15, 23, 42, 0.20)"}
                  strokeWidth="3"
                  onClick={() => (mode === "fill" ? setRegion(r.id) : undefined)}
                  style={{ cursor: mode === "fill" ? "pointer" : "default" }}
                />
              ))}
            </svg>

            <canvas
              ref={(n) => {
                canvasRef.current = n;
              }}
              className="paint"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              style={{ pointerEvents: mode === "draw" ? "auto" : "none" }}
            />
          </div>
        </div>

      <style jsx>{`
        .top {
          padding: 16px;
          display: grid;
          gap: 14px;
        }
        .templates {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .thumb {
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.55);
          padding: 10px 12px;
          cursor: pointer;
        }
        :global(html.dark) .thumb {
          background: rgba(255, 255, 255, 0.06);
        }
        .thumb.active {
          border-color: rgba(33, 181, 143, 0.35);
          box-shadow: var(--shadowSoft);
        }
        .thumbTitle {
          font-weight: 800;
          font-size: 13px;
        }
        .modes {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .work {
          padding: 16px;
          display: grid;
          gap: 14px;
        }
        .palette {
          position: relative;
          border-radius: 24px;
          padding: 16px 16px 14px 16px;
          border: 1px solid var(--border);
          background: var(--surface);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }
        :global(html.dark) .palette {
          background: rgba(255, 255, 255, 0.06);
        }
        .paletteWood {
          position: absolute;
          inset: 0;
          background: var(--tintLavender);
          opacity: 0.7;
          pointer-events: none;
        }
        .swatch {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          border: 2px solid rgba(15, 23, 42, 0.18);
          box-shadow: var(--shadowSoft);
          cursor: pointer;
          position: relative;
          z-index: 1;
        }
        .swatch.active {
          outline: none;
          box-shadow: var(--shadowSoft), var(--focus);
          border-color: rgba(33, 181, 143, 0.35);
        }
        .modePill {
          margin-left: auto;
          position: relative;
          z-index: 1;
        }
        .canvasWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface-2);
        }
        .template {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .paint {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          touch-action: none;
        }
      `}</style>
      </div>
    </div>
  );
}


