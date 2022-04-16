import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  address_id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    address_id,
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkProviderExist = await this.usersRepository.findByEmail(email);

    if (checkProviderExist) {
      throw new AppError('O E-mail informado já está em uso.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const provider = await this.usersRepository.create({
      address_id,
      name,
      email,
      password: hashedPassword,
      provider: true,
    });

    return provider;
  }
}
