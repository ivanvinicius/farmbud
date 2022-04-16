import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateClientService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkClientExist = await this.usersRepository.findByEmail(email);

    if (checkClientExist) {
      throw new AppError('O E-mail informado já está em uso.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const client = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      provider: false,
    });

    return client;
  }
}
