// src/components/cats2048/tileAssets.ts

// ✅ Put your cat images in src/assets/cats/
// ✅ Replace these filenames with your real ones

import cat2 from "/src/assets/catpic1.jpg";
import cat4 from "/src/assets/catpic2.jpg";
import cat8 from "/src/assets/catpic3.jpg";
import cat16 from "/src/assets/catpic4.jpg";
import cat32 from "/src/assets/catpic5.jpg";
import cat64 from "/src/assets/catpic6.jpg";
import cat128 from "/src/assets/catpic7.jpg";
import cat256 from "/src/assets/catpic8.jpg";
import cat512 from "/src/assets/catpic9.jpg";
import cat1024 from "/src/assets/catpic10.jpg";
import cat2048 from "/src/assets/catpic11.jpg";

export const tileImageByValue: Record<number, string> = {
  2: cat2,
  4: cat4,
  8: cat8,
  16: cat16,
  32: cat32,
  64: cat64,
  128: cat128,
  256: cat256,
  512: cat512,
  1024: cat1024,
  2048: cat2048,
};

export function getTileImage(value: number): string | undefined {
  return tileImageByValue[value];
}
