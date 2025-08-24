import createImageUrlBuilder from '@sanity/image-url';
import { Link, SanityImageCrop } from '@/sanity.types';
import { dataset, projectId, studioUrl } from '@/sanity/env';
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity';
import { getImageDimensions } from '@sanity/asset-utils';

// Type for Sanity image objects
type SanityImage = {
  asset?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  media?: unknown;
  hotspot?: {
    _type: 'sanity.imageHotspot';
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  crop?: SanityImageCrop;
  alt?: string;
  metadataBase?: string;
  _type: 'image';
};

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: SanityImage) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const crop = source.crop;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  if (crop) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(
      width * (1 - ((crop.right || 0) + (crop.left || 0)))
    );

    const croppedHeight = Math.floor(
      height * (1 - ((crop.top || 0) + (crop.bottom || 0)))
    );

    // compute the cropped image's position
    const left = Math.floor(width * (crop.left || 0));
    const top = Math.floor(height * (crop.top || 0));

    // gather into a url
    return imageBuilder
      ?.image(source)
      .rect(left, top, croppedWidth, croppedHeight)
      .auto('format');
  }

  return imageBuilder?.image(source).auto('format');
};

export function resolveOpenGraphImage(
  image: SanityImage | null | undefined,
  width = 1200,
  height = 627
) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, case study, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null;

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href';
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null;
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${link.page}`;
      }
    case 'caseStudy':
      if (link?.caseStudy && typeof link.caseStudy === 'string') {
        return `/projects/${link.caseStudy}`;
      }
    default:
      return null;
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
