import { useState } from "react";
import { Modal } from "@/components/Modal";
import { openModal } from "./utils/openModal";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormModalContentProps {
  isOpen: boolean;
  close: (result?: FormData) => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

function FormModalContent({
  isOpen,
  close,
  returnFocusRef,
}: FormModalContentProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "메시지를 입력해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const firstErrorField = Object.keys(newErrors)[0] as keyof FormData;
        const errorElement = document.querySelector(
          `[data-field="${firstErrorField}"]`
        ) as HTMLInputElement;
        if (errorElement) {
          errorElement.focus();
        }
      }, 100);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 500));
      close(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal
      title="문의 양식"
      description="이름, 이메일, 메시지를 입력하여 문의사항을 전송할 수 있습니다."
      isOpen={isOpen}
      onClose={() => close()}
      returnFocusRef={returnFocusRef}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            이름 *
          </label>
          <input
            id="name"
            type="text"
            data-field="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <div
              id="name-error"
              className="text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.name}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            이메일 *
          </label>
          <input
            id="email"
            type="email"
            data-field="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div
              id="email-error"
              className="text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.email}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            메시지 *
          </label>
          <textarea
            id="message"
            data-field="message"
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <div
              id="message-error"
              className="text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.message}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "전송 중..." : "전송"}
          </button>
          <button
            type="button"
            onClick={() => close()}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface OpenFormModalOptions {
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function openFormModal(
  options: OpenFormModalOptions = {}
): Promise<FormData | null> {
  return openModal(
    ({ close, isOpen, returnFocusRef }) => (
      <FormModalContent
        close={close}
        isOpen={isOpen}
        returnFocusRef={returnFocusRef || options.returnFocusRef}
      />
    ),
    options
  );
}
