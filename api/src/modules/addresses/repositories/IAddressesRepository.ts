import Address from '../infra/typeorm/entities/Address';

export default interface IAddressesRepository {
  findAllStates(): Promise<Address[] | undefined>;
  findAllCitiesByState(parent_id: string): Promise<Address[] | undefined>;
}
