import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ListUserSeasonService from '@modules/seasons/services/ListUserSeasonService';
import CreateSeasonService from '@modules/seasons/services/CreateSeasonService';
import DeleteSeasonService from '@modules/seasons/services/DeleteSeasonService';
import UpdateSeasonService from '@modules/seasons/services/UpdateSeasonService';

export default class SeasonsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserSeasons = container.resolve(ListUserSeasonService);

    const userSeasons = await listUserSeasons.execute(user_id);

    return response.json(userSeasons);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, description, start_at, end_at } = request.body;

    const parsedStartAt = parseISO(start_at);
    const parsedEndAt = parseISO(end_at);

    const createSeasons = container.resolve(CreateSeasonService);

    const season = await createSeasons.execute({
      user_id,
      name,
      description,
      start_at: parsedStartAt,
      end_at: parsedEndAt,
    });

    return response.json({ season });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, description, start_at, end_at } = request.body;

    const parsedStartAt = parseISO(start_at);
    const parsedEndAt = parseISO(end_at);

    const updateSeason = container.resolve(UpdateSeasonService);

    const season = await updateSeason.execute({
      id,
      name,
      description,
      start_at: parsedStartAt,
      end_at: parsedEndAt,
    });

    return response.json(season);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSeason = container.resolve(DeleteSeasonService);

    await deleteSeason.execute(id);

    return response.status(200).json();
  }
}
