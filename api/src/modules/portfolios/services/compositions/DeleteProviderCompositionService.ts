import { inject, injectable } from 'tsyringe';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';
import AppError from '@shared/errors/AppError';
import IDeleteDTO from '@shared/dtos/IDeleteDTO';

interface IRequest {
  provider_id: string;
  culture_id: string;
  productivity: number;
}
@injectable()
export default class DeleteProviderCompositionService {
  constructor(
    @inject('CompositionsRepository')
    private compositionsRepository: ICompositionsRepository,
  ) {}

  public async execute({
    provider_id,
    culture_id,
    productivity,
  }: IRequest): Promise<IDeleteDTO> {
    const compositionsExists = await this.compositionsRepository.findAllByProviderCultureProductivity(
      {
        provider_id,
        culture_id,
        productivity,
      },
    );

    if (compositionsExists?.length === 0 || !compositionsExists) {
      throw new AppError('A composição não foi encontrada.', 400);
    }

    const ids: Array<string> = [];

    compositionsExists.map((composition: Portfolio) =>
      ids.push(composition.id),
    );

    const deletedCompositions = await this.compositionsRepository.delete(ids);

    if (deletedCompositions.affected === 0) {
      throw new AppError('Impossível deletar o item.', 400);
    }

    return deletedCompositions;
  }
}
