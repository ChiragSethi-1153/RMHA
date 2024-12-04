import { Injectable } from '@nestjs/common';
import { ShippingProduct } from 'src/shipping/domain/product/product.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends Repository<ShippingProduct> {
  constructor(dataSource: DataSource) {
    super(ShippingProduct, dataSource.createEntityManager());
  }

  async storeProduct(
    payload: any,
    transaction: EntityManager = null,
  ) {
    console.log(payload)
    if (transaction) {
      return await transaction.save(ShippingProduct, payload);
    }

    return await this.save(payload);

  }

  async getProductById(productId: string, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.findOneBy(ShippingProduct, { product_id: productId });
    }
    return await this.findOneBy({
      product_id: productId,
    });
  }

  async updateProduct(productId: string, payload: any, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.update(ShippingProduct, { product_id: productId }, payload);
    }
    return await this.update({ product_id: productId }, payload);
  }

}
