export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const matchStringsIgnoreCase = (str1: string, str2: string): boolean => {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
};

export const isValidUsername = (str: string): boolean => {
  return /^[^\.#$\[\]]+$/.test(str);
};

export const hasEmptyValues = (questions: object) => {
  return Object.values(questions).some((value) => value.trim() === "");
};
