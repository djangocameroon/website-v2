"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi2";
import { CLIENT_WEBSITE_REPO, SERVER_WEBSITE_REPO } from "@/lib/githubApi";
import { useWebsiteContributors } from "@/hooks/useWebsiteContributors";

const WebTeam = () => {
  const t = useTranslations("CreditsPage.webTeam");
  const { contributors, loading } = useWebsiteContributors();
  const [showRepoMenu, setShowRepoMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowRepoMenu(false);
      }
    };

    if (showRepoMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showRepoMenu]);

  return (
    <section className="py-8 md:py-12 border-t border-gray-800/20">
      <h2 className="nohemi-font font-bold text-2xl md:text-3xl">
        {t("title")}
      </h2>
      <p className="urbanist-font text-text-color text-base mt-3 max-w-2xl">
        {t("body")}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="size-14 rounded-full bg-secondary/10 animate-pulse"
            />
          ))}

        {!loading && (
          <>
            {contributors.map((contributor) => (
              <a
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${contributor.login} · ${contributor.contributions} contributions`}
                aria-label={`${contributor.login} on GitHub`}
                className="group relative size-14 rounded-full overflow-hidden border-2 border-secondary/40 hover:border-secondary transition-all hover:scale-110"
              >
                <Image
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </a>
            ))}
            <a
              href="https://github.com/Joel-Fah"
              target="_blank"
              rel="noopener noreferrer"
              title="Joel-Fah · Designing contributions"
              aria-label="Joel-Fah on GitHub"
              className="group relative size-14 rounded-full overflow-hidden border-2 border-secondary/40 hover:border-secondary transition-all hover:scale-110"
            >
              <Image
                src="https://avatars.githubusercontent.com/u/69576717?v=4"
                alt="Joel-Fah"
                fill
                sizes="56px"
                className="object-cover"
              />
            </a>
          </>
        )}
      </div>

      <div ref={menuRef} className="relative inline-block mt-5">
        <button
          type="button"
          onClick={() => setShowRepoMenu((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={showRepoMenu}
          className="inline-flex items-center gap-2 text-secondary urbanist-font font-semibold hover:underline cursor-pointer"
        >
          <FaGithub size={20} />
          {t("cta")}
          <HiChevronDown
            size={16}
            className={`transition-transform ${showRepoMenu ? "rotate-180" : ""}`}
          />
        </button>

        {showRepoMenu && (
          <div
            role="menu"
            className="absolute left-0 top-full z-20 mt-2 min-w-56 overflow-hidden rounded-xl border border-border bg-background shadow-lg"
          >
            <a
              role="menuitem"
              href={`https://github.com/${CLIENT_WEBSITE_REPO}/graphs/contributors?all=1`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowRepoMenu(false)}
              className="flex flex-col gap-0.5 px-4 py-3 urbanist-font transition-colors hover:bg-secondary/10"
            >
              <span className="text-sm font-semibold">{t("frontendRepo")}</span>
              <span className="text-xs text-text-color/60">{t("frontendRepoHint")}</span>
            </a>
            <a
              role="menuitem"
              href={`https://github.com/${SERVER_WEBSITE_REPO}/graphs/contributors?all=1`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowRepoMenu(false)}
              className="flex flex-col gap-0.5 border-t border-border px-4 py-3 urbanist-font transition-colors hover:bg-secondary/10"
            >
              <span className="text-sm font-semibold">{t("backendRepo")}</span>
              <span className="text-xs text-text-color/60">{t("backendRepoHint")}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebTeam;
