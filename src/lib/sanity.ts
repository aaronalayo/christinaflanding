import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export type ArtworkCategory = 'kunst' | 'uld';
export type ArtworkGroup = 'spiritual-art' | 'christmas' | 'nature';

export type ServiceSection = {
  _key: string;
  heading?: string;
  text?: string;
  bulletPoints?: string[];
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tagline?: string;
  image?: Artwork['image'];
  sections?: ServiceSection[];
  duration?: string;
  price?: string;
};

export type Artwork = {
  _id: string;
  title: string;
  category: ArtworkCategory;
  group?: ArtworkGroup;
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
      group,
      description,
      image
    }`,
    { category },
  );
}

export async function getServices() {
  if (!sanityConfigured) {
    return [];
  }

  return client.fetch<Service[]>(
    `*[_type == "service" && active == true] | order(order asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      tagline,
      image,
      duration,
      price
    }`,
  );
}

export async function getService(slug: string) {
  if (!sanityConfigured) {
    return null;
  }

  return client.fetch<Service | null>(
    `*[_type == "service" && active == true && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      summary,
      tagline,
      image,
      sections[] {
        _key,
        heading,
        text,
        bulletPoints
      },
      duration,
      price
    }`,
    {slug},
  );
}
