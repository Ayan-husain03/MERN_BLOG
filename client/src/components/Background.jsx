import React from "react";

function Background({ children }) {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-950 to-black text-zinc-200">
      {/* Soft gradient beams */}
      <div className="pointer-events-none absolute -top-24 -left-28 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse [animation-delay:200ms]" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl mix-blend-screen" />
      <div className="pointer-events-none absolute top-2/3 right-1/4 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl mix-blend-screen" />

      {/* Subtle noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<?xml version=\\'1.0\\' encoding=\\'UTF-8\\'?><svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'300\\' viewBox=\\'0 0 300 300\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.05\\'/></svg>')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content */}
      <main className="relative mx-auto flex min-h-screen max-w-xl items-center justify-center p-2 md:p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Background;
