import {HajjData, Category, HajjRule} from '../types';

// Import the JSON data
const hajjRulesData = require('../assets/data/hajj_rules.json') as HajjData;

export class DataService {
  private static instance: DataService;
  private data: HajjData;

  private constructor() {
    this.data = hajjRulesData;
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public getCategories(): Category[] {
    const categories: Category[] = [
      {
        id: 1,
        name: 'shtyllat_e_islamit',
        title: 'Shtyllat e Islamit',
        description: 'Pesë shtyllat themelore të fesë islame',
        image: 'pillars_of_islam.png',
        rules: this.data.shtyllat_e_islamit.map(pillar => ({
          id: pillar.id,
          rule: pillar.name,
          description: pillar.description,
          category: 'shtyllat_e_islamit',
        })),
      },
      {
        id: 2,
        name: 'edukata_e_udhetimit',
        title: 'Edukata e Udhëtimit',
        description: 'Rregullat dhe edukativa para dhe gjatë udhëtimit për Haxh',
        image: 'travel_etiquette.png',
        rules: this.data.edukata_e_udhetimit,
      },
      {
        id: 3,
        name: 'ihrami',
        title: 'Ihrami',
        description: 'Rregullat dhe kërkesat për ihramin',
        image: 'ihram.png',
        rules: this.data.ihrami.para_veshjes.map(action => ({
          id: action.id,
          rule: action.veprim,
          description: action.description,
          category: 'ihrami',
        })),
      },
      {
        id: 4,
        name: 'ndalesat_gjate_ihramit',
        title: 'Ndalesat gjatë Ihramit',
        description: 'Gjërat që janë të ndaluara gjatë gjendjes së ihramit',
        image: 'prohibitions.png',
        rules: this.data.ndalesat_gjate_ihramit.map(prohibition => ({
          id: prohibition.id,
          rule: prohibition.ndalesa,
          description: prohibition.description,
          category: 'ndalesat_gjate_ihramit',
        })),
      },
      {
        id: 5,
        name: 'vendcaktimet',
        title: 'Vendcaktimet (Miqat)',
        description: 'Vendcaktimet ku bëhet ihram-i',
        image: 'miqats.jpg',
        rules: this.data.vendcaktimet.map(miqat => ({
          id: miqat.id,
          rule: miqat.emri,
          description: `${miqat.per_ke} - ${miqat.largesia}`,
          category: 'vendcaktimet',
          image: miqat.image,
        })),
      },
    ];

    return categories;
  }

  public getCategoryById(id: number): Category | undefined {
    const categories = this.getCategories();
    return categories.find(cat => cat.id === id);
  }

  public getCategoryByName(name: string): Category | undefined {
    const categories = this.getCategories();
    return categories.find(cat => cat.name === name);
  }

  public getAllRules(): HajjRule[] {
    const categories = this.getCategories();
    const allRules: HajjRule[] = [];
    
    categories.forEach(category => {
      if (category.rules) {
        allRules.push(...category.rules);
      }
    });

    return allRules;
  }

  public searchRules(query: string): HajjRule[] {
    const allRules = this.getAllRules();
    const lowerQuery = query.toLowerCase();
    
    return allRules.filter(rule => 
      rule.rule.toLowerCase().includes(lowerQuery) ||
      rule.description.toLowerCase().includes(lowerQuery)
    );
  }

  public getIntroduction() {
    return this.data.introduction;
  }

  public getHajjObligation() {
    return this.data.detyrimi_i_haxhit;
  }

  public getIhramInfo() {
    return this.data.ihrami;
  }
}

export default DataService.getInstance();