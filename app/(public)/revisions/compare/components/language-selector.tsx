"use client";
import { useSearchParams, useRouter } from "next/navigation";

interface LanguageSelectorProps {
  defaultValue?: string;
  className?: string;
  languages?: string[];
}

export const LanguageSelector = ({
  defaultValue,
  className,
  languages,
}: LanguageSelectorProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentLang = searchParams.get("lang") || defaultValue;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("lang", newLang);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <div className="relative">
        <select
          className="block w-full py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={currentLang}
          onChange={handleLanguageChange}
        >
          {languages && languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
