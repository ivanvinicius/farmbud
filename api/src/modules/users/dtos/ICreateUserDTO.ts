export default interface ICreateUserDTO {
  address_id?: string;
  name: string;
  email: string;
  password: string;
  provider: boolean;
}
