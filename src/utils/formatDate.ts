/**
 * Formats an ISO date string to the Arabic (Iraq) locale used across public pages.
 */
export function formatArabicDate(iso: string): string {
	return new Date(iso).toLocaleDateString("ar-IQ", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
