export default interface IPortfolioProps {
  id: string;
  price: string;
  size: string;
  formatted_price: string | null;
  formatted_size: string | null;
  provider_id: string;
  product_id: string;
  product_name: string;
  product_composition: string;
  brand_id: string;
  brand_name: string;
  measure_id: string;
  measure_name: string;
  category_id: string;
  category_name: string;
  subcategory_id: string;
  subcategory_name: string;
  formatted_category: string | null;
}
