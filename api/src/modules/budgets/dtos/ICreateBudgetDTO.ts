export default interface ICreateBudgetDTO {
  user_id: string;
  provider_id: string;
  area_id: string;
  season_id: string;
  portfolio_id: string;
  amount_usage: number;
  amount_quantity: number;
  amount_cost: number;
}
