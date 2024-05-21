import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],

  defaultLocale: "vi",
});

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req);
  },
  publicRoutes: ["/vi", "/en"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
