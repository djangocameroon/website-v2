"use client";

import { motion } from 'framer-motion';
import { BiSearch, BiX } from 'react-icons/bi';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/constants';
import { EventType } from '@/types/events';

export type EventTypeFilter = 'All' | EventType;
export type EventDateFilter = 'All' | 'Upcoming' | 'Ongoing' | 'Past';

export const EVENT_TYPE_OPTIONS: EventTypeFilter[] = ['All', 'Online', 'In-person', 'Hybrid'];
export const EVENT_DATE_OPTIONS: EventDateFilter[] = ['All', 'Upcoming', 'Ongoing', 'Past'];

interface PillGroupProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  getLabel?: (option: T) => string;
}

function PillGroup<T extends string>({ label, options, value, onChange, layoutId, getLabel }: PillGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-grey urbanist-font">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              'relative rounded-full px-4 py-2 text-sm font-medium urbanist-font transition-colors duration-200',
              value === option ? 'text-white dark:text-primary-foreground' : 'text-primary hover:text-primary/70'
            )}
          >
            {value === option && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-primary"
              />
            )}
            <span className="relative">{getLabel?.(option) ?? option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface EventsFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: EventTypeFilter;
  onTypeFilterChange: (value: EventTypeFilter) => void;
  dateFilter: EventDateFilter;
  onDateFilterChange: (value: EventDateFilter) => void;
}

const EventsFilterBar = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  dateFilter,
  onDateFilterChange,
}: EventsFilterBarProps) => {
  const t = useTranslations('EventsPage.filter');
  const tc = useTranslations('Common');
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 flex flex-col gap-5 rounded-3xl border border-primary/10 bg-background p-5 shadow-sm sm:p-6 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-3 rounded-full border border-primary/15 bg-primary/5 px-4 py-3 transition-colors duration-200 focus-within:border-primary/40">
        <BiSearch className="size-5 shrink-0 text-primary/60" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full bg-transparent text-sm text-dark outline-none placeholder:text-grey urbanist-font"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label={tc('clearSearch')}
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-primary/60 transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <BiX className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-primary/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <PillGroup
          label={t('typeLabel')}
          options={EVENT_TYPE_OPTIONS}
          value={typeFilter}
          onChange={onTypeFilterChange}
          layoutId="event-type-pill"
          getLabel={(option) => t(`typeOptions.${option}`)}
        />
        <PillGroup
          label={t('whenLabel')}
          options={EVENT_DATE_OPTIONS}
          value={dateFilter}
          onChange={onDateFilterChange}
          layoutId="event-date-pill"
          getLabel={(option) => t(`dateOptions.${option}`)}
        />
      </div>
    </motion.div>
  );
};

export default EventsFilterBar;
