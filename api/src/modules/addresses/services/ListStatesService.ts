import { inject, injectable } from 'tsyringe';

import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

@injectable()
export default class ListStatesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(): Promise<Address[] | undefined> {
    return this.addressesRepository.findAllStates();
  }
}
