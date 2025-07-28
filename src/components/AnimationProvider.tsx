'use client';

interface AnimationProviderProps {
  children: React.ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  // Este componente ahora solo envuelve children
  // Lenis se maneja en SmoothScrollProvider
  return <>{children}</>;
}
