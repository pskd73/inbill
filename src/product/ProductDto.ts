import {Product} from "./ProductService";

export class ProductDto {
  id: string;
  name: string;
  storeId: string;
  price: number;

  static convert(products: Product[]): ProductDto[] {
    return products.map(product => new ProductDto(product));
  }

  constructor(product: Product) {
    this.id = product._id;
    this.name = product.name;
    this.storeId = product.storeId;
    this.price = product.price
  }
}