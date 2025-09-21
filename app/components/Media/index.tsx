import React from 'react';
import SanityImage from './SanityImage';
import MuxVideo from './MuxVideo';
import { MediaType, MuxVideoAsset } from '@/sanity.types';
import { type ImageProps } from 'next/image';

// Use a union type that covers all possible media inputs
// This eliminates the need for a custom ResolvedMediaType
// We use 'unknown' to allow resolved media from queries that may not have _type field
type MediaProps = {
  media: MediaType | MuxVideoAsset | unknown | null;
  dataSanity?: string;
  videoObjectFitCover?: boolean;
} & Pick<
  ImageProps,
  | 'className'
  | 'priority'
  | 'sizes'
  | 'quality'
  | 'fill'
  | 'objectFit'
  | 'style'
  | 'alt'
>;

const Media = ({
  media,
  alt,
  className,
  priority = false,
  sizes,
  quality,
  fill = false,
  style,
  dataSanity,
  videoObjectFitCover = false,
}: MediaProps) => {
  if (!media) return null;

  // Type guard to check if media has the structure we expect
  const isMediaType = (m: unknown): m is MediaType => {
    return (
      typeof m === 'object' &&
      m !== null &&
      '_type' in m &&
      (m as Record<string, unknown>)._type === 'mediaType'
    );
  };

  // Type guard for resolved media (from queries)
  const isResolvedMedia = (m: unknown): m is Record<string, unknown> => {
    return (
      typeof m === 'object' && m !== null && ('type' in m || 'mediaType' in m)
    );
  };

  // Handle MuxVideoAsset directly
  if (typeof media === 'object' && media !== null && 'playbackId' in media) {
    const videoAsset = media as MuxVideoAsset;
    if (videoAsset.playbackId) {
      return (
        <MuxVideo
          playbackId={videoAsset.playbackId}
          aspectRatio={videoAsset.data?.aspect_ratio}
          className={className}
          videoObjectFitCover={videoObjectFitCover}
        />
      );
    }
  }

  // Handle MediaType (unresolved)
  if (isMediaType(media)) {
    const mediaType = media.mediaType;
    const isVideo = mediaType === 'video';

    // Handle video
    if (isVideo && media.video?.asset) {
      // Check if asset is resolved (has playbackId) or is a reference
      if ('playbackId' in media.video.asset) {
        const asset = media.video.asset as Record<string, unknown>;
        return (
          <MuxVideo
            playbackId={asset.playbackId as string}
            aspectRatio={
              (asset.data as Record<string, unknown>)?.aspect_ratio as string
            }
            className={className}
            videoObjectFitCover={videoObjectFitCover}
          />
        );
      }
      // If it's a reference, we can't render it directly
      console.warn('Video asset reference not resolved');
      return null;
    }

    // Handle image
    if (media.image?.asset) {
      // Check if asset is resolved (has _id) or is a reference
      if ('_id' in media.image.asset) {
        return (
          <SanityImage
            image={media.image as Parameters<typeof SanityImage>[0]['image']}
            alt={media.image.alt || alt || 'Media content'}
            className={className}
            priority={priority}
            sizes={sizes}
            quality={quality}
            fill={fill}
            style={style}
            dataSanity={dataSanity}
          />
        );
      }
      // If it's a reference, we can't render it directly
      console.warn('Image asset reference not resolved');
      return null;
    }
  }

  // Handle resolved media (from queries - no _type field)
  if (isResolvedMedia(media)) {
    const mediaType = media.mediaType || media.type;
    const isVideo = mediaType === 'video';

    // Handle video
    if (
      isVideo &&
      media.video &&
      typeof media.video === 'object' &&
      media.video !== null &&
      'asset' in media.video
    ) {
      const videoAsset = media.video.asset as Record<string, unknown>;
      if (videoAsset?.playbackId && typeof videoAsset.playbackId === 'string') {
        return (
          <MuxVideo
            playbackId={videoAsset.playbackId}
            aspectRatio={
              (videoAsset.data as Record<string, unknown>)
                ?.aspect_ratio as string
            }
            className={className}
            videoObjectFitCover={videoObjectFitCover}
          />
        );
      }
    }

    // Handle image
    if (
      media.image &&
      typeof media.image === 'object' &&
      media.image !== null &&
      'asset' in media.image
    ) {
      const imageData = media.image as Record<string, unknown>;
      return (
        <SanityImage
          image={imageData as Parameters<typeof SanityImage>[0]['image']}
          alt={(imageData.alt as string) || alt || 'Media content'}
          className={className}
          priority={priority}
          sizes={sizes}
          quality={quality}
          fill={fill}
          style={style}
          dataSanity={dataSanity}
        />
      );
    }
  }

  return null;
};

export default Media;
