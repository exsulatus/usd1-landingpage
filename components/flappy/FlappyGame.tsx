"use client";

import React from "react";
import { useRouter } from "next/navigation";

type GameState = "ready" | "running" | "over";

type Pipe = {
  x: number;
  gapY: number;
  passed: boolean;
};

export function FlappyGame() {
  const router = useRouter();
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const [state, setState] = React.useState<GameState>("ready");
  const [score, setScore] = React.useState(0);
  const [gamesInRow, setGamesInRow] = React.useState(0);
  const [nag, setNag] = React.useState(false);

  const simRef = React.useRef({
    t: 0,
    birdY: 140,
    birdV: 0,
    pipes: [] as Pipe[],
    seed: 1
  });

  function rand() {
    // simple deterministic LCG
    const s = simRef.current;
    s.seed = (s.seed * 1664525 + 1013904223) >>> 0;
    return s.seed / 0xffffffff;
  }

  const W = 720;
  const H = 420;
  const groundY = H - 46;
  const birdX = 180;
  const birdR = 18;
  const pipeW = 74;
  const pipeGap = 132;
  const speed = 2.9;
  const gravity = 0.48;
  const flapV = -8.0;

  function reset(run: boolean) {
    simRef.current = {
      t: 0,
      birdY: 160,
      birdV: 0,
      pipes: [],
      seed: (Date.now() >>> 0) || 1
    };
    setScore(0);
    setState(run ? "running" : "ready");
  }

  function flap() {
    const sim = simRef.current;
    sim.birdV = flapV;
    if (state === "ready") setState("running");
  }

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (state !== "over") flap();
      }
      if (e.code === "Enter" && state === "over") {
        onPlayAgain();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state]);

  function collidePipe(pipe: Pipe, y: number) {
    const topH = pipe.gapY - pipeGap / 2;
    const bottomY = pipe.gapY + pipeGap / 2;
    const withinX = birdX + birdR > pipe.x && birdX - birdR < pipe.x + pipeW;
    if (!withinX) return false;
    const hitTop = y - birdR < topH;
    const hitBottom = y + birdR > bottomY;
    return hitTop || hitBottom;
  }

  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, W, H);

    // background
    ctx.fillStyle = "rgba(33, 181, 143, 0.14)";
    ctx.fillRect(0, 0, W, H);

    // clouds
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 6; i++) {
      const x = (i * 140 + (simRef.current.t * 0.25)) % (W + 200) - 100;
      const y = 50 + (i % 2) * 28;
      ctx.beginPath();
      ctx.ellipse(x, y, 44, 18, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 32, y + 8, 34, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(x - 26, y + 10, 30, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // pipes (Mario-ish green)
    const sim = simRef.current;
    for (const p of sim.pipes) {
      const topH = p.gapY - pipeGap / 2;
      const bottomY = p.gapY + pipeGap / 2;

      ctx.fillStyle = "#22c55e";
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.lineWidth = 3;

      // top pipe
      ctx.fillRect(p.x, 0, pipeW, topH);
      ctx.strokeRect(p.x, 0, pipeW, topH);
      ctx.fillRect(p.x - 8, Math.max(0, topH - 18), pipeW + 16, 18);

      // bottom pipe
      ctx.fillRect(p.x, bottomY, pipeW, groundY - bottomY);
      ctx.strokeRect(p.x, bottomY, pipeW, groundY - bottomY);
      ctx.fillRect(p.x - 8, bottomY, pipeW + 16, 18);
    }

    // ground
    ctx.fillStyle = "rgba(11,18,32,0.25)";
    ctx.fillRect(0, groundY, W, H - groundY);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(0, groundY, W, 4);

    // mascot “bird”
    const y = sim.birdY;
    ctx.save();
    ctx.translate(birdX, y);
    const tilt = Math.max(-0.5, Math.min(0.9, sim.birdV / 10));
    ctx.rotate(tilt);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(15,23,42,0.22)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-birdR - 6, -birdR, birdR * 2 + 12, birdR * 2, 18);
    ctx.fill();
    ctx.stroke();
    // horn (flat accent)
    ctx.fillStyle = "#7b6cff";
    ctx.beginPath();
    ctx.moveTo(-2, -birdR - 6);
    ctx.lineTo(10, -birdR - 18);
    ctx.lineTo(16, -birdR - 2);
    ctx.closePath();
    ctx.fill();
    // eye
    ctx.fillStyle = "#0e1624";
    ctx.beginPath();
    ctx.arc(6, -2, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(5, -3, 1.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // score
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "800 22px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
    ctx.fillText(`Score: ${score}`, 18, 34);

    // ready hint
    if (state === "ready") {
      ctx.fillStyle = "rgba(11,18,32,0.82)";
      ctx.font = "800 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
      ctx.fillText("Tap / Click / Space to start", 18, 64);
    }
  }

  function step() {
    rafRef.current = requestAnimationFrame(step);
    const sim = simRef.current;
    sim.t += 1;

    if (state === "running") {
      // spawn pipes
      if (sim.t % 120 === 0) {
        const margin = 60;
        const gapY = margin + rand() * (groundY - margin * 2);
        sim.pipes.push({ x: W + 40, gapY, passed: false });
      }

      // physics
      sim.birdV += gravity;
      sim.birdY += sim.birdV;

      // move pipes
      for (const p of sim.pipes) {
        p.x -= speed;
        if (!p.passed && p.x + pipeW < birdX - birdR) {
          p.passed = true;
          setScore((s) => s + 1);
        }
      }
      sim.pipes = sim.pipes.filter((p) => p.x > -pipeW - 40);

      // collisions
      if (sim.birdY + birdR > groundY || sim.birdY - birdR < 0) {
        setState("over");
      } else {
        for (const p of sim.pipes) {
          if (collidePipe(p, sim.birdY)) {
            setState("over");
            break;
          }
        }
      }
    }

    draw();
  }

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;

    // Start loop
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (state === "over") {
      setGamesInRow((n) => {
        const next = n + 1;
        if (next >= 5) setNag(true);
        return next;
      });
    }
  }, [state]);

  function onPlayAgain() {
    reset(true);
  }

  function onExit() {
    setGamesInRow(0);
    setNag(false);
    reset(false);
    router.push("/#fun");
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Flappy USD1</h1>
          <p className="pageLead">
            Tap, click, or press <span className="kbd">Space</span> to fly between green pipes. One
            point per pass. If you bonk a pipe or the ground… it’s over.
          </p>
        </div>

        <div className="stage card">
          <div className={state === "over" ? "veil show" : "veil"} aria-hidden="true" />
          <canvas
            ref={(n) => {
              canvasRef.current = n;
            }}
            className="canvas"
            onPointerDown={() => (state === "over" ? undefined : flap())}
          />

          {state === "over" ? (
            <div className="overlay" role="dialog" aria-label="Game over">
              <div className="overTitle">GAME OVER!</div>
              <div className="overScore muted">Final score: {score}</div>
              <button className="btn btnPrimary" type="button" onClick={onPlayAgain}>
                PLAY AGAIN
              </button>
              <button className="btn exit" type="button" onClick={onExit}>
                EXIT
              </button>
            </div>
          ) : null}
        </div>

        {nag ? (
          <div className="nag" role="dialog" aria-label="Study reminder">
            <div className="nagInner card">
              <div className="nagTitle">
                You’ve played <strong>{gamesInRow}</strong> games in a row. Shouldn’t you be studying?
              </div>
              <div className="nagRow">
                <button className="btn btnPrimary" type="button" onClick={() => setNag(false)}>
                  Ok ok
                </button>
                <button className="btn" type="button" onClick={onExit}>
                  Take me to Learn
                </button>
              </div>
            </div>
          </div>
        ) : null}

      <style jsx>{`
        .stage {
          padding: 14px;
          position: relative;
          overflow: hidden;
        }
        .canvas {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 22px;
          border: 1px solid var(--border);
        }
        .veil {
          position: absolute;
          inset: 14px;
          border-radius: 22px;
          background: rgba(0, 0, 0, 0.0);
          pointer-events: none;
          transition: background 160ms ease;
        }
        .veil.show {
          background: rgba(0, 0, 0, 0.45);
        }
        .overlay {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          gap: 10px;
          padding: 40px 20px;
          text-align: center;
        }
        .overTitle {
          font-weight: 1000;
          letter-spacing: -0.02em;
          color: #fff;
          font-size: 40px;
          text-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
        }
        .overScore {
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 4px;
        }
        .exit {
          background: rgba(148, 163, 184, 0.14);
          border-color: rgba(148, 163, 184, 0.35);
          color: #fff;
        }
        .nag {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: grid;
          place-items: center;
          z-index: 80;
          padding: 20px;
        }
        .nagInner {
          max-width: 720px;
          width: 100%;
          padding: 22px;
          display: grid;
          gap: 12px;
        }
        .nagTitle {
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: 20px;
        }
        .nagRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
      `}</style>
      </div>
    </div>
  );
}


