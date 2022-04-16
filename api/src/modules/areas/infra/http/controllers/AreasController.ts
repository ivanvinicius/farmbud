import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAreaService from '@modules/areas/services/ListUserAreaService';
import CreateAreaService from '@modules/areas/services/CreateAreaService';
import DeleteAreaService from '@modules/areas/services/DeleteAreaService';
import UpdateAreaService from '@modules/areas/services/UpdateAreaService';

export default class AreasController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserAreas = container.resolve(ListUserAreaService);

    const userAreas = await listUserAreas.execute(user_id);

    return response.json(userAreas);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, description, size, latitude, longitude } = request.body;

    const createArea = container.resolve(CreateAreaService);

    const area = await createArea.execute({
      user_id,
      name,
      description,
      size,
      latitude,
      longitude,
    });

    return response.json(area);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, description, size, latitude, longitude } = request.body;

    const updateArea = container.resolve(UpdateAreaService);

    const area = await updateArea.execute({
      id,
      name,
      description,
      size,
      latitude,
      longitude,
    });

    return response.json(area);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteArea = container.resolve(DeleteAreaService);

    await deleteArea.execute(id);

    return response.status(200).json();
  }
}
