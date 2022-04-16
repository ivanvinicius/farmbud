import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import Portfolio from '../infra/typeorm/entities/Portfolio';
import ICreateProviderCompositionDTO from '../dtos/ICreateProviderCompositionDTO';
import IFindProviderCompositionAvoidDuplicateDTO from '../dtos/IFindProviderCompositionAvoidDuplicateDTO';
import IFindAllByProviderCultureProductivityDTO from '../dtos/IFindAllByProviderCultureProductivityDTO';
import IFindProvidersAvailableCompositionsDTO from '../dtos/IFindProvidersAvailableCompositionsDTO';

export default interface ICompositionsRepository {
  findById(id: string): Promise<Portfolio | undefined>;
  findProviderCompositionAvoidDuplicate(
    data: IFindProviderCompositionAvoidDuplicateDTO,
  ): Promise<Portfolio | undefined>;
  findAllByProviderCultureProductivity(
    data: IFindAllByProviderCultureProductivityDTO,
  ): Promise<Portfolio[] | undefined>;
  findProvidersAvailableCompositions(
    data: IFindProvidersAvailableCompositionsDTO,
  ): Promise<Portfolio[] | undefined>;
  findAllGroupByCultureProductivity(
    provider_id: string,
  ): Promise<Portfolio[] | undefined>;

  create(
    data: ICreateProviderCompositionDTO[],
  ): Promise<Portfolio[] | undefined>;
  delete(ids: Array<string>): Promise<IDeleteDTO>;
}
