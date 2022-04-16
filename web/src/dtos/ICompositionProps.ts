export default interface ICompositionProps {
  brand_id: string;
  brand_name: string;
  category_id: string;
  category_name: string;
  culture_id: string;
  culture_name: string;
  id: string;
  measure_id: string;
  measure_name: string;
  price: string;
  formatted_price: number | undefined;
  product_id: string;
  product_name: string;
  productivity: string;

  provider_id: string;
  provider_name: string;
  recommendation: string;
  formatted_recommendation: number | undefined;
  size: string;
  formatted_size: number | undefined;
  subcategory_id: string;
  subcategory_name: string;

  total: {
    units: number;
    price: number;
  };
}
