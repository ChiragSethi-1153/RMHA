import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ShippingLabel } from 'src/shipping/domain/shipping-label/shipping-label.entity';

@Injectable()
export class ShippingLabelRepository extends Repository<ShippingLabel> {
  constructor(dataSource: DataSource) {
    super(ShippingLabel, dataSource.createEntityManager());
  }

  async store(
    payload: any,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.save(ShippingLabel, payload);
    }
    return await this.save(payload);
  }
}
