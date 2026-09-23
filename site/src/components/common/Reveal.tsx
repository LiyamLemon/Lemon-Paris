import type { ElementType, ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

/** Enveloppe légère qui anime l'apparition de son contenu au scroll. */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) {
  const ref = useReveal<HTMLElement>(delay);
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
