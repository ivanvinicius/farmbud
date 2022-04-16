import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateClientService from '@modules/users/services/CreateClientService';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createClient = container.resolve(CreateClientService);

    const user = await createClient.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
