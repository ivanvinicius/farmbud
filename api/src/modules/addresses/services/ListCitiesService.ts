import { inject, injectable } from 'tsyringe';

import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
  parent_id: string;
}

@injectable()
export default class ListCitiesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    parent_id,
  }: IRequest): Promise<Address[] | undefined> {
    return this.addressesRepository.findAllCitiesByState(parent_id);
  }
}
