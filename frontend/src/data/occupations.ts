/**
 * Curated ESCO + ISCO-08 occupation set, with Frey & Osborne automation
 * probabilities and ILO task-content estimates. LMIC-relevant occupations.
 * Skills tags drawn from ESCO essential skills.
 */
export type Occupation = {
  iscoCode: string;          // ISCO-08
  escoUri: string;           // shortened ESCO ref
  title: string;
  // 0-1 Frey & Osborne probability of computerization
  automationProbability: number;
  // 0-1, share of routine manual + cognitive task content (ILO)
  routineTaskShare: number;
  // Sector employment growth (ILO/WDI rolling, illustrative)
  growthIndex: number;       // -2..+2
  // Skill tags
  skills: string[];
  sector: string;
};

export const OCCUPATIONS: Occupation[] = [
  { iscoCode: '5223', escoUri: 'esco/occupation/shop-sales-assistant', title: 'Shop sales assistant', automationProbability: 0.92, routineTaskShare: 0.78, growthIndex: -0.5, skills: ['customer service','cash handling','product knowledge','communication','arithmetic'], sector: 'Retail' },
  { iscoCode: '7115', escoUri: 'esco/occupation/carpenter',            title: 'Carpenter',            automationProbability: 0.72, routineTaskShare: 0.55, growthIndex: 0.3,  skills: ['woodworking','measuring','hand tools','reading drawings','safety procedures'], sector: 'Construction' },
  { iscoCode: '5120', escoUri: 'esco/occupation/cook',                  title: 'Cook',                automationProbability: 0.34, routineTaskShare: 0.45, growthIndex: 0.6,  skills: ['food preparation','hygiene','recipe scaling','customer service','time management'], sector: 'Hospitality' },
  { iscoCode: '7531', escoUri: 'esco/occupation/tailor',                title: 'Tailor / dressmaker', automationProbability: 0.84, routineTaskShare: 0.60, growthIndex: -0.2, skills: ['sewing','pattern making','fabric selection','measuring','design'], sector: 'Garment' },
  { iscoCode: '8322', escoUri: 'esco/occupation/taxi-driver',           title: 'Driver (taxi/boda)',  automationProbability: 0.89, routineTaskShare: 0.70, growthIndex: 0.0,  skills: ['driving','navigation','customer service','vehicle maintenance','cash handling'], sector: 'Transport' },
  { iscoCode: '6111', escoUri: 'esco/occupation/field-crop-grower',     title: 'Field crop farmer',   automationProbability: 0.41, routineTaskShare: 0.50, growthIndex: 0.4,  skills: ['planting','irrigation','pest management','harvesting','weather reading'], sector: 'Agriculture' },
  { iscoCode: '5152', escoUri: 'esco/occupation/domestic-housekeeper',  title: 'Domestic worker',     automationProbability: 0.69, routineTaskShare: 0.65, growthIndex: 0.2,  skills: ['cleaning','cooking','child care','laundry','time management'], sector: 'Household services' },
  { iscoCode: '7411', escoUri: 'esco/occupation/electrician',           title: 'Electrician',         automationProbability: 0.15, routineTaskShare: 0.30, growthIndex: 0.9,  skills: ['wiring','safety procedures','reading diagrams','troubleshooting','solar systems'], sector: 'Construction / Energy' },
  { iscoCode: '7212', escoUri: 'esco/occupation/welder',                title: 'Welder',              automationProbability: 0.78, routineTaskShare: 0.58, growthIndex: 0.1,  skills: ['welding','metalwork','safety procedures','blueprint reading','grinding'], sector: 'Manufacturing' },
  { iscoCode: '2356', escoUri: 'esco/occupation/ict-trainer',           title: 'Digital skills trainer', automationProbability: 0.18, routineTaskShare: 0.25, growthIndex: 1.4, skills: ['teaching','digital literacy','curriculum design','communication','facilitation'], sector: 'Education' },
  { iscoCode: '3522', escoUri: 'esco/occupation/telecom-tech',          title: 'Mobile phone technician', automationProbability: 0.42, routineTaskShare: 0.40, growthIndex: 1.1, skills: ['device repair','soldering','diagnostics','customer service','digital literacy'], sector: 'ICT' },
  { iscoCode: '5311', escoUri: 'esco/occupation/childcare-worker',      title: 'Childcare worker',    automationProbability: 0.08, routineTaskShare: 0.20, growthIndex: 0.8,  skills: ['child care','first aid','communication','play facilitation','patience'], sector: 'Care economy' },
  { iscoCode: '5321', escoUri: 'esco/occupation/health-care-assistant', title: 'Community health worker', automationProbability: 0.11, routineTaskShare: 0.22, growthIndex: 1.3, skills: ['first aid','communication','record keeping','public health','empathy'], sector: 'Health' },
  { iscoCode: '9112', escoUri: 'esco/occupation/cleaner-helper',        title: 'Cleaner',             automationProbability: 0.66, routineTaskShare: 0.72, growthIndex: 0.0,  skills: ['cleaning','time management','safety procedures','attention to detail'], sector: 'Facilities' },
  { iscoCode: '5141', escoUri: 'esco/occupation/hairdresser',           title: 'Hairdresser / barber',automationProbability: 0.11, routineTaskShare: 0.30, growthIndex: 0.5,  skills: ['hair styling','customer service','hygiene','appointment scheduling','retail'], sector: 'Personal services' },
  { iscoCode: '4222', escoUri: 'esco/occupation/contact-centre-info',   title: 'Customer service agent', automationProbability: 0.55, routineTaskShare: 0.62, growthIndex: 0.3, skills: ['communication','digital literacy','typing','problem solving','language skills'], sector: 'Services / BPO' },
];

export const ALL_SKILLS = Array.from(
  new Set(OCCUPATIONS.flatMap((o) => o.skills))
).sort();