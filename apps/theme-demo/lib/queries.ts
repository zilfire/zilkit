import { client } from "./sanity";

// GROQ queries
export const settingsQuery = `
  *[_type == "settings"][0] {
    title,
    description,
    primaryColor,
    logo
  }
`;

export const pagesQuery = `
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug,
    content,
    seo
  }
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    seo
  }
`;

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    tags
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    publishedAt,
    tags
  }
`;

// Fetch functions
export async function getSettings() {
  return await client.fetch(settingsQuery);
}

export async function getPages() {
  return await client.fetch(pagesQuery);
}

export async function getPageBySlug(slug: string) {
  return await client.fetch(pageBySlugQuery, { slug });
}

export async function getPosts() {
  return await client.fetch(postsQuery);
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(postBySlugQuery, { slug });
}
