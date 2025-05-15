import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AppRoute = "home" | "prizes" | "detail";

interface RouterState {
  currentRoute: AppRoute;
  navigateTo: (route: AppRoute) => void;
  resetRouter: () => void;
}

export const useRouterStore = create<RouterState>()(
  devtools((set) => ({
    currentRoute: "home",
    navigateTo: (route) =>
      set({ currentRoute: route }, false, `router/navigateTo_${route}`),
    resetRouter: () =>
      set({ currentRoute: "home" }, false, "router/resetRouter"),
  }))
);
