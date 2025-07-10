import { getChaiBuilderRevisionPage, getChaiSiteSettings } from "@/chai";
import { notFound } from "next/navigation";
import { LeftFrame } from "./components/left-ifram";
import { RightFrame } from "./components/right-iframe";
import { LanguageSelector } from "./components/LanguageSelector";

interface VersionInfo {
  type: "draft" | "live" | "revision";
  publishedAt?: string;
  author?: string;
  lastSaved?: string;
}

interface ComparePageProps {
  searchParams: {
    version1?: string;
    version2?: string;
    lang?: string;
  };
}

const getVersionInfo = async (versionString: string, fallbackLang: string = "en"): Promise<VersionInfo> => {
  let type: "draft" | "live" | "revision" = "revision";
  let id = "";
  let lang = fallbackLang;
  let label = "";
  
  const typeMatch = versionString.match(/^(revision|draft|live):([^:]+)(?::([^:]+))?/);
  
  if (typeMatch) {
    type = typeMatch[1] as "draft" | "live" | "revision";
    id = typeMatch[2];
    if (type === "revision") {
      label = typeMatch[3]?.split("&")[0] || " ";
    }
  } else {
    id = versionString;
  }
  // console.log ("###",type,id,lang,label)
  
  const pageData = await getChaiBuilderRevisionPage({
    id : id,
    type : type,
    lang : lang,
  });
  console.log("##",pageData)
  
  return {
    type ,
    author: pageData?.author || undefined,
    publishedAt: pageData.publishedAt || undefined,
    lastSaved: pageData.lastSaved || undefined,
  };
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { version1, version2, lang = "en" } = await searchParams;
  const siteSettings = await getChaiSiteSettings();
  const fallbackLang = siteSettings?.fallbackLang || "en";
  const availableLanguages = siteSettings?.languages?.length
    ? [...new Set([fallbackLang, ...siteSettings.languages])]
    : [fallbackLang];

  if (!version1 || !version2) {
    return notFound();
  }

  
  const baseVersionUrl = `/revision/${version1}&lang=${lang}`;
  const compareVersionUrl = `/revision/${version2}&lang=${lang}`;
  const baseVersion = await getVersionInfo(version1);
  const compareVersion = await getVersionInfo(version2);

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Version Selector */}
      <div className=" bg-white p-4  ">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-gray-900">Version 1</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {baseVersion.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {baseVersion.publishedAt &&
                `Published on ${new Date(baseVersion.publishedAt).toLocaleDateString()}`}
            </p>
          </div>

          {/* Language Selector */}
          <LanguageSelector
            defaultValue={lang}
            languages={availableLanguages}
          />
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2">
              <h2 className="text-lg font-medium text-gray-900">Version 2</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {compareVersion.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {compareVersion.lastSaved &&
                `Last saved on ${new Date(compareVersion.lastSaved).toLocaleDateString()}`}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="bg-white  shadow overflow-hidden">
          <div className="h-screen">
            <LeftFrame url={baseVersionUrl} />
          </div>
        </div>

        <div className="bg-white  shadow overflow-hidden">
          <div className="h-screen">
            <RightFrame url={compareVersionUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
