import "@/app/(public)/public.css";
import { chaiBuilderPages, getChaiSiteSettings } from "@/chai";
import "@/data";
import { getChaiCommonStyles, getFontHref } from "@/utils/styles-helper";
import { getChaiThemeCssVariables } from "@chaibuilder/sdk/render";
import { get } from "lodash";
import { draftMode } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  //IMPORTANT: This is an important step to set the draft mode for the page.
  //Without this, the page will always be in live mode
  chaiBuilderPages.setDraftMode(isEnabled);

  const siteSettings = await getChaiSiteSettings();
  if ("error" in siteSettings) {
    console.error(siteSettings.error);
  }
  chaiBuilderPages.setFallbackLang(get(siteSettings, "fallbackLang", ""));

  // Add empty theme object as fallback
  const theme = get(siteSettings, "theme", {});
  const themeCssVariables = getChaiThemeCssVariables(theme);
  const commonStyles = await getChaiCommonStyles();
  const bodyFont = get(theme, "fontFamily.body", "Inter");
  const headingFont = get(theme, "fontFamily.heading", "Inter");
  const fontUrl = getFontHref(bodyFont, headingFont);
  return (
    <html lang="en" className={`smooth-scroll`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" href={fontUrl} as="style" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <style
          id="theme-fonts"
          dangerouslySetInnerHTML={{ __html: themeCssVariables }}
        />
        <link rel="stylesheet" href={fontUrl} />
        <style
          id="common-styles"
          dangerouslySetInnerHTML={{ __html: commonStyles }}
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
