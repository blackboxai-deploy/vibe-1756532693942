import { Country } from '../types/calculator';

export const africanCountries: Country[] = [
  // North Africa
  { code: 'DZ', name: 'Algeria', region: 'North Africa', educationSystems: ['BAC'] },
  { code: 'EG', name: 'Egypt', region: 'North Africa', educationSystems: ['THANAWIYA_AMMA'] },
  { code: 'LY', name: 'Libya', region: 'North Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'MA', name: 'Morocco', region: 'North Africa', educationSystems: ['BAC'] },
  { code: 'SD', name: 'Sudan', region: 'North Africa', educationSystems: ['SUDAN_CERTIFICATE'] },
  { code: 'TN', name: 'Tunisia', region: 'North Africa', educationSystems: ['BAC'] },

  // West Africa
  { code: 'BJ', name: 'Benin', region: 'West Africa', educationSystems: ['WAEC', 'BAC'] },
  { code: 'BF', name: 'Burkina Faso', region: 'West Africa', educationSystems: ['BAC'] },
  { code: 'CV', name: 'Cape Verde', region: 'West Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'CI', name: 'Côte d\'Ivoire', region: 'West Africa', educationSystems: ['BAC', 'WAEC'] },
  { code: 'GM', name: 'Gambia', region: 'West Africa', educationSystems: ['WAEC', 'GABECE'] },
  { code: 'GH', name: 'Ghana', region: 'West Africa', educationSystems: ['WAEC', 'GBCE'] },
  { code: 'GN', name: 'Guinea', region: 'West Africa', educationSystems: ['BAC'] },
  { code: 'GW', name: 'Guinea-Bissau', region: 'West Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'LR', name: 'Liberia', region: 'West Africa', educationSystems: ['WAEC'] },
  { code: 'ML', name: 'Mali', region: 'West Africa', educationSystems: ['BAC'] },
  { code: 'MR', name: 'Mauritania', region: 'West Africa', educationSystems: ['BAC'] },
  { code: 'NE', name: 'Niger', region: 'West Africa', educationSystems: ['BAC'] },
  { code: 'NG', name: 'Nigeria', region: 'West Africa', educationSystems: ['WAEC', 'NECO', 'NABTEB'] },
  { code: 'SN', name: 'Senegal', region: 'West Africa', educationSystems: ['BAC'] },
  { code: 'SL', name: 'Sierra Leone', region: 'West Africa', educationSystems: ['WAEC'] },
  { code: 'TG', name: 'Togo', region: 'West Africa', educationSystems: ['BAC'] },

  // Central Africa
  { code: 'AO', name: 'Angola', region: 'Central Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'CM', name: 'Cameroon', region: 'Central Africa', educationSystems: ['GCE', 'BAC', 'PROBATOIRE'] },
  { code: 'CF', name: 'Central African Republic', region: 'Central Africa', educationSystems: ['BAC'] },
  { code: 'TD', name: 'Chad', region: 'Central Africa', educationSystems: ['BAC'] },
  { code: 'CG', name: 'Congo', region: 'Central Africa', educationSystems: ['BAC'] },
  { code: 'CD', name: 'Democratic Republic of the Congo', region: 'Central Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'GQ', name: 'Equatorial Guinea', region: 'Central Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'GA', name: 'Gabon', region: 'Central Africa', educationSystems: ['BAC'] },
  { code: 'ST', name: 'São Tomé and Príncipe', region: 'Central Africa', educationSystems: ['SECONDARY_EDUCATION'] },

  // East Africa
  { code: 'BI', name: 'Burundi', region: 'East Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'KM', name: 'Comoros', region: 'East Africa', educationSystems: ['BAC'] },
  { code: 'DJ', name: 'Djibouti', region: 'East Africa', educationSystems: ['BAC'] },
  { code: 'ER', name: 'Eritrea', region: 'East Africa', educationSystems: ['ERITREAN_CERTIFICATE'] },
  { code: 'ET', name: 'Ethiopia', region: 'East Africa', educationSystems: ['EHEECE'] },
  { code: 'KE', name: 'Kenya', region: 'East Africa', educationSystems: ['KCSE'] },
  { code: 'MG', name: 'Madagascar', region: 'East Africa', educationSystems: ['BAC'] },
  { code: 'MW', name: 'Malawi', region: 'East Africa', educationSystems: ['MSCE'] },
  { code: 'MU', name: 'Mauritius', region: 'East Africa', educationSystems: ['HSC', 'CAMBRIDGE'] },
  { code: 'MZ', name: 'Mozambique', region: 'East Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'RW', name: 'Rwanda', region: 'East Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'SC', name: 'Seychelles', region: 'East Africa', educationSystems: ['CAMBRIDGE'] },
  { code: 'SO', name: 'Somalia', region: 'East Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'SS', name: 'South Sudan', region: 'East Africa', educationSystems: ['SECONDARY_EDUCATION'] },
  { code: 'TZ', name: 'Tanzania', region: 'East Africa', educationSystems: ['NECTA'] },
  { code: 'UG', name: 'Uganda', region: 'East Africa', educationSystems: ['UNEB'] },
  { code: 'ZM', name: 'Zambia', region: 'East Africa', educationSystems: ['ECZ'] },
  { code: 'ZW', name: 'Zimbabwe', region: 'East Africa', educationSystems: ['ZIMSEC'] },

  // Southern Africa
  { code: 'BW', name: 'Botswana', region: 'Southern Africa', educationSystems: ['BGCSE'] },
  { code: 'SZ', name: 'Eswatini', region: 'Southern Africa', educationSystems: ['SGCSE'] },
  { code: 'LS', name: 'Lesotho', region: 'Southern Africa', educationSystems: ['COSC'] },
  { code: 'NA', name: 'Namibia', region: 'Southern Africa', educationSystems: ['NSSC'] },
  { code: 'ZA', name: 'South Africa', region: 'Southern Africa', educationSystems: ['NSC', 'IEB'] },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return africanCountries.find(country => country.code === code);
};

export const getCountriesByRegion = (region: string): Country[] => {
  return africanCountries.filter(country => country.region === region);
};

export const getAllRegions = (): string[] => {
  return Array.from(new Set(africanCountries.map(country => country.region)));
};