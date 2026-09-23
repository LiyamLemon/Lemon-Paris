import { useEffect, useRef, useState } from "react";
import { CarFront } from "lucide-react";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Texte discret affiché dans le visuel de remplacement (ex. nom du véhicule). */
  fallbackLabel?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
  /** Classes appliquées à l'image elle-même (ex. effet de zoom au survol). */
  imgClassName?: string;
}

/**
 * Image qui remplit toujours son conteneur (object-fit: cover) et ne
 * laisse jamais de zone vide : tant que la photo charge, ou si elle ne
 * peut pas être chargée, un visuel de remplacement sobre est affiché.
 *
 * Le conteneur parent doit définir la taille (ratio ou hauteur) et être
 * positionné (relative).
 */
export function SmartImage({
  src,
  alt,
  fallbackLabel,
  loading = "lazy",
  fetchPriority,
  className = "",
  imgClassName = "",
}: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setStatus("loading");
    // Image déjà en cache : l'événement load a pu partir avant le montage.
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {status !== "loaded" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_30%_20%,rgba(197,164,109,0.12),transparent_60%),linear-gradient(145deg,#1c1916,#0c0b09)]"
        >
          <CarFront
            size={34}
            strokeWidth={1}
            className={`text-gold/50 ${status === "loading" ? "animate-pulse" : ""}`}
          />
          {fallbackLabel && (
            <span className="px-4 text-center text-[0.65rem] font-medium uppercase tracking-[0.25em] text-mist">
              {fallbackLabel}
            </span>
          )}
        </div>
      )}
      {status !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
