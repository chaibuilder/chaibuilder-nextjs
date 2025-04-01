"use client";

import { bluePreset, greenPreset, orangePreset } from "@/chai/theme-presets";
import FullScreenLoader from "@/components/builder/lader";
import Logout from "@/components/builder/sign-out";
import { useBuilderAuth } from "@/hooks/use-builder-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";

const ChaiBuilderPages = dynamic(
  () => import("@/components/builder/chaibuilder-pages"),
  { ssr: false, loading: () => <FullScreenLoader /> }
);

const MediaManager = dynamic(
  () => import("@/components/builder/media-manager"),
  { ssr: false }
);
const Login = dynamic(() => import("@/components/builder/chaibuilder-login"), {
  ssr: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const Logo = () => (
  <div className="rounded-lg">
    <a
      className="flex-none flex rounded text-xl items-center font-semibold focus:outline-none focus:opacity-80"
      aria-label="Chai Builder"
      href="https://www.chaibuilder.com">
      <Image
        src={"https://ucarecdn.com/fbfc3b05-cb73-4e99-92a2-3a367b7c36cd/"}
        alt=""
        loading="lazy"
        width="30"
        height="30"
        decoding="async"
        data-nimg="1"
        className="w-8 h-8 text-primary-400 dark:text-primary-300 rounded"
      />
    </a>
  </div>
);

export default function Page() {
  const { isLoggedIn, user } = useBuilderAuth();
  if (!isLoggedIn) return <Login logo={Logo} />;

  return (
    <QueryClientProvider client={queryClient}>
      <ChaiBuilderPages
        themePresets={[
          { orange: orangePreset },
          { green: greenPreset },
          { blue: bluePreset },
        ]}
        getPreviewUrl={(slug: string) => `/chai/api/preview?slug=${slug}`}
        autoSaveSupport={false}
        mediaManagerComponent={MediaManager}
        logo={Logo}
        sidebarBottomComponents={[Logout]}
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          authToken: user.authToken,
          role: "admin",
          permissions: [],
        }}
        onSessionExpired={() => window.location.reload()}
      />
    </QueryClientProvider>
  );
}
