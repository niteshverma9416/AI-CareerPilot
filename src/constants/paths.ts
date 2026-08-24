export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  resume: "/resume",
  jobs: "/jobs",
  skillGap: "/skill-gap",
  roadmap: "/roadmap",
  assistant: "/assistant",
  interview: "/interview",
  github: "/github",
  profile: "/profile",
  settings: "/settings",
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
