"use client";

import React from "react";
import { copyToClipboard } from "@/lib/copy";

type Q = {
  id: string;
  q: string;
  choices: string[];
  correctIndex: number;
};

const QUESTIONS: Q[] = [
  {
    id: "q1",
    q: "What is UnicornSheepDog1 (USD1) trying to be first?",
    choices: ["A money teacher", "A bank", "A stock", "A video game console"],
    correctIndex: 0
  },
  {
    id: "q2",
    q: "How did USD1 start?",
    choices: [
      "As a meme spin-off story that grew into a community",
      "As a government program",
      "As a phone company",
      "As a weather app"
    ],
    correctIndex: 0
  },
  {
    id: "q3",
    q: "What reading level should the lessons feel like?",
    choices: ["3rd-grade simple words (for adults)", "College-only", "No words at all", "Only memes"],
    correctIndex: 0
  },
  {
    id: "q4",
    q: "Which vibe is closest to the brand tone?",
    choices: [
      "Warm and approachable, but not childish",
      "Aggressive and spammy",
      "Cold and robotic",
      "Mean and exclusive"
    ],
    correctIndex: 0
  },
  {
    id: "q5",
    q: "What comes after education (later plans)?",
    choices: ["Merch and IRL products like plushies", "A rocket launch", "A new calendar app", "Teleportation"],
    correctIndex: 0
  },
  {
    id: "q6",
    q: "How should references to other coins/projects be handled here?",
    choices: [
      "Subtle, non-promotional, not endorsements",
      "Loud ads everywhere",
      "Secret codes only",
      "No mention of anything ever"
    ],
    correctIndex: 0
  },
  {
    id: "q7",
    q: "What happens if you answer a question wrong once?",
    choices: ["You see “oops! try again.”", "You win instantly", "The quiz ends forever", "Nothing changes"],
    correctIndex: 0
  },
  {
    id: "q8",
    q: "What happens if you answer wrong twice in a row (same question)?",
    choices: [
      "You see “do you really know your UnicornSheepDogs?”",
      "You skip to the end",
      "You get a trophy",
      "It deletes the internet"
    ],
    correctIndex: 0
  },
  {
    id: "q9",
    q: "What happens if you answer wrong three times in a row (same question)?",
    choices: ["“START OVER!” and reset to question one", "A secret level opens", "You get bonus points", "It auto-corrects"],
    correctIndex: 0
  },
  {
    id: "q10",
    q: "What should you do with risky memecoins?",
    choices: [
      "Only risk what you can afford to lose",
      "Bet your rent",
      "Never learn anything",
      "Ignore all safety steps"
    ],
    correctIndex: 0
  }
];

type SaveState = {
  index: number;
};

const STORAGE_KEY = "usd1-quiz-progress";

function loadProgress(): SaveState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveState;
    if (typeof parsed.index !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveProgress(index: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ index } satisfies SaveState));
  } catch {
    // ignore
  }
}

function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function Usd1Quiz() {
  const [index, setIndex] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);
  const [flash, setFlash] = React.useState<"none" | "green" | "red">("none");
  const [message, setMessage] = React.useState<string>("");
  const [done, setDone] = React.useState(false);
  const [resumeAvailable, setResumeAvailable] = React.useState(false);

  React.useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.index > 0 && saved.index < QUESTIONS.length) {
      setResumeAvailable(true);
    }
  }, []);

  const q = QUESTIONS[index];

  function resetAll() {
    setIndex(0);
    setAttempts(0);
    setFlash("none");
    setMessage("");
    setDone(false);
    clearProgress();
  }

  function resume() {
    const saved = loadProgress();
    if (!saved) return;
    setIndex(Math.max(0, Math.min(QUESTIONS.length - 1, saved.index)));
    setAttempts(0);
    setFlash("none");
    setMessage("Resumed saved progress.");
    setDone(false);
  }

  function onChoose(choiceIndex: number) {
    if (done) return;

    const correct = choiceIndex === q.correctIndex;
    if (correct) {
      setFlash("green");
      setMessage("Correct.");
      window.setTimeout(() => setFlash("none"), 500);
      window.setTimeout(() => {
        const next = index + 1;
        if (next >= QUESTIONS.length) {
          setDone(true);
          clearProgress();
          return;
        }
        setIndex(next);
        setAttempts(0);
        setMessage("");
        saveProgress(next);
      }, 700);
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setFlash("red");
    window.setTimeout(() => setFlash("none"), 500);

    if (nextAttempts === 1) setMessage("oops! try again.");
    else if (nextAttempts === 2) setMessage("do you really know your UnicornSheepDogs?");
    else {
      setMessage("START OVER!");
      window.setTimeout(() => resetAll(), 900);
    }
  }

  async function shareX() {
    const text = "CONGRATULATIONS! YOU’RE A REAL USD1 — I finished the USD1 quiz.";
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function shareTikTok() {
    const text = "CONGRATULATIONS! YOU’RE A REAL USD1 — I finished the USD1 quiz.";
    await copyToClipboard(text);
    window.open("https://www.tiktok.com/upload", "_blank", "noopener,noreferrer");
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Take the USD1 Quiz</h1>
          <p className="pageLead">
            10 questions. One at a time. You must answer each one correctly to advance. Miss too
            much and you reset.
          </p>
        </div>

        {resumeAvailable ? (
          <div
            className="card"
            style={{ padding: 16, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}
          >
            <div className="muted">Saved progress found.</div>
            <button className="btn btnPrimary" type="button" onClick={resume}>
              Resume
            </button>
            <button className="btn" type="button" onClick={resetAll}>
              Start fresh
            </button>
          </div>
        ) : null}

        {!done ? (
          <div className={`card quizCard ${flash}`}>
            <div className="top">
              <div className="pill">
                Question <strong>{index + 1}</strong> / {QUESTIONS.length}
              </div>
              <button className="btn" type="button" onClick={() => saveProgress(index)}>
                Save progress
              </button>
            </div>

            <div className="q">{q.q}</div>

            <div className="choices">
              {q.choices.map((c, i) => (
                <button key={c} className="choice" type="button" onClick={() => onChoose(i)}>
                  {c}
                </button>
              ))}
            </div>

            {message ? <div className="msg">{message}</div> : <div className="msg muted"> </div>}
          </div>
        ) : (
          <div className="reward">
            <div className="rewardInner card">
              <div className="rewardTitle">CONGRATULATIONS! YOU’RE A REAL USD1</div>
              <div className="rewardRow">
                <button className="btn btnPrimary" type="button" onClick={shareTikTok}>
                  Share on TikTok
                </button>
                <button className="btn" type="button" onClick={shareX}>
                  Share on X
                </button>
                <button className="btn" type="button" onClick={resetAll}>
                  Play again
                </button>
              </div>
              <div className="muted" style={{ fontSize: 13 }}>
                Tip: TikTok button copies the text to your clipboard and opens upload.
              </div>
            </div>
          </div>
        )}

      <style jsx>{`
        .quizCard {
          margin-top: 18px;
          padding: 18px;
          display: grid;
          gap: 14px;
        }
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .q {
          font-weight: 950;
          letter-spacing: -0.02em;
          font-size: 22px;
          line-height: 1.2;
        }
        .choices {
          display: grid;
          gap: 10px;
        }
        .choice {
          text-align: left;
          border-radius: 18px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.65);
          padding: 12px 14px;
          cursor: pointer;
          box-shadow: var(--shadowSoft);
        }
        :global(html.dark) .choice {
          background: rgba(255, 255, 255, 0.06);
        }
        .choice:hover {
          border-color: rgba(33, 181, 143, 0.35);
        }
        .msg {
          min-height: 20px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .quizCard.green {
          border-color: rgba(33, 181, 143, 0.38);
          box-shadow: 0 0 0 4px rgba(33, 181, 143, 0.12), var(--shadow);
        }
        .quizCard.red {
          border-color: rgba(255, 122, 107, 0.38);
          box-shadow: 0 0 0 4px rgba(255, 122, 107, 0.12), var(--shadow);
        }
        .reward {
          margin-top: 18px;
          border-radius: 26px;
          padding: 4px;
          background: var(--tintMint);
          border: 1px solid rgba(33, 181, 143, 0.18);
          animation: none;
        }
        @keyframes pulse {
          0% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.06);
          }
          100% {
            filter: brightness(1);
          }
        }
        .rewardInner {
          padding: 22px;
          display: grid;
          gap: 14px;
          text-align: center;
        }
        .rewardTitle {
          font-weight: 1000;
          letter-spacing: -0.02em;
          font-size: 26px;
        }
        .rewardRow {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
      </div>
    </div>
  );
}


