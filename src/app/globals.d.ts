// Define the language type for the application
export type Language = 'en' | 'zh';

// Define the property data interface
export interface PropertyData {
  id: number;
  area: string;
  price: string;
  size: string;
  image: string;
  titleEn: string;
  titleZh: string;
  priceValue: string;
  address: string;
  addressEn?: string; // Optional English address
  pingSize: string;
  rooms: string;
  parking: string;
  floor: string;
  descriptionEn: string;
  descriptionZh: string;
}