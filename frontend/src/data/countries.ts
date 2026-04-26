export type Country = {
  code: string;
  name: string;
  region: string;
  currency: string;
  // ILOSTAT-derived monthly wage floor (USD, illustrative LMIC sample)
  medianMonthlyWageUSD: number;
  // World Bank WDI: % of employment that is informal
  informalEmploymentPct: number;
  // ITU: mobile broadband subscriptions / 100 people
  mobileBroadbandPer100: number;
  // NEET rate (youth not in education, employment, training)
  neetRatePct: number;
  // Calibration weight for automation (LMIC contexts often lower)
  automationCalibration: number;
  languages: string[];
};

export const COUNTRIES: Country[] = [
  { code: 'KE', name: 'Kenya',       region: 'Sub-Saharan Africa', currency: 'KES', medianMonthlyWageUSD: 235, informalEmploymentPct: 83, mobileBroadbandPer100: 47,  neetRatePct: 17, automationCalibration: 0.55, languages: ['en','sw'] },
  { code: 'GH', name: 'Ghana',       region: 'Sub-Saharan Africa', currency: 'GHS', medianMonthlyWageUSD: 210, informalEmploymentPct: 82, mobileBroadbandPer100: 65,  neetRatePct: 22, automationCalibration: 0.52, languages: ['en','tw'] },
  { code: 'NG', name: 'Nigeria',     region: 'Sub-Saharan Africa', currency: 'NGN', medianMonthlyWageUSD: 195, informalEmploymentPct: 92, mobileBroadbandPer100: 41,  neetRatePct: 24, automationCalibration: 0.48, languages: ['en','ha','yo'] },
  { code: 'BD', name: 'Bangladesh',  region: 'South Asia',         currency: 'BDT', medianMonthlyWageUSD: 175, informalEmploymentPct: 85, mobileBroadbandPer100: 39,  neetRatePct: 27, automationCalibration: 0.50, languages: ['bn','en'] },
  { code: 'IN', name: 'India',       region: 'South Asia',         currency: 'INR', medianMonthlyWageUSD: 290, informalEmploymentPct: 88, mobileBroadbandPer100: 79,  neetRatePct: 30, automationCalibration: 0.62, languages: ['en','hi'] },
  { code: 'ID', name: 'Indonesia',   region: 'East Asia & Pacific',currency: 'IDR', medianMonthlyWageUSD: 320, informalEmploymentPct: 60, mobileBroadbandPer100: 96,  neetRatePct: 21, automationCalibration: 0.68, languages: ['id','en'] },
  { code: 'PE', name: 'Peru',        region: 'Latin America',      currency: 'PEN', medianMonthlyWageUSD: 405, informalEmploymentPct: 76, mobileBroadbandPer100: 81,  neetRatePct: 18, automationCalibration: 0.65, languages: ['es','qu'] },
  { code: 'CO', name: 'Colombia',    region: 'Latin America',      currency: 'COP', medianMonthlyWageUSD: 380, informalEmploymentPct: 58, mobileBroadbandPer100: 73,  neetRatePct: 26, automationCalibration: 0.70, languages: ['es'] },
  { code: 'EG', name: 'Egypt',       region: 'MENA',               currency: 'EGP', medianMonthlyWageUSD: 250, informalEmploymentPct: 64, mobileBroadbandPer100: 70,  neetRatePct: 28, automationCalibration: 0.60, languages: ['ar','en'] },
  { code: 'PH', name: 'Philippines', region: 'East Asia & Pacific',currency: 'PHP', medianMonthlyWageUSD: 295, informalEmploymentPct: 50, mobileBroadbandPer100: 88,  neetRatePct: 16, automationCalibration: 0.72, languages: ['en','tl'] },
  { code: 'UG', name: 'Uganda',      region: 'Sub-Saharan Africa', currency: 'UGX', medianMonthlyWageUSD: 145, informalEmploymentPct: 91, mobileBroadbandPer100: 35,  neetRatePct: 19, automationCalibration: 0.45, languages: ['en','sw','lg'] },
  { code: 'ZA', name: 'South Africa',region: 'Sub-Saharan Africa', currency: 'ZAR', medianMonthlyWageUSD: 525, informalEmploymentPct: 35, mobileBroadbandPer100: 109, neetRatePct: 32, automationCalibration: 0.78, languages: ['en','zu','xh','af'] },
];