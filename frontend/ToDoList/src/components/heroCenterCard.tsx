import type { PropsWithChildren } from "react";

export default function HeroCenterCard({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <div className="hero-content">{children}</div>
    </div>
  );
}
