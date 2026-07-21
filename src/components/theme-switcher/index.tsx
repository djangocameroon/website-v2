"use client";

import { cn } from "@/utils";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { LuMoon, LuSun } from "react-icons/lu";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const themes = [
  // {
  //   key: "system",
  //   icon: Monitor,
  //   label: "System theme",
  // },
  {
    key: "light",
    icon: LuSun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: LuMoon,
    label: "Dark theme",
  },
] as const;

export type ThemeSwitcherProps = {
  value?: "light" | "dark";
  onChange?: (theme: "light" | "dark") => void;
  defaultValue?: "light" | "dark";
  className?: string;
};

export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = "light",
  className,
}: ThemeSwitcherProps) => {
  const [theme, setTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange,
  });
  const [mounted, setMounted] = useState(false);
  const [isHoveredOn, setIsHoveredOn] = useState(false);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  const handleMouseEnter = useCallback(() => {
    clearTimeout(leaveTimeoutRef.current);
    setIsHoveredOn(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => setIsHoveredOn(false), 500);
  }, []);

  useEffect(() => {
    return () => clearTimeout(leaveTimeoutRef.current);
  }, []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full p-1 ring-1 ring-border transition-opacity",
        className,
        { "opacity-50": !isHoveredOn }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark")}
            type="button"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-foreground dark:bg-primary"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-foreground dark:text-primary-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
