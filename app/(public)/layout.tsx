import "@/app/(public)/public.css";
import { chaiBuilderPages, getChaiSiteSettings } from "@/chai";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/data";
import { registerFonts } from "@/fonts";
import { getFontHref, getThemeCustomFontFace } from "@/utils/styles-helper";
import { getChaiThemeCssVariables } from "@chaibuilder/pages/render";
import { get } from "lodash";
import { draftMode } from "next/headers";

registerFonts();

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

  // Add empty theme object as fallback
  const theme = get(siteSettings, "theme", {});
  const themeCssVariables = getChaiThemeCssVariables(theme);
  const bodyFont = get(theme, "fontFamily.body", "Inter");
  const headingFont = get(theme, "fontFamily.heading", "Inter");
  const fontUrls = getFontHref([bodyFont, headingFont]);
  const customFontFace = getThemeCustomFontFace([bodyFont, headingFont]);

  return (
    <html className={`smooth-scroll`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {fontUrls.map((fontUrl: string) => (
          <link
            key={fontUrl}
            rel="preload"
            href={fontUrl}
            as="style"
            crossOrigin=""
          />
        ))}

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <style
          id="theme-colors"
          dangerouslySetInnerHTML={{ __html: themeCssVariables }}
        />
        {fontUrls.map((fontUrl: string) => (
          <link key={fontUrl} rel="stylesheet" href={fontUrl} />
        ))}
        <style
          id="custom-font-face"
          dangerouslySetInnerHTML={{ __html: customFontFace }}
        />
      </head>
      <body className={`font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
