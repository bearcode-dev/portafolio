import { format, formatDistance, isValid, parseISO } from 'date-fns';

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @param formatStr - Format string (default: 'MMM d, yyyy')
 * @returns Formatted date string or empty string if invalid
 */
export function formatDate(dateString: string | Date | null | undefined, formatStr: string = 'MMM d, yyyy'): string {
  if (!dateString) return '';

  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return '';
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Format a date to show relative time (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export function formatRelativeDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return '';

  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return '';
    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return '';
  }
}

/**
 * Format a date for display in tables (short format)
 * @param dateString - ISO date string
 * @returns Short formatted date (e.g., "Dec 8, 2025")
 */
export function formatTableDate(dateString: string | Date | null | undefined): string {
  return formatDate(dateString, 'MMM d, yyyy');
}

/**
 * Format a date for forms (ISO format for input[type="date"])
 * @param dateString - ISO date string
 * @returns Date in YYYY-MM-DD format
 */
export function formatFormDate(dateString: string | Date | null | undefined): string {
  return formatDate(dateString, 'yyyy-MM-dd');
}
