"use client";

import { useTheme } from "@wrksz/themes/client";
import { ThemeSwitcher } from "./theme-switcher";

const ToggleSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <div className="sm:*:hidden">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={resolvedTheme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            className="sr-only peer"
          />
          <div className="group peer ring-0  bg-gradient-to-bl from-neutral-300 via-neutral-500 to-neutral-700  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1   peer-checked:after:translate-x-5 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-500"></div>
        </label>
      </div>
      <div className="max-sm:hidden fixed right-4 bottom-4 z-50">
        <ThemeSwitcher onChange={setTheme} value={resolvedTheme ?? "light"} />
      </div>

    </>
  );
};

export default ToggleSwitch;
