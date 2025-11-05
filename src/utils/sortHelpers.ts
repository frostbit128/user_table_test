export const normalizePhoneNumber = (phone: string): number => {
  const digitsOnly = phone.replace(/\D/g, '');
  return parseInt(digitsOnly, 10) || 0;
};

