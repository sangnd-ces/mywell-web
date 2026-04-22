"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="p-8">
      <p className="text-danger">Error: {error.message}</p>
    </main>
  );
}
