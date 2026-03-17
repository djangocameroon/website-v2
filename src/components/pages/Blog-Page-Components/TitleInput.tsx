interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Titre de l'article..."}
        required={true}
        className="w-full bg-transparent border-none p-0 text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-200 focus:ring-0 outline-none nohemi-font tracking-tight"
      />
      {/* Animated underline bar for a modern look */}
      <div className="h-[2px] w-full bg-gray-100 mt-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 translate-x-[-100%] group-focus-within:translate-x-0 transition-transform duration-500 ease-in-out"></div>
      </div>
    </div>
  );
};