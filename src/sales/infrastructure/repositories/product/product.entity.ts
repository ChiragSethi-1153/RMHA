import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductSales } from 'src/sales/domain/product/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductSales> {
  constructor(dataSource: DataSource) {
    super(ProductSales, dataSource.createEntityManager());
  }

  async storeProduct(payload: any, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.save(ProductSales, payload);
    }
    return await this.save(payload);
  }

  async getProduct(id: string) {
    const product = await this.findOne({ where: { product_id: id } });
    return product;
  }
}
