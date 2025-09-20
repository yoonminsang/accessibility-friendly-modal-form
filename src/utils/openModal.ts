import { overlay } from "overlay-kit";
import type { ReactNode, RefObject } from "react";

interface OpenModalOptions {
  // TODO: OpenModalButton같은 컴포넌트를 만들면 ref를 전달하지 않고도 포커스를 복귀할 수 있음. 고려해보기
  /** 모달이 닫힐 때 포커스를 복귀할 요소 (일반적으로 트리거 버튼) */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function openModal<T>(
  children: (params: {
    isOpen: boolean;
    close: (result?: T) => void;
    returnFocusRef?: RefObject<HTMLElement | null>;
  }) => ReactNode,
  options: OpenModalOptions = {}
): Promise<T | null> {
  // NOTE: 이후 메모리 최적화를 위해 unmount가 필요하다면 다음을 주의해서 작업해주세요.
  // 모달이 닫힐 때 애니메이션이 존재하고, close로 promise 결과를 전달하기 때문에 close는 꼭 필요합니다.
  return overlay.openAsync(({ isOpen, close: _close }) => {
    const close = (result?: T) => {
      _close(result ?? null);
    };
    return children({ isOpen, close, returnFocusRef: options.returnFocusRef });
  });
}
