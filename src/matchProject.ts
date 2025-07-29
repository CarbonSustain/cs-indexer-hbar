export const SDG_MAP: Record<string, string> = {
    'SDG 1': 'No Poverty',
    'SDG 2': 'Zero Hunger',
    'SDG 3': 'Good Health and Well-being',
    'SDG 4': 'Quality Education',
    'SDG 5': 'Gender Equality',
    'SDG 6': 'Clean Water and Sanitation',
    'SDG 7': 'Affordable and Clean Energy',
    'SDG 8': 'Decent Work and Economic Growth',
    'SDG 9': 'Industry, Innovation and Infrastructure',
    'SDG 10': 'Reduced Inequalities',
    'SDG 11': 'Sustainable Cities and Communities',
    'SDG 12': 'Responsible Consumption and Production',
    'SDG 13': 'Climate Action',
    'SDG 14': 'Life Below Water',
    'SDG 15': 'Life on Land',
    'SDG 16': 'Peace, Justice and Strong Institutions',
    'SDG 17': 'Partnerships for the Goals',
  };
  
  export function normalizeSdgs(input: string[]): string[] {
    return input.map(sdg => {
      const key = sdg.toUpperCase().trim();
      return SDG_MAP[key] || sdg;
    });
  }
  
  export function filterProjectBySDGs(text: string, userInput: string[]): boolean {
    if (!text) return false;
  
    const normalizedSdgs = userInput.map(sdg => {
      const key = sdg.trim().toUpperCase();
      return SDG_MAP[key] || sdg;
    }).map(val => val.toLowerCase());
  
    const loweredText = text.toLowerCase();
    return normalizedSdgs.some(sdg => loweredText.includes(sdg));
  }