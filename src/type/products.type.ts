export interface IProduct {
  categoryId: string;

  description: string;
  image: string;
  name: string;
  price: string;

  id: string;
}

export interface IDataResponseProduct {
  docs: IProduct[];
}
