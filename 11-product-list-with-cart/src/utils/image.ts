const images = import.meta.glob<{ default: string }>(
  '@/assets/images/*.jpg',
  { eager: true }
);

export const getImageUrl = (image: string) => {
  return images[`/src/assets/images/${image}`]?.default;
};
