import { registerBlocks } from "@/blocks";
import { registerServerBlocks } from "@/blocks/index.server";
import {
  chaiBuilderPages,
  getChaiBuilderRevisionPage,
  getChaiPageStyles,
  getChaiSiteSettings,
} from "@/chai";

import RevisionBanner from "@/components/revision-banner";
import "@/page-types";
import type { ChaiBlock } from "@chaibuilder/pages";
import { RenderChaiBlocks } from "@chaibuilder/pages/render";
import { ChaiPageProps } from "@chaibuilder/pages/runtime";
import { loadWebBlocks } from "@chaibuilder/pages/web-blocks";
import { get } from "lodash";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

loadWebBlocks();
registerBlocks();
registerServerBlocks();

export const dynamic = "force-dynamic";

export const generateMetadata = async () => {
  return {
    title: "View Revision",
    description: "View Revision",
    openGraph: {
      title: "View Revision",
      description: "View Revision",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
};

export type PageProps = {
  slug: string;
  pageType: string;
  fallbackLang: string;
  lastSaved: string;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ revisions: string[] }>;
  searchParams: Promise<{
    label?: string;
    lang?: string;
    banner?: string;
  }>;
}) {
  let type: "draft" | "live" | "revision" = "revision";
  let id = "";
  let lang = "";
  let label = "";
  const { isEnabled } = await draftMode();
  const nextParams = await params;
  const search = await searchParams;
  const banner = search.banner === "false" ? false : true;
  const siteSettings: { fallbackLang: string; error?: string } =
    await getChaiSiteSettings();
  const fallbackLang = get(siteSettings, "fallbackLang", "en");
  if (search.lang) {
    lang = search.lang;
  } else {
    lang = fallbackLang;
  }
  chaiBuilderPages.setFallbackLang(lang);
  const pathSegment = decodeURIComponent(nextParams.revisions[0]);
  const typeMatch = pathSegment.match(
    /^(revision|draft|live):([^:]+)(?::([^:]+))?/
  );

  if (typeMatch) {
    type = typeMatch[1] as "draft" | "live" | "revision";
    id = typeMatch[2];
    if (type == "revision") {
      label = typeMatch[3]?.split("&")[0] || " ";
    }
  } else {
    id = pathSegment;
  }
  const chaiPage = await getChaiBuilderRevisionPage({
    id,
    type,
    lang,
  });

  if ("error" in chaiPage && chaiPage.error === "NOT_FOUND") {
    return notFound();
  }
  const pageStyles = await getChaiPageStyles(chaiPage.blocks as ChaiBlock[]);
  const pageProps: ChaiPageProps = {
    slug: `/revision/${chaiPage.slug}`,
    pageType: chaiPage.pageType,
    fallbackLang,
    lastSaved: chaiPage.lastSaved,
    pageId: chaiPage.id,
    primaryPageId: chaiPage.primaryPage,
    languagePageId: chaiPage.languagePageId,
    pageBaseSlug: chaiPage.slug,
  };
  return (
    <div lang={lang}>
      <style
        id="chaibuilder-styles"
        dangerouslySetInnerHTML={{ __html: pageStyles }}
      />
      {banner && <RevisionBanner type={type} label={label} time={chaiPage.lastSaved} />}
      <RenderChaiBlocks
        externalData={chaiPage}
        blocks={chaiPage.blocks as unknown as ChaiBlock[]}
        fallbackLang={fallbackLang}
        lang={lang}
        draft={isEnabled}
        pageProps={pageProps}
      />
    </div>
  );
}
