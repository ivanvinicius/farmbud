import { getRepository, IsNull, Repository } from 'typeorm';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import Address from '../entities/Address';

export default class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findAllStates(): Promise<Address[] | undefined> {
    return this.ormRepository.find({ where: { parent_id: IsNull() } });
  }

  public async findAllCitiesByState(
    parent_id: string,
  ): Promise<Address[] | undefined> {
    return this.ormRepository.find({ where: { parent_id } });
  }
}
