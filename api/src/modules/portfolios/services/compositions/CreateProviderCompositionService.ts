import { inject, injectable } from 'tsyringe';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  culture_id: string;
  productivity: number;
  items: [
    {
      parent_id: string;
      recommendation: number;
    },
  ];
}

@injectable()
export default class CreateProviderCompositionsService {
  constructor(
    @inject('CompositionsRepository')
    private compositionsRepository: ICompositionsRepository,
  ) {}

  public async execute({
    provider_id,
    culture_id,
    productivity,
    items,
  }: IRequest): Promise<Portfolio[] | undefined> {
    const compositionExists = await this.compositionsRepository.findProviderCompositionAvoidDuplicate(
      {
        provider_id,
        culture_id,
        productivity,
      },
    );

    if (compositionExists) {
      throw new AppError(
        'Já existe uma composição criada para a cultura/produtos/produtividade informada.',
        400,
      );
    }

    const formattedItems = items.map(item => ({
      ...item,
      provider_id,
      culture_id,
      productivity,
    }));

    return this.compositionsRepository.create(formattedItems);
  }
}
