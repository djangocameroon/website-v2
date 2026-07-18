"use client";

import Link from "next/link";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

export const BlogAddHeader = () => {
  const t = useTranslations('BlogPage.add');
  return (
    <div className="mb-10">
      <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors group">
        <AiOutlineArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">{t('backToBlog')}</span>
      </Link>
    </div>
  );
};