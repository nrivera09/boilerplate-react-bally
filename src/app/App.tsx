import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { IResponsivePresets } from "../features/GameSlideGrid/interfaces/IDimensionPreset";
import Router from "./Router";

function App() {
  const isLocal = window.location.hostname === "localhost";
  const [selectedSize, setSelectedSize] = useState(IResponsivePresets[0]);
  const [showSelector, setShowSelector] = useState(false);
  const [buildKey, setBuildKey] = useState(Date.now());
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Renderizamos dentro del iframe cuando cambian las dimensiones
  useEffect(() => {
    if (isLocal && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      let combinedCSS = "";

      for (const sheet of Array.from(document.styleSheets)) {
        try {
          if (sheet.cssRules) {
            for (const rule of Array.from(sheet.cssRules)) {
              combinedCSS += rule.cssText + "\n";
            }
          }
        } catch (e) {
          // Algunas hojas externas (como fuentes) lanzan error por CORS
          console.warn("No se pudo leer hoja de estilo:", sheet.href, e);
        }
      }

      // Escribir HTML completo con estilos embebidos
      doc.open();
      doc.write(`
        <html>
          <head>
            <style>${combinedCSS}</style>
          </head>
          <body>
            <div id="app"></div>
          </body>
        </html>
      `);
      doc.close();

      // Montar React dentro del iframe
      const mountNode = doc.getElementById("app");
      if (mountNode) {
        createRoot(mountNode).render(<Router />);
      }
    }
  }, [selectedSize, isLocal]);

  useEffect(() => {
    // Solo para entorno local
    if (isLocal) {
      setBuildKey(Date.now()); // fuerza rerender del iframe
    }
  }, []);

  if (!isLocal) return <Router />;

  // Calculamos dimensiones
  const iframeWidth =
    selectedSize.label === "Full View" ? "100%" : selectedSize.width;
  const iframeHeight =
    selectedSize.label === "Full View" ? "100lvh" : selectedSize.height;

  return (
    <>
      <Router></Router>
      <div className="!hidden relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-200">
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="fixed z-50 bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-xl hover:bg-gray-700 transition"
        >
          🎰
        </button>

        {/* Selector de resolución */}
        {showSelector && (
          <div className="fixed z-50 bottom-20 right-4 bg-white rounded-lg shadow-md p-4 border w-72 animate-fade-in">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selecciona tu Iview:
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={selectedSize.label}
              onChange={(e) => {
                const preset = IResponsivePresets.find(
                  (p) => p.label === e.target.value
                );
                if (preset) setSelectedSize(preset);
                setShowSelector(false);
              }}
            >
              {IResponsivePresets.map((preset) => (
                <option key={preset.label} value={preset.label}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <iframe
          key={`${selectedSize.label}-${buildKey}`}
          ref={iframeRef}
          className="border-none mx-auto rounded-md shadow-sm"
          style={{
            width: iframeWidth,
            height: iframeHeight,
            display: "block",
            background: "white",
          }}
          title="GameSlide Preview"
        />
      </div>
    </>
  );
}

export default App;
