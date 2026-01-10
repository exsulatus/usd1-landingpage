"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "40px 20px", maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ marginBottom: "12px" }}>Something went wrong</h1>
          <p style={{ color: "#666", marginBottom: "24px" }}>
            We ran into an unexpected issue.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

