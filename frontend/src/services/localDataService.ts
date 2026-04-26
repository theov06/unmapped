// Loads real cleaned ILO / World Bank / training data from static JSON files.

export interface DataRow {
  country: string;
  year: number;
  category: string;
  value: number;
}

export interface TrainingRow {
  provider: string;
  course_name: string;
  occupation_target: string;
  num_skills: number;
}

export interface AllData {
  sector: DataRow[];
  occupation: DataRow[];
  unemployment: DataRow[];
  wdi: DataRow[];
  training: TrainingRow[];
}

let _cache: AllData | null = null;

export async function loadAllData(): Promise<AllData> {
  if (_cache) return _cache;
  const [sector, occupation, unemployment, wdi, training] = await Promise.all([
    fetch("/data/employment_sector.json").then((r) => r.json()),
    fetch("/data/employment_occupation.json").then((r) => r.json()),
    fetch("/data/unemployment.json").then((r) => r.json()),
    fetch("/data/wdi.json").then((r) => r.json()),
    fetch("/data/training_pathways.json").then((r) => r.json()),
  ]);
  _cache = { sector, occupation, unemployment, wdi, training };
  console.log(
    `📊 Loaded real data: ${sector.length} sector, ${occupation.length} occupation, ${unemployment.length} unemployment, ${wdi.length} WDI, ${training.length} training rows`,
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

export function getWdiValue(wdi: DataRow[], country: string, category: string): number | null {
  const row = wdi.find((d) => d.country === country && d.category === category);
  return row ? row.value : null;
}
