import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef } from "react";

interface ModalOptions {
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  /** 모달이 닫힐 때 포커스를 복귀할 요소 (일반적으로 트리거 버튼) */
  returnFocusRef?: RefObject<HTMLElement | null>;
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
  returnFocusRef,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wasOpenRef = useRef(false);

  // TODO: LLM으로 생성하고 아직 검증하지 않은 코드입니다. 특히 애니메이션 관련해서 setTimeout코드는 확인이 필요합니다.
  // 포커스 관리
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      // 모달이 열릴 때: 제목으로 포커스 이동
      wasOpenRef.current = true;
      if (title && titleRef.current) {
        // 약간의 지연을 두어 애니메이션 완료 후 포커스
        setTimeout(() => {
          titleRef.current?.focus();
        }, 100);
      }
    } else if (!isOpen && wasOpenRef.current) {
      // 모달이 닫힐 때: 트리거 버튼으로 포커스 복귀
      wasOpenRef.current = false;
      if (returnFocusRef?.current) {
        setTimeout(() => {
          returnFocusRef.current?.focus();
        }, 100);
      }
    }
  }, [isOpen, title, returnFocusRef]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={className} showCloseButton={showCloseButton}>
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle ref={titleRef} tabIndex={-1}>
                {title}
              </DialogTitle>
            )}
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
