"use client";

import { useTranslations } from "next-intl";

const ProjectCTA = () => {
  const t = useTranslations("ProjectsPage.cta");
  return (
    <div className="bg-[#0C4B33] rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-lg">
      <h2 className="text-white nohemi-font text-3xl md:text-4xl font-bold">
        {t('title')}
      </h2>
      <p className="text-white/90 urbanist-font text-lg max-w-2xl mx-auto">
        {t('body')}
      </p>
      <button className="bg-white text-[#0C4B33] urbanist-font font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg">
        {t('submit')}
      </button>
    </div>
  );
};

export default ProjectCTA;
