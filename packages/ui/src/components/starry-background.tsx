'use client';

export function StarryBackground() {
  return (
    <>
      <div className="stars fixed top-0 left-0 w-full h-full pointer-events-none" />
      <div className="bright-stars fixed top-0 left-0 w-full h-full pointer-events-none relative">
        <div className="bright-star" />
        <div className="bright-star" />
        <div className="bright-star" />
        <div className="bright-star" />
        <div className="bright-star" />
        <div className="bright-star" />
      </div>
    </>
  );
}
