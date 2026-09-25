import { useEffect, useRef, useState } from "react";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

interface SmartImageProps {
  /** Chemin de la photo. Vide = visuel d'attente directement. */
  src?: string;
  alt: string;
  /** Légende du visuel d'attente (ex. modèle du véhicule). */
  placeholderLabel?: string;
  placeholderTone?: "light" | "dark";
  compact?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  /** Classes appliquées à l'image elle-même (ex. zoom au survol). */
  imgClassName?: string;
}

/**
 * Photo qui remplit toujours son cadre (object-fit: cover). Sans photo,
 * pendant le chargement ou en cas d'échec, le visuel d'attente s'affiche :
 * aucune zone n'est jamais vide.
 *
 * Le parent définit la taille (ratio ou hauteur) et doit être `relative`.
 */
export function SmartImage({
  src,
  alt,
  placeholderLabel,
  placeholderTone = "light",
  compact,
  loading = "lazy",
  fetchPriority,
  imgClassName = "",
}: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setStatus("loading");
    const img = imgRef.current;
    // Image déjà en cache : l'événement load a pu partir avant le montage.
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  const showImage = Boolean(src) && status !== "error";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {status !== "loaded" && (
        <PhotoPlaceholder label={placeholderLabel} tone={placeholderTone} compact={compact} />
      )}
      {showImage && (
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
