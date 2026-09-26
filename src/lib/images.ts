/**
 * SAT Platform - Image registry
 *
 * Maps image identifiers used in questions (e.g. q.img) to base64-encoded
 * PNG data URIs. Currently empty — when geometry questions arrive, add
 * their figures here.
 *
 * Images should be PNGs (≤ 200 KB) base64-encoded as data URIs to avoid
 * any external file requests during testing.
 */

export const imageRegistry: Record<string, string> = {
  // Example:
  // 'triangle-45-45-90':
  //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
};

/**
 * Look up an image by id. Returns undefined if not found.
 */
export function getImage(id?: string): string | undefined {
  if (!id) return undefined;
  return imageRegistry[id];
}
