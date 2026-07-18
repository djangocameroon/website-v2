"use client";


import { AiOutlinePlus } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

interface ImageUploadProps {
  label: string;
  required?: boolean;
  preview?: string;
  onImageChange: (file: File) => void;
  id: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  required = false,
  preview,
  onImageChange,
  id
}) => {
  const t = useTranslations('BlogPage.add');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id={id}
          required={required}
        />
        <label htmlFor={id} className="cursor-pointer">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- preview is a data: URL, unsupported by next/image
            <img
              src={preview}
              alt={`${label} preview`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ) : (
            <div className="py-8 urbanist-font">
              <AiOutlinePlus size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-semibold">{t('clickToUpload', { label: label.toLowerCase() })}</p>
              <p className="text-gray-400 text-sm mt-2">{t('imageConstraints')}</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};