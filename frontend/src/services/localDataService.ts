// Loads real cleaned ILO data from static JSON files.

export interface DataRow {
  country: string;
  year: number;
  category: string;
  value: number;
}

export interface AllData {
  sector: DataRow[];
  occupation: DataRow[];
  unemployment: DataRow[];
}

let _cache: AllData | null = null;

export async function loadAllData(): Promise<AllData> {
  if (_cache) return _cache;
  const [sector, occupation, unemployment] = await Promise.all([
    fetch("/data/employment_sector.json").then((r) => r.json()),
    fetch("/data/employment_occupation.json").then((r) => r.json()),
    fetch("/data/unemployment.json").then((r) => r.json()),
  ]);
  _cache = { sector, occupation, unemployment };
  console.log(
    `📊 Loaded real data: ${sector.length} sector, ${occupation.length} occupation, ${unemployment.length} unemployment rows`,
  );
  return _cache;
}

export function filterByCountry<T extends { country: string }>(data: T[], country: string): T[] {
  return data.filter((d) => d.country === country);
}

export function getUniqueCountries(data: DataRow[]): string[] {
  return [...new Set(data.map((d) => d.country))].sort();
}

export function pivotByCategory(rows: DataRow[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) out[r.category] = r.value;
  return out;
}
