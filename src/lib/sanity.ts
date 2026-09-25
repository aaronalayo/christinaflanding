import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export type ArtworkCategory = 'kunst' | 'uld';

export type Artwork = {
  _id: string;
  title: string;
  category: ArtworkCategory;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
    };
  };
};

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityConfigured = Boolean(projectId);

const client = createClient({
  projectId: projectId || 'missing-project-id',
  dataset,
  apiVersion: '2026-09-25',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function artworkImageUrl(image: Artwork['image']) {
  if (!image?.asset?._ref) {
    return undefined;
  }

  return builder.image(image).width(1400).auto('format').url();
}

export async function getArtwork(category: ArtworkCategory) {
  if (!sanityConfigured) {
    return [];
  }

  return client.fetch<Artwork[]>(
    `*[_type == "artwork" && category == $category] | order(order asc, _createdAt desc) {
      _id,
      title,
      category,
      description,
      image
    }`,
    { category },
  );
}
