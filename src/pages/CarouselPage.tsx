import React, { useState } from "react";
import { useRouterStore } from "../app/store/routerStore";
import { useSoundEffect } from "../shared/hooks/useSoundEffect";
import PremiosCarrusel from "../features/GameSlideGrid/components/SlideCardGrid";
import SlideCardGrid from "../features/GameSlideGrid/components/SlideCardGrid";

export const CarouselPage = () => {
  const { playSound } = useSoundEffect();
  const { navigateTo } = useRouterStore();

  const premiosMock = [
    { id: 1, nombre: "Milkshaker en vaso", imagen: "/milkshaker.png" },
    { id: 2, nombre: "Exprimidor de naranja", imagen: "/exprimidor.png" },
    { id: 3, nombre: "Billetera Grencbil", imagen: "/billetera.png" },
    { id: 4, nombre: "Mochila Adventure", imagen: "/mochila.png" },
    { id: 5, nombre: "Premio 5", imagen: "/otro.png" },
    { id: 6, nombre: "Premio 6", imagen: "/otro2.png" },
  ];

  const [pagina, setPagina] = useState(0);
  const itemsPorPagina = 1;
  const totalPaginas = Math.ceil(premiosMock.length / itemsPorPagina);

  const premiosVisibles = premiosMock.slice(
    pagina * itemsPorPagina,
    (pagina + 1) * itemsPorPagina
  );

  const esPrimeraPagina = pagina === 0;
  const esUltimaPagina = pagina === totalPaginas - 1;
  return (
    <div className="w-full mx-auto text-center flex flex-col h-full">
      <div className="carousel flex-1 ">
        {premiosVisibles.map((premio) => (
          <SlideCardGrid></SlideCardGrid>
        ))}
      </div>
      <div className=" text-white flex justify-center items-center h-[65px]">
        <div className="flex items-center gap-2">
          <button
            disabled={esPrimeraPagina}
            className={`min-w-[60px] min-h-[45px] bg-blue-950 rounded-md transition-opacity`}
            onClick={() => setPagina((p) => Math.max(0, p - 1))}
          >
            ‹
          </button>

          <button
            className={`min-w-[60px] min-h-[45px] bg-black rounded-md transition-opacity`}
            onClick={() => alert("Volver")}
          >
            VOLVER
          </button>

          <button
            disabled={esUltimaPagina}
            className={`bg-black px-3 py-1 border-2 border-white text-white rounded transition-opacity ${
              esUltimaPagina
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
            onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};
