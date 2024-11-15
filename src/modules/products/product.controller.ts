import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { RepsonData } from '../../global/globalClass';
import { HttpMessage, HttpStatus } from '../../global/globalEnum';
import { Product } from '../../models/product.model';
import { ProductDTO } from '../../dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProducts(): RepsonData<Product[]> {
    try {
      return new RepsonData<Product[]>(
        this.productService.getProducts(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log('get Products: ' + error);
      return new RepsonData<Product[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  createProduct(
    @Body(new ValidationPipe()) productDTO: ProductDTO,
  ): RepsonData<Product> {
    try {
      return new RepsonData<ProductDTO>(
        this.productService.createProduct(productDTO),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new RepsonData<Product>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:id')
  detailProduct(@Param('id') id: number): RepsonData<Product> {
    try {
      return new RepsonData<Product>(
        this.productService.detailProduct(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new RepsonData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body(new ValidationPipe()) productDTO: ProductDTO,
  ): RepsonData<Product> {
    try {
      return new RepsonData<Product>(
        this.productService.updateProduct(id, productDTO),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new RepsonData<Product>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number): RepsonData<string> {
    try {
      return new RepsonData<string>(
        this.productService.deleteProduct(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new RepsonData<string>(error, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
