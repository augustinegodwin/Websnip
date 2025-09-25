"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <p>Oops! Something went wrong... maybe try refreshing?</p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1.5rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "1rem",
          fontSize: "1rem"
        }}
      >
        Try Again
      </button>
    </div>
  );
}
