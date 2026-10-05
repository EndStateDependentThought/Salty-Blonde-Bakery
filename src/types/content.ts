import type { ImageMetadata } from 'astro';

export type ProductStatus = 'current' | 'seasonal' | 'returning-soon' | 'archive';

export interface BakeryImage {
  id: string;
  sourceFilename: string;
  src: ImageMetadata;
  alt: string;
  focalPoint: string;
  role: 'hero' | 'product' | 'process' | 'detail' | 'packaging' | 'people' | 'location';
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: 'rolls' | 'cookies' | 'packs';
  availabilityNote?: string;
  allergens?: string;
  imageId?: string;
}

export interface MenuCategory {
  id: 'rolls' | 'cookies' | 'packs' | 'rotating';
  name: string;
  intro: string;
}

export type BakeWallSize = 'wide' | 'tall' | 'square' | 'portrait' | 'landscape';

export interface BakeWallItem {
  imageId: string;
  size: BakeWallSize;
  className: string;
  note?: string;
}
