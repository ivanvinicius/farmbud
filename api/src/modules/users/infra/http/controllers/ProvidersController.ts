import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProviderService from '@modules/users/services/CreateProviderService';

export default class ProvidersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { address_id, name, email, password } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      address_id,
      name,
      email,
      password,
    });

    return response.json(classToClass(provider));
  }
}
