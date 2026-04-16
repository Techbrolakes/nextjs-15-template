"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-4 text-lg text-muted">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="mt-8 cursor-pointer rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Try Again
      </button>
    </div>
  );
}
