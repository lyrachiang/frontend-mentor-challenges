const images = import.meta.glob<{ default: string }>(
  '@/assets/images/*.webp',
  { eager: true }
);

export const getImageUrl = (image: string) => {
  return images[`/src/assets/images/${image}`]?.default;
};
