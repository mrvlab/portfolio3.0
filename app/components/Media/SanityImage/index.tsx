import React from 'react';
import Image, { type ImageProps } from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client-browser';
import {
  SanityImageAsset,
  SanityImageHotspot,
  SanityImageCrop,
} from '@/sanity.types';

// Create a more flexible asset type that matches the query result
type FlexibleSanityImageAsset = Omit<SanityImageAsset, 'metadata'> & {
  metadata?: SanityImageAsset['metadata'] | null;
};

type SanityImageSource = {
  asset?: FlexibleSanityImageAsset | { _ref: string; _type: string } | null;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
  alt?: string | null;
  imageQuality?: number | null;
  imageBrightness?: number | null;
  _type?: string;
} | null;

type SanityImageProps = {
  image: SanityImageSource;
} & Pick<
  ImageProps,
  | 'className'
  | 'sizes'
  | 'priority'
  | 'quality'
  | 'fill'
  | 'objectFit'
  | 'style'
  | 'alt'
>;

const SanityImage = ({
  image,
  alt,
  className,
  sizes = '(max-width: 800px) 100vw, 800px',
  priority = false,
  quality = 75,
  fill = false,
  objectFit = 'cover',
  style,
}: SanityImageProps) => {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      // Use imageQuality from image object if available, otherwise fall back to component quality prop
      const finalQuality =
        image?.imageQuality ||
        options.quality ||
        (typeof quality === 'string' ? parseInt(quality) : quality);

      return imageUrlBuilder
        .width(
          options.width || Math.min(options.originalImageDimensions.width, 1920)
        )
        .quality(finalQuality)
        .fit('clip');
    },
  });

  if (!image?.asset || !imageProps) {
    return null;
  }

  const lqip =
    'metadata' in image.asset ? image.asset.metadata?.lqip : undefined;

  const commonProps = {
    className,
    priority,
    style,
    ...(lqip && { placeholder: 'blur' as const, blurDataURL: lqip }),
  };

  if (fill) {
    return (
      <Image
        src={imageProps.src}
        loader={imageProps.loader}
        fill
        objectFit={objectFit}
        alt={image.alt || alt || ''}
        {...commonProps}
        style={{ ...style, filter: `brightness(${image.imageBrightness}%)` }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      sizes={sizes}
      alt={image.alt || alt || ''}
      {...commonProps}
      style={{ ...style, filter: `brightness(${image.imageBrightness}%)` }}
    />
  );
};

export default SanityImage;
