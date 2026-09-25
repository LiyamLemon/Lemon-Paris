import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Variant = "gold" | "dark" | "outline-light" | "outline-dark";

const VARIANTS: Record<Variant, string> = {
  /* CTA principal — l'un des rares usages du champagne en aplat */
  gold: "bg-gold text-ink hover:bg-gold-soft",
  /* CTA sur fond clair */
  dark: "bg-anthracite text-paper hover:bg-ink",
  // Bordures de contrôle contrôlées (seuil non-texte WCAG : 3:1) :
  // paper/40 sur ink = 3.59:1, anthracite/50 sur paper = 3.27:1.
  /* CTA secondaire sur fond sombre */
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper/5",
  /* CTA secondaire sur fond clair */
  "outline-dark": "border border-anthracite/50 text-anthracite hover:border-anthracite",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-sm font-medium tracking-[0.04em] transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  /** Petite flèche après le libellé, pour les CTA de navigation. */
  arrow?: boolean;
  fullWidth?: boolean;
  className?: string;
}

type LinkButtonProps = CommonProps & { to: string; onClick?: () => void };
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { to?: undefined };

/** Bouton unique du site : lien de navigation (`to`) ou bouton natif. */
export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "gold", arrow, fullWidth, className = "" } = props;
  const classes = `${BASE} ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
    </>
  );

  if (props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _c, variant: _v, arrow: _a, fullWidth: _f, className: _cn, to: _t, ...native } =
    props;
  return (
    <button type="button" {...native} className={classes}>
      {content}
    </button>
  );
}
