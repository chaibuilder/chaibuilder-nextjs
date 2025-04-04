/**
 * This is a mock implementation of the useAuth hook.
 * It is used to simulate the authentication process.
 * @returns {Object} An object containing the user, logout, isLoggedIn, loading, and error properties.
 */
export const useBuilderAuth = () => {
  // Check if window is defined (client-side) before accessing localStorage
  const isClient = typeof window !== "undefined";

  return {
    user: {
      authToken: "mock-chai-user-token",
      id: "mock-chai-user",
      name: "Chai User",
      email: "mock-chai-user@chaibuilder.com",
      photoURL: "https://placehold.co/40x40",
    },
    logout: () => {
      if (isClient) {
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
      }
    },
    isLoggedIn: isClient
      ? localStorage.getItem("isLoggedIn") === "true"
      : false,
    loading: false,
    error: null,
    login: () => {
      if (isClient) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.reload();
      }
    },
  };
};
