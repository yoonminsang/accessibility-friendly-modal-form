import { openFormModal } from "@/FormModal";
import { useRef, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ModalFormPage = () => {
  const [result, setResult] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenFormDialog = async () => {
    setIsLoading(true);
    try {
      const formData = await openFormModal({
        returnFocusRef: triggerButtonRef,
      });
      console.log(formData);
      setResult(formData);
    } catch (error) {
      console.error("Modal error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          접근성 친화적 모달 폼 (shadcn/ui + overlay-kit)
        </h1>

        <div className="bg-card rounded-lg shadow-md p-8 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              shadcn/ui와 overlay-kit을 결합한 재사용 가능한 다이얼로그
              시스템입니다.
            </p>

            <div className="space-y-3">
              <button
                ref={triggerButtonRef}
                onClick={handleOpenFormDialog}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? "로딩 중..." : "📝 문의 양식 열기"}
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                제출된 내용:
              </h3>
              <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <p>
                  <strong>이름:</strong> {result.name}
                </p>
                <p>
                  <strong>이메일:</strong> {result.email}
                </p>
                <p>
                  <strong>메시지:</strong> {result.message}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">🚀 주요 기능</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ shadcn/ui 디자인 시스템</li>
              <li>✅ overlay-kit 선언적 API</li>
              <li>✅ TypeScript 완전 지원</li>
              <li>✅ 접근성 최적화 (ARIA, 포커스 관리)</li>
              <li>✅ 키보드 네비게이션</li>
              <li>✅ 폼 유효성 검증</li>
              <li>✅ 재사용 가능한 컴포넌트</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFormPage;
