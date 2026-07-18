"use client";

import Image from "next/image";
import type { IconType } from 'react-icons';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { Speaker } from '@/types/events';
import { SocialMediaPlatform } from '@/utils/constants';

const SOCIAL_ICONS: Record<string, IconType> = {
  [SocialMediaPlatform.TWITTER]: FaXTwitter,
  [SocialMediaPlatform.LINKEDIN]: FaLinkedinIn,
  [SocialMediaPlatform.GITHUB]: FaGithub,
  [SocialMediaPlatform.INSTAGRAM]: FaInstagram,
  [SocialMediaPlatform.FACEBOOK]: FaFacebookF,
  [SocialMediaPlatform.YOUTUBE]: FaYoutube,
  [SocialMediaPlatform.TIKTOK]: FaTiktok,
  [SocialMediaPlatform.WHATSAPP]: FaWhatsapp,
  [SocialMediaPlatform.TELEGRAM]: FaTelegram,
};

const EventSpeakers = ({ speakers }: { speakers: Speaker[] }) => {
  const t = useTranslations('EventsPage.speakers');
  if (!speakers.length) return null;


  return (
    <section className="py-8">
      <h2 className="nohemi-font font-semibold text-2xl text-primary mb-6 text-center">{t('title')}</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-14 justify-center">
        {speakers.map((speaker) => {
          const links = speaker.social_media.filter((link) => link.active && link.profile_link);
          const getSpeakerPfp = () => {
            if (speaker.photo) {
              return speaker.photo;
            } else {
              return `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=103E2E1A&size=175&rounded=true&bold=true&color=121212ff`;
            }
          }

          return (
            <div key={speaker.id} className="flex flex-col items-center text-center gap-y-1.5 w-[17.188rem]">
              <Image
                src={getSpeakerPfp()}
                alt={speaker.name}
                width={175}
                height={175}
                loading="lazy"
                className="size-[10.9375rem] rounded-full object-cover ring-4 ring-primary/10"
              />
              <p className="urbanist-font font-semibold text-dark mt-3">{speaker.name}</p>
              {speaker.speciality && (
                <p className="urbanist-font text-xs font-semibold uppercase tracking-wide text-secondary">
                  {speaker.speciality}
                </p>
              )}
              {speaker.bio && (
                <p className="urbanist-font text-sm text-grey line-clamp-2">{speaker.bio}</p>
              )}
              {links.length > 0 && (
                <div className="flex items-center gap-2 mt-1.5">
                  {links.map((link) => {
                    const Icon = SOCIAL_ICONS[link.platform] ?? FaLink;
                    return (
                      <a
                        key={link.id}
                        href={link.profile_link ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('socialAria', { name: speaker.name, platform: link.platform })}
                        className="flex size-9 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
                      >
                        <Icon className="size-3.5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventSpeakers;
