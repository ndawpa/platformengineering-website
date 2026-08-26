export const FUTURE_FEATURES = {
  jobs: false,
  courses: false,
  digitalProducts: false,
  premiumContent: false,
  community: false,
  sponsors: false,
  affiliates: false,
} as const;

export type FutureFeature = keyof typeof FUTURE_FEATURES;
