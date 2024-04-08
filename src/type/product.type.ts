export interface IProductImage {
  base_url: string;
  is_gallery: boolean;
  label: null;
  large_url: string;
  medium_url: string;
  position: null;
  small_url: string;
  thumbnail_url: string;
}

export interface ISpecifications {
  name: string;
  attributes: {
    code: string;
    name: string;
    value: string;
  }[];
}
