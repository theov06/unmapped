import { OCCUPATIONS, type Occupation } from '@/data/occupations';
import { COUNTRIES, type Country } from '@/data/countries';

export type SkillProfileInput = {
  skills: string[];
  educationLevel: string;
  yearsExperience: number;
  countryCode: string;
};

export type SignalResult = {
  occupation: Occupation;
  matchScore: number;          // 0-1
  expectedWageUSD: { low: number; mid: number; high: number };
  automationRisk: 'low' | 'medium' | 'high';
  automationScore: number;     // calibrated 0-1
  growthLabel: 'declining' | 'flat' | 'growing' | 'fast-growing';
  durableSkills: string[];
  adjacentSkills: string[];
};

export function getCountry(code: string): Country {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
}

export function matchOccupations(input: SkillProfileInput): SignalResult[] {
  const country = getCountry(input.countryCode);
  const userSkills = new Set(input.skills.map((s) => s.toLowerCase()));

  const scored = OCCUPATIONS.map((occ) => {
    const overlap = occ.skills.filter((s) => userSkills.has(s.toLowerCase())).length;
    const matchScore = overlap / Math.max(occ.skills.length, 1);
    return { occ, matchScore };
  })
    .filter((s) => s.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  return scored.map(({ occ, matchScore }) => {
    // Calibrate automation for LMIC context
    const calibratedAutomation = occ.automationProbability * country.automationCalibration;
    const risk: SignalResult['automationRisk'] =
      calibratedAutomation < 0.35 ? 'low' : calibratedAutomation < 0.65 ? 'medium' : 'high';

    // Wage band: country median scaled by occupation skill rarity + experience
    const expBoost = 1 + Math.min(input.yearsExperience, 15) * 0.025;
    const skillBoost = 1 + matchScore * 0.5;
    const mid = Math.round(country.medianMonthlyWageUSD * skillBoost * expBoost);
    const expectedWageUSD = {
      low: Math.round(mid * 0.7),
      mid,
      high: Math.round(mid * 1.45),
    };

    const growthLabel: SignalResult['growthLabel'] =
      occ.growthIndex < -0.2 ? 'declining' :
      occ.growthIndex < 0.3  ? 'flat' :
      occ.growthIndex < 1.0  ? 'growing' : 'fast-growing';

    // Durable skills = the ones in this occupation with low routine content
    const durableSkills = occ.skills.filter(
      (s) => !['cash handling', 'typing', 'data entry'].includes(s)
    ).slice(0, 3);

    // Adjacent skills = top skills from next-best growing, low-automation occupations
    const adjacentSkills = OCCUPATIONS
      .filter((o) => o.iscoCode !== occ.iscoCode && o.growthIndex > 0.5 && o.automationProbability < 0.4)
      .flatMap((o) => o.skills)
      .filter((s) => !userSkills.has(s.toLowerCase()))
      .slice(0, 4);

    return {
      occupation: occ,
      matchScore,
      expectedWageUSD,
      automationRisk: risk,
      automationScore: calibratedAutomation,
      growthLabel,
      durableSkills,
      adjacentSkills,
    };
  });
}

// Wittgenstein Centre-style projection (illustrative): % of working-age
// population with at least secondary education by 2025 / 2030 / 2035
export const EDUCATION_PROJECTIONS: Record<string, { y2025: number; y2030: number; y2035: number }> = {
  KE: { y2025: 38, y2030: 47, y2035: 55 },
  GH: { y2025: 42, y2030: 51, y2035: 59 },
  NG: { y2025: 35, y2030: 41, y2035: 48 },
  BD: { y2025: 44, y2030: 53, y2035: 62 },
  IN: { y2025: 51, y2030: 60, y2035: 68 },
  ID: { y2025: 56, y2030: 64, y2035: 71 },
  PE: { y2025: 64, y2030: 71, y2035: 77 },
  CO: { y2025: 60, y2030: 67, y2035: 73 },
  EG: { y2025: 58, y2030: 65, y2035: 71 },
  PH: { y2025: 67, y2030: 74, y2035: 80 },
  UG: { y2025: 28, y2030: 36, y2035: 44 },
  ZA: { y2025: 71, y2030: 76, y2035: 81 },
};