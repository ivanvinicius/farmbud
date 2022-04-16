export default function formatToNumeric(value: string): number {
  return parseFloat(value.replace('.', '').replace(',', '.'));
}
