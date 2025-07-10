import { getChaiSiteSettings } from "@/chai";
import { notFound } from "next/navigation";
import { LeftFrame } from "./components/left-ifram";
import { RightFrame } from "./components/right-iframe";

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

const getVersionInfo = (versionString: string): VersionInfo => {
  // TODO: Replace with actual data fetching logic
  const [type] = versionString.split(":");
  return {
    type: type as "draft" | "live" | "revision",
    author: "Author Name",
    publishedAt: new Date().toISOString(),
    lastSaved: new Date().toISOString(),
  };
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { version1, version2, lang = "en" } = searchParams;
  const siteSettings = await getChaiSiteSettings();
  console.log("###", siteSettings);
  console.log(version1);
  console.log(version2);
  console.log(lang);

  if (!version1 || !version2) {
    return notFound();
  }

  const baseVersion = getVersionInfo(version1);
  const compareVersion = getVersionInfo(version2);

  const baseVersionUrl = `/api/preview?type=${baseVersion.type}&id=${version1.split(":")[1]}&lang=${lang}`;
  const compareVersionUrl = `/api/preview?type=${compareVersion.type}&id=${version2.split(":")[1]}&lang=${lang}`;

  const getVersionLabel = (versionString: string): string => {
    if (!versionString) return "Select version";
    if (versionString.includes("live:")) return "Live";
    if (versionString.includes("draft:")) return "Draft";

    const revisionMatch = versionString.match(/revision:[^:]+:(\d+)/);
    if (revisionMatch) {
      return `Revision ${revisionMatch[1]}`;
    }
    return versionString;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compare Revisions</h1>
      </header>

      {/* Version Selector */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Base Version */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {baseVersion.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {baseVersion.publishedAt &&
                `Published on ${new Date(baseVersion.publishedAt).toLocaleDateString()}`}
            </p>
          </div>

          {/* Center Language Selector */}
          <div className="flex-shrink-0">
            <div className="relative">
              <select
                className="block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-[10px]"
                defaultValue={lang}
                onChange={(e) => {
                  const newParams = new URLSearchParams(window.location.search);
                  newParams.set("lang", e.target.value);
                  window.location.search = newParams.toString();
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>

          {/* Compare Version */}
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2">
              <h2 className="text-lg font-medium text-gray-900">
                Compare Version
              </h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Base Version</h3>
          </div>
          <div className="h-[calc(100vh-250px)]">
            <LeftFrame url={baseVersionUrl} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Compare Version
            </h3>
          </div>
          <div className="h-[calc(100vh-250px)]">
            <RightFrame url={compareVersionUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
