// src/app/Router.tsx
import { useRouterStore } from "./store/routerStore";
import { CarouselPage } from "../pages/CarouselPage";
import PrizeAvaible from "../pages/PrizeAvaible";
import PrizeDetail from "../pages/PrizeDetail";
const Router = () => {
  const { currentRoute } = useRouterStore();

  switch (currentRoute) {
    case "home":
      return <CarouselPage />;
    case "prizes":
      return <PrizeAvaible />;
    case "detail":
      return <PrizeDetail />;
    default:
      return <div>Ruta inválida</div>;
  }
};

export default Router;
