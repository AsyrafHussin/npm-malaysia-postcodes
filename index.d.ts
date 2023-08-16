declare module "malaysia-postcodes" {
  export interface PostcodeResult {
    found: boolean;
    state?: string;
    city?: string;
  }

  export const allPostcodes: any[];
  export function getStates(): string[];
  export function getCities(state: string): string[];
  export function getPostcodes(state: string, city: string): string[];
  export function findPostcode(postcode: string): PostcodeResult;
}
