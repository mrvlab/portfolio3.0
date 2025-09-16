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
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw',

  priority = false,
  quality = 75,
  fill = false,
  style,
}: SanityImageProps) => {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      const finalQuality =
        image?.imageQuality ||
        (typeof quality === 'string' ? parseInt(quality) : quality);

      // Use the requested width or cap at reasonable maximum
      const optimalWidth = options.width || 1920;

      return imageUrlBuilder
        .width(optimalWidth)
        .quality(finalQuality)
        .format('webp')
        .fit('crop');
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
        alt={image.alt || alt || ''}
        {...commonProps}
        style={{
          ...style,
          ...(image.imageBrightness &&
            image.imageBrightness !== 100 &&
            image.imageBrightness !== undefined && {
              filter: `brightness(${image.imageBrightness}%)`,
            }),
        }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      sizes={sizes}
      alt={image.alt || alt || ''}
      {...commonProps}
      style={{
        ...style,
        ...(image.imageBrightness &&
          image.imageBrightness !== 100 &&
          image.imageBrightness !== undefined && {
            filter: `brightness(${image.imageBrightness}%)`,
          }),
      }}
    />
  );
};

export default SanityImage;
