import React from "react";
import imgFondo from "../../../shared/assets/img/Fondo-regalo-solo.jpg";

const SlideCardGrid = () => {
  return (
    <div
      className="slideCard flex flex-col h-full"
      style={{
        backgroundImage: `url(${imgFondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="title min-h-[30px] flex flex-col items-center justify-center bg-yellow-300">
        <h1 className="text-black">USTED PUEDE CANJEAR SU REGALO</h1>
      </div>
      <div className="prizes flex-1 h-full">xsd</div>
      <div className="points min-h-[30px] w-full flex flex-row items-center justify-center gap-2 bg-blue-500 px-2">
        <div className="flex flex-row gap-2 items-center justify-center w-[66%]">
          <div className="w-[50%]">
            <p className="font-bold text-white">USTED TIENE:</p>
          </div>
          <div className="w-[50%]">
            <p className="text-white">0000 PTS</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="range bg-white m-2 overflow-hidden rounded-full p-1">
            <div className="bg-yellow-400 rounded-full w-[80%] min-h-[20px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCardGrid;
