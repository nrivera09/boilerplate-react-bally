import { sounds } from "../assets/sounds";

export type SoundName = keyof typeof sounds;

export function useSoundEffect() {
  const playSound = (name: SoundName) => {
    const audio = new Audio(sounds[name]);
    audio.play().catch((e) => {
      console.warn(`No se pudo reproducir el sonido: ${name}`, e);
    });
  };

  return { playSound };
}
