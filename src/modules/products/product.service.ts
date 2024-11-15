import { Injectable } from '@nestjs/common';
import { Product } from '../../models/product.model';
import { ProductDTO } from '../../dto/product.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      categoryId: 2,
      productName: 'Key board',
      price: 30000,
    },
    {
      id: 2,
      categoryId: 2,
      productName: 'TV',
      price: 50000,
    },
  ];
  getProducts(): Product[] {
    return this.products;
  }

  createProduct(productDTO: ProductDTO): Product {
    const product: Product = {
      id: Math.random(),
      ...productDTO,
    };
    this.products.push(product);
    return product;
  }

  detailProduct(id: number): Product {
    return this.products.find((product) => product.id === Number(id));
  }

  updateProduct(id: number, productDTO: ProductDTO): Product {
    const index = this.products.findIndex(
      (product) => product.id === Number(id),
    );
    this.products[index].categoryId = productDTO.categoryId;
    this.products[index].productName = productDTO.productName;
    this.products[index].price = productDTO.price;
    return { id: id, ...productDTO } as Product;
  }

  deleteProduct(id: number): string {
    const index = this.products.findIndex(
      (product) => product.id === Number(id),
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      return 'Xoa thanh cong!';
    }
    return 'Xoa that bai';
  }
}
