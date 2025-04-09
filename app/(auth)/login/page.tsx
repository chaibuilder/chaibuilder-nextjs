import { Logo } from "@/components/builder/logo";
import LoginButton from "@/components/auth/login-button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col-reverse lg:flex-row">
      {/* Left side - Link, Content */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-fuchsia-800 p-8 lg:p-16 flex-col justify-center items-center lg:items-start relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo and brand */}
        <div className="relative z-10 flex items-center space-x-4 mb-12">
          <div className="border-2 border-2 rounded">
            <Logo />
          </div>
          <h1 className="text-white text-3xl font-bold">Chai Builder</h1>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <h2 className="text-white text-3xl xl:text-5xl font-bold mb-6 text-center lg:text-left">
            Build websites visually
            <br />
            with Chai Builder
          </h2>
          <p className="text-white/70 text-lg xl:text-xl mb-8 max-w-xl hidden lg:flex">
            The ultimate React + Tailwind website builder with AI-powered
            features, drag-and-drop editing, and instant publishing.
          </p>

          {/* Feature grid */}
          <div className="hidden xl:grid grid-cols-2 gap-4 max-w-xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-3 hover:shadow-xl duration-300"
              >
                <div className="mt-0.5 text-white">{feature.icon}</div>
                <div>
                  <h3 className="text-white font-medium">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="w-full lg:w-1/2 h-full bg-white flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo width={50} height={50} />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to your dashboard
          </p>

          <LoginButton />

          <p className="text-xs text-center text-gray-500">
            By signing in, you agree to our
            <a
              href="#"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              {" "}
              Terms of Service
            </a>{" "}
            and
            <a
              href="#"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              {" "}
              Privacy Policy
            </a>
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-purple-600"
            >
              Learn more about Chai Builder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature items with icons
const features = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
    title: "Drag & Drop Builder",
    description: "Build visually with ease",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "One-Click Publish",
    description: "Deploy instantly",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    title: "AI Content & Style",
    description: "Generate with AI",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Revisions & Restore",
    description: "Version control",
  },
];
