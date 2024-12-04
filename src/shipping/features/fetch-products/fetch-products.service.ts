import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { InformantProfileRepository } from 'src/infrastructure/repositories/informant-profile/informant-profile.repository';

@Injectable()
export class FetchProductsHandler {
  constructor() // @InjectRepository(InformantProfileRepository)
  // private readonly repository: InformantProfileRepository,
  {}

  public async handle() {
    // return await this.repository.listInformantProfile();
    console.log('fetch data');
  }
}
