export default interface ICreateSeasonDTO {
  user_id: string;
  name: string;
  description?: string;
  start_at: Date;
  end_at: Date;
}
