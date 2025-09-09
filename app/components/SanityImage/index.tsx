import React from 'react';
import Image from 'next/image';
import {
  useNextSanityImage,
  UseNextSanityImageBuilder,
} from 'next-sanity-image';
import { client } from '@/sanity/lib/client-browser';
import {
  SanityImageAsset,
  SanityImageHotspot,
  SanityImageCrop,
  GetPageQueryResult,
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
  _type?: string;
} | null;

type SanityImageProps = {
  image: SanityImageSource;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  style?: React.CSSProperties;
  imageBuilder?: UseNextSanityImageBuilder;
};

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
  imageBuilder,
}: SanityImageProps) => {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder:
      imageBuilder ||
      ((imageUrlBuilder, options) => {
        return imageUrlBuilder
          .width(
            options.width ||
              Math.min(options.originalImageDimensions.width, 1920)
          )
          .quality(options.quality || quality)
          .fit('clip');
      }),
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
      />
    );
  }

  return (
    <Image
      {...imageProps}
      sizes={sizes}
      alt={image.alt || alt || ''}
      {...commonProps}
    />
  );
};

export default SanityImage;
