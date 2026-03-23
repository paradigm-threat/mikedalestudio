export type GalleryItem = {
  src: string;
  title: string | null;
  alt: string;
};

export type GalleryFile = {
  section: string;
  items: GalleryItem[];
};
