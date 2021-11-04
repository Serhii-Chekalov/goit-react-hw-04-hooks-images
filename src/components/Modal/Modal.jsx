import { useEffect } from "react";
import { Overlay, ModalStyle } from "./Modal.styled";

export function Modal({ src, alt, onSelect }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onSelect();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onSelect();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalStyle>
        <img src={src} alt={alt} />
      </ModalStyle>
    </Overlay>
  );
}
