/** Single source of truth for Akshat's identity. Every section (landing, about,
 *  terminal) reads from here so the name, CGPA, etc. can never drift apart. */
export const PROFILE = {
  fullName: 'Akshat Sinha',
  firstName: 'Akshat',
  lastName: 'Sinha',
  cgpa: '8.88',
  university: 'VIT Vellore',
  email: 'akshatsinhasramhardy@gmail.com',
} as const;
