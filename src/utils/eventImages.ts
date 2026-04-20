interface EventWithImages {
  images?: Array<{ image_url: string }> | null;
}

/**
 * Normalizes event image payloads and returns only non-empty URLs.
 * This guards UI rendering against malformed or partially missing image records.
 */
export function getEventImageUrls(event: EventWithImages): string[] {
  return (event.images ?? [])
    .map((image) => image.image_url)
    .filter((url) => typeof url === "string" && url.trim().length > 0);
}

/**
 * Returns the first available event image so cards/details can render a stable cover.
 */
export function getPrimaryEventImage(event: EventWithImages): string | null {
  const [firstImage] = getEventImageUrls(event);
  return firstImage ?? null;
}
