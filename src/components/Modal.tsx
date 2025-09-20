import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { overlay } from "overlay-kit";
import type { ReactNode } from "react";

interface ModalOptions {
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

interface Props extends ModalOptions {
  isOpen: boolean;
  onClose: () => void;
  /** NOTE: 이후 children에 오는 디자인 형식이 통일된다면 추상화를 고려해주세요. */
  children: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  className,
  showCloseButton = true,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={className} showCloseButton={showCloseButton}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

Modal.Footer = DialogFooter;
