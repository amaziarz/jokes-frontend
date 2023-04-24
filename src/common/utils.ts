import dayjs from 'dayjs';

export const LIST_DATE_FORMAT = 'DD MMM YYYY';
export const ISO_DATE_FORMAT = 'YYYY-MM-DD';

export function formatDate(date: string, format = ISO_DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatEmail(value: string): string {
  if (!value.includes('@')) {
    return value;
  }
  const [name, domain] = value.split('@');
  const [, ...suffixParts] = domain.split('.');
  const suffix = suffixParts.join('.');

  return `${name}@***.${suffix}`;
}

interface QueryParam {
  key: string;
  value: unknown;
}

export function toQueryString(queryParams: QueryParam[]): string {
  return queryParams
    .filter(({ value }) => value || value === 0)
    .map(({ key, value }) => `${key}=${value}`)
    .join('&');
}

export function debounce<T extends unknown[], U = void>(
  fn: (...args: T) => U,
  delay = 500,
) {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
