import type { Metadata, ResolvingMetadata } from 'next';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import {
  getHomePageQuery,
  getPageQuery,
  settingsQuery,
  caseStudyQuery,
} from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
const DEFAULT_TITLE = 'Marvin Kiyingi';
const DEFAULT_DESCRIPTION = 'Default description';
const DEFAULT_IMAGE_URL = '/images/default-image.png';
const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 630;

const DEFAULT_IMAGE = {
  url: DEFAULT_IMAGE_URL,
  alt: 'Page',
  width: DEFAULT_IMAGE_WIDTH,
  height: DEFAULT_IMAGE_HEIGHT,
};

function getSeoField<T>(
  distributionMovie: T | undefined,
  pageValue: T | undefined,
  settingsValue: T | undefined,
  fallback: T
): T {
  return distributionMovie ?? pageValue ?? settingsValue ?? fallback;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  // Determine the page type based on the current route
  // This function is used by both /[slug] and /projects/[slug] routes
  const isHome = !slug || slug === '/';
  const isProjectPage = slug && !isHome; // If it's not home, it could be a project or regular page

  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
    'http://localhost:3000';

  // Always fetch settings
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  // Try to fetch as a case study first (for /projects/[slug] routes)
  let caseStudy = null;
  try {
    const { data } = await sanityFetch({
      query: caseStudyQuery,
      params: { slug },
    });
    caseStudy = data;
  } catch (error) {
    // If it's not a case study, continue to try as a regular page
  }

  // If it's not a case study, try as a regular page
  let page = null;
  if (!caseStudy) {
    if (isHome) {
      const { data } = await sanityFetch({
        query: getHomePageQuery,
        params: { slug: '/' },
      });
      page = data;
    } else {
      const { data } = await sanityFetch({
        query: getPageQuery,
        params: { slug },
      });
      page = data;
    }
  }

  const pageSeo = page?.seo;
  const caseStudySeo = caseStudy?.seo;
  const settingsSeo = settings?.seo;

  // Title
  const titleFromPage =
    caseStudy?.name || pageSeo?.metaTitle || page?.name || DEFAULT_TITLE;
  const fullTitle =
    titleFromPage && titleFromPage !== DEFAULT_TITLE
      ? `${titleFromPage} | ${settings?.title || DEFAULT_TITLE}`
      : DEFAULT_TITLE;

  // Description
  const caseStudyDescription = caseStudySeo?.metaDescription || undefined;
  const pageDescription = pageSeo?.metaDescription || undefined;
  const settingsDescription = settingsSeo?.metaDescription || undefined;

  const description = getSeoField(
    caseStudyDescription,
    pageDescription,
    settingsDescription,
    DEFAULT_DESCRIPTION
  );

  // Image
  const image =
    caseStudySeo?.metaImage?.media ||
    pageSeo?.metaImage?.media ||
    settingsSeo?.metaImage?.media;
  const ogImage =
    resolveOpenGraphImage(image, DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT) ||
    DEFAULT_IMAGE;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [ogImage, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: isHome
        ? `${baseUrl.replace(/\/$/, '')}/`
        : `${baseUrl.replace(/\/$/, '')}/${slug.replace(/^\/+/, '')}`,
    },
    other: {
      'og:site_name':
        caseStudy?.name ||
        page?.name ||
        settingsSeo?.metaTitle ||
        settings?.seo?.metaTitle ||
        DEFAULT_TITLE,
      'og:locale': 'en_US',
      'og:type': 'website',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': ogImage.alt,
      'og:image:secure_url': ogImage.url,
      'og:image:type': 'image/jpeg',
    },
  };
}
