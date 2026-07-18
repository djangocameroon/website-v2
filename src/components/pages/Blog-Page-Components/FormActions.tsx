"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface FormActionsProps {
  isSubmitting?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting = false
}) => {
  const router = useRouter();
  const t = useTranslations("BlogPage.add");

  return (
    <div className="flex gap-4 pt-6 border-t urbanist-font border-gray-100">
      <button
        type="button"
        onClick={() => router.push('/blog')}
        disabled={isSubmitting}
        className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        {t('cancel')}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 py-3 px-6 bg-[#13322b] hover:bg-[#0d241f] text-white rounded-xl font-bold transition-colors disabled:opacity-50"
      >
        {isSubmitting ? t('publishing') : t('publish')}
      </button>
    </div>
  );
};