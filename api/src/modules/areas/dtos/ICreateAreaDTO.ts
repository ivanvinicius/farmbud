export default interface ICreateAreaDTO {
  user_id: string;
  name: string;
  description?: string;
  size: number;
  latitude: number;
  longitude: number;
}
