"use client";

import { LuChevronDown } from "react-icons/lu";

const LanguageSwitcher = () => {
  return (
    <div className="border-b-[1.5px] border-b-black relative flex items-center gap-x-2.5 py-2 px-4">
      <select className='focus:outline-none bg-transparent urbanist-font text-opacity-80 appearance-none'>
        <option value='EN'>🇺🇸{" "}En - English (US)</option>
        <option value='FR'>🇺🇸 Fr - French (FR)</option>
        <option value='PT'>🇺🇸 PO - Portugal (PO)</option>
      </select>
      <LuChevronDown />

    </div>
    
  );
}

export default LanguageSwitcher