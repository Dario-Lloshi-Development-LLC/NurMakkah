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
    const data = this.data;
    const categories: Category[] = [];

    // Map existing sections
    if (data.shtyllat_e_islamit) {
      categories.push({
        id: 1,
        name: 'shtyllat_e_islamit',
        title: 'Shtyllat e Islamit',
        description: 'Pesë shtyllat themelore të fesë islame',
        image: 'pillars_of_islam.png',
        rules: data.shtyllat_e_islamit.map(pillar => ({
          id: pillar.id,
          rule: pillar.name,
          description: pillar.description,
          category: 'shtyllat_e_islamit',
        })),
      });
    }
    if (data.edukata_e_udhetimit) {
      categories.push({
        id: 2,
        name: 'edukata_e_udhetimit',
        title: 'Edukata e Udhëtimit',
        description: 'Rregullat dhe edukativa para dhe gjatë udhëtimit për Haxh',
        image: 'travel_etiquette.png',
        rules: data.edukata_e_udhetimit,
      });
    }
    if (data.ihrami) {
        categories.push({
            id: 3,
            name: 'ihrami',
            title: 'Ihrami',
            description: 'Rregullat dhe kërkesat për ihramin',
            image: 'ihram.png',
            rules: data.ihrami.para_veshjes.map(action => ({
                id: action.id,
                rule: action.veprim,
                description: action.description,
                category: 'ihrami',
            })),
        });
    }
    if (data.ndalesat_gjate_ihramit) {
        categories.push({
            id: 4,
            name: 'ndalesat_gjate_ihramit',
            title: 'Ndalesat gjatë Ihramit',
            description: 'Gjërat që janë të ndaluara gjatë gjendjes së ihramit',
            image: 'prohibitions.png',
            rules: data.ndalesat_gjate_ihramit.map(prohibition => ({
                id: prohibition.id,
                rule: prohibition.ndalesa,
                description: prohibition.description,
                category: 'ndalesat_gjate_ihramit',
            })),
        });
    }
    if (data.vendcaktimet) {
        categories.push({
            id: 5,
            name: 'vendcaktimet',
            title: 'Vendcaktimet (Miqat)',
            description: 'Vendcaktimet ku bëhet ihram-i',
            image: 'miqats.jpg',
            rules: data.vendcaktimet.map(miqat => ({
                id: miqat.id,
                rule: miqat.emri,
                description: `${miqat.per_ke} - ${miqat.largesia}`,
                category: 'vendcaktimet',
                image: miqat.image,
            })),
        });
    }

    // Add new dynamic sections
    if (data.duas) {
      categories.push({
        id: 6,
        name: 'duas',
        title: data.duas.title.albanian,
        description: 'Lutjet dhe përmendjet gjatë Haxhit',
        image: 'duas.png',
        rules: data.duas.supplications.map((dua, index) => ({
          id: index + 1,
          rule: dua.title.albanian,
          description: `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation.albanian}`,
          category: 'duas',
        })),
      });
    }
    if (data.tawaf) {
      categories.push({
        id: 7,
        name: 'tawaf',
        title: data.tawaf.title.albanian,
        description: 'Udhëzues vizual dhe rregullat për Tavafin',
        image: data.tawaf.visual_guide,
        rules: [
          {
            id: 1,
            rule: "Tawaf Guide",
            description: data.tawaf.description.albanian,
            category: 'tawaf'
          }
        ]
      });
    }
     if (data.sai) {
      categories.push({
        id: 8,
        name: 'sai',
        title: data.sai.title.albanian,
        description: 'Udhëzues vizual dhe rregullat për Sa'i-n',
        image: data.sai.visual_guide,
        rules: [
          {
            id: 1,
            rule: "Sa'i Guide",
            description: data.sai.description.albanian,
            category: 'sai'
          }
        ]
      });
    }
    if (data.madhab_comparison) {
      categories.push({
        id: 9,
        name: 'madhab_comparison',
        title: 'Krahasimi i Medhhebeve',
        description: 'Dallimet në disa çështje të Haxhit sipas katër medhhebeve',
        image: 'madhab.png',
        rules: data.madhab_comparison.map((issue, index) => ({
          id: index + 1,
          rule: issue.issue.albanian,
          description: issue.rulings.map(r => `**${r.madhab}:** ${r.ruling.albanian}`).join('\n\n'),
          category: 'madhab_comparison',
        })),
      });
    }
    if (data.health_and_safety) {
      categories.push({
        id: 10,
        name: 'health_and_safety',
        title: data.health_and_safety.title.albanian,
        description: 'Këshilla praktike për shëndetin dhe sigurinë gjatë Haxhit',
        image: 'health.png',
        rules: data.health_and_safety.tips.map((tip, index) => ({
          id: index + 1,
          rule: tip.title.albanian,
          description: tip.description.albanian,
          category: 'health_and_safety',
        })),
      });
    }

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