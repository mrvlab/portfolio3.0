import { createBlurUp } from '@mux/blurup';

export interface BlurUpResult {
  blurDataURL: string;
  aspectRatio: string;
}

/**
 * Generate a blur placeholder Data URL for a Mux video
 * @param playbackId - The Mux playback ID
 * @param options - Optional configuration for the blur generation
 * @returns Promise with blurDataURL and aspectRatio
 */
export async function generateMuxBlurPlaceholder(
  playbackId: string,
  options?: Parameters<typeof createBlurUp>[1]
): Promise<BlurUpResult> {
  try {
    const { blurDataURL, aspectRatio } = await createBlurUp(
      playbackId,
      options
    );
    return {
      blurDataURL,
      aspectRatio: aspectRatio.toString(),
    };
  } catch (error) {
    console.error('Failed to generate Mux blur placeholder:', error);
    // Return a fallback placeholder
    return {
      blurDataURL:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 9"><rect width="100%" height="100%" fill="%23f3f4f6"/></svg>',
      aspectRatio: '16/9',
    };
  }
}
