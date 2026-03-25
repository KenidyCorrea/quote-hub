"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect, useEffectEvent } from "react";

type AdminModalProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  onClose: () => void;
  open: boolean;
  title: string;
};

export default function AdminModal({
  children,
  className,
  description,
  onClose,
  open,
  title,
}: AdminModalProps) {
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Fechar modal"
        className="ad-modal-backdrop"
        onClick={onClose}
        type="button"
      />
      <div className="ad-modal-wrap">
        <div className={`ad-modal-panel ${className ?? ""}`.trim()}>
          <div className="ad-modal-head">
            <div>
              <h2 className="ad-modal-title">{title}</h2>
              {description ? <p className="ad-modal-desc">{description}</p> : null}
            </div>

            <button
              aria-label="Fechar modal"
              className="ad-modal-close"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="ad-modal-body">{children}</div>
        </div>
      </div>
    </>
  );
}
