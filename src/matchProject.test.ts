import { filterProjectBySDGs } from './matchProject';

describe('filterProjectBySDGs', () => {
  const sampleText = `
    This project focuses on No Poverty, Gender Equality, and Climate Action.
    It aims to support Affordable and Clean Energy and Decent Work and Economic Growth.
  `;

  test('matches SDG codes like "SDG 1", "SDG 5", "SDG 13"', () => {
    const input = ['SDG 1', 'SDG 5', 'SDG 13'];
    const result = filterProjectBySDGs(sampleText, input);
    expect(result).toBe(3);
  });

  test('matches full SDG names like "No Poverty", "Climate Action"', () => {
    const input = ['No Poverty', 'Climate Action'];
    const result = filterProjectBySDGs(sampleText, input);
    expect(result).toBe(2);
  });

  test('is case-insensitive and handles mixed formats', () => {
    const input = ['sdg 7', 'Decent Work and Economic Growth'];
    const result = filterProjectBySDGs(sampleText, input);
    expect(result).toBe(2);
  });

  test('returns 0 when there are no matches', () => {
    const input = ['SDG 14', 'Life Below Water'];
    const result = filterProjectBySDGs(sampleText, input);
    expect(result).toBe(0);
  });

  test('handles empty input text', () => {
    const input = ['SDG 1', 'SDG 2'];
    const result = filterProjectBySDGs('', input);
    expect(result).toBe(0);
  });

  test('handles empty SDG input list', () => {
    const result = filterProjectBySDGs(sampleText, []);
    expect(result).toBe(0);
  });

  test('handles unknown SDG code gracefully', () => {
    const input = ['SDG 99', 'SDG 1'];
    const result = filterProjectBySDGs(sampleText, input);
    expect(result).toBe(1); // only SDG 1 should match
  });

  test('matches SDG codes present directly in a long project description', () => {
    const longText = `
      Purpose and general description of the Project Activity : Purpose of the Project Activity: 
      The purpose of the project activity is to generate clean electricity and contribute to achieving 
      the requirements of the Green Economy Strategy of the country by harnessing renewable “Solar Energy” 
      with the help of Solar PV technology.
  
      Project Overview: The project activity is the first utility-scale grid-connected 100 MWac solar power 
      plant/unit in the Republic of Uzbekistan. The project activity is a Greenfield project, meaning it is 
      a new solar PV-based power generation plant installed at a site where no solar power plant was operating 
      prior to the implementation of the project activity.
  
      Implementation: The project activity has been implemented in the Region of Navoi, Karmana district by 
      Eco Solutions LLC, which is a wholly owned subsidiary of Abu Dhabi Future Energy Company PJSC - Masdar, 
      a global leader in renewable energy and sustainable urban development. Masdar has pioneered clean energy, 
      sustainable real estate, and clean technology in the United Arab Emirates (UAE) and around the world.
  
      Impact: The electricity generated from the project activity is exported to the national grid of Uzbekistan, 
      thereby displacing fossil fuel-dominant electricity from the Uzbekistan electricity distribution system. 
      This reduces greenhouse gas (GHG) emissions to the atmosphere and contributes towards global efforts to 
      reduce global warming and strengthen the country’s energy security and sustainability.
  
      Expected Performance: The project activity is expected to generate an annual average of 272,274 MWh during 
      the crediting period, leading to an estimated average reduction of 151,929 tCO2 annually. 
      The total GHG emission reduction estimated over the chosen crediting period is 85,150 tCO2. 
  
      The project is expected to contribute 4 SDGs which are SDG 7, 8, 9, and 13.
    `;
  
    const input = ['SDG 7', 'SDG 8', 'SDG 9', 'SDG 13'];
    const result = filterProjectBySDGs(longText, input);
  
    expect(result).toBe(4); // All 4 codes should match directly
  });
  
});
