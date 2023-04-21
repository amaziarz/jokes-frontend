import dayjs from 'dayjs';

const DATE_FORMAT = 'DD MMM YYYY';

export function formatDate(date: string) {
  return dayjs(date).format(DATE_FORMAT);
}

export function formatEmail(email: string) {
  const [name, domain] = email.split('@');
  const [, ...suffixParts] = domain.split('.');
  const suffix = suffixParts.join('.');

  return `${name}@***.${suffix}`;
}
