"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page">
      <div className="container">
        <div className="errorBox">
          <h1 className="errorTitle">Something went wrong</h1>
          <p className="errorText">
            We ran into an unexpected issue. You can try again or head back to the homepage.
          </p>
          <div className="errorActions">
            <button className="btn" onClick={reset}>
              Try again
            </button>
            <a href="/" className="btn">
              Go home
            </a>
          </div>
        </div>
        <style jsx>{`
          .errorBox {
            max-width: 480px;
            margin: 60px auto;
            text-align: center;
          }
          .errorTitle {
            margin: 0 0 12px 0;
            font-size: 28px;
            letter-spacing: -0.02em;
          }
          .errorText {
            margin: 0 0 24px 0;
            color: var(--muted);
          }
          .errorActions {
            display: flex;
            gap: 12px;
            justify-content: center;
          }
        `}</style>
      </div>
    </div>
  );
}

