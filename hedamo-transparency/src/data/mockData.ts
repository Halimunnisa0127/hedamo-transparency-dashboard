// data/mockData.ts
import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Herbal Tea',
    category: 'Beverages',
    score: 72,
    status: 'published',
    lastUpdated: '2024-01-15',
    description: 'A refreshing blend of organic herbs and green tea',
    aiAnalysis: {
      productName: 'Organic Herbal Tea',
      score: 72,
      explanation: 'Moderate transparency. Missing sourcing details for 2 ingredients.',
      suggestions: [
        'Add sourcing details for green tea leaves',
        'Include certification ID for organic claim',
        'Clarify packaging recyclability'
      ],
      flags: ['Incomplete sourcing', 'Unverified organic claim']
    }
  },
  {
    id: '2',
    name: 'Sustainable Bamboo Toothbrush',
    category: 'Personal Care',
    score: 88,
    status: 'published',
    lastUpdated: '2024-01-10',
    description: 'Eco-friendly bamboo toothbrush with biodegradable bristles',
    aiAnalysis: {
      productName: 'Sustainable Bamboo Toothbrush',
      score: 88,
      explanation: 'Excellent transparency. Comprehensive sourcing and manufacturing details.',
      suggestions: [
        'Add third-party biodegradability certification',
        'Include carbon footprint calculation'
      ],
      flags: []
    }
  },
  {
    id: '3',
    name: 'Natural Face Cream',
    category: 'Skincare',
    score: 65,
    status: 'needs_attention',
    lastUpdated: '2024-01-12',
    description: 'Moisturizing cream with natural ingredients',
    aiAnalysis: {
      productName: 'Natural Face Cream',
      score: 65,
      explanation: 'Limited transparency. Missing ingredient percentages and sourcing.',
      suggestions: [
        'Specify percentages for all ingredients',
        'Add sourcing locations for key components',
        'Include cruelty-free certification'
      ],
      flags: ['Missing ingredient data', 'Unverified natural claims']
    }
  },
  {
    id: '4',
    name: 'Recycled Paper Notebook',
    category: 'Stationery',
    score: 79,
    status: 'draft',
    lastUpdated: '2024-01-08',
    description: 'Notebook made from 100% recycled paper',
    aiAnalysis: {
      productName: 'Recycled Paper Notebook',
      score: 79,
      explanation: 'Good transparency. Clear recycling information provided.',
      suggestions: [
        'Add specific recycling facility details',
        'Include ink composition transparency'
      ],
      flags: ['Unverified recycling claims']
    }
  },
  {
    id: '5',
    name: 'Plant-Based Protein Powder',
    category: 'Supplements',
    score: 91,
    status: 'published',
    lastUpdated: '2024-01-18',
    description: 'Vegan protein powder from pea and rice sources',
    aiAnalysis: {
      productName: 'Plant-Based Protein Powder',
      score: 91,
      explanation: 'Outstanding transparency. Complete supply chain documentation.',
      suggestions: [
        'Consider adding amino acid profile testing',
        'Include farming practice details for pea sources'
      ],
      flags: []
    }
  },
  {
    id: '6',
    name: 'Eco Laundry Detergent',
    category: 'Cleaning Products',
    score: 58,
    status: 'needs_attention',
    lastUpdated: '2024-01-14',
    description: 'Concentrated laundry detergent with plant-based ingredients',
    aiAnalysis: {
      productName: 'Eco Laundry Detergent',
      score: 58,
      explanation: 'Limited ingredient transparency. Missing biodegradability data.',
      suggestions: [
        'Provide complete ingredient breakdown',
        'Add biodegradability test results',
        'Include water impact assessment'
      ],
      flags: ['Missing safety data', 'Unverified eco claims', 'Incomplete ingredient list']
    }
  },
  {
    id: '7',
    name: 'Organic Cotton T-Shirt',
    category: 'Apparel',
    score: 84,
    status: 'published',
    lastUpdated: '2024-01-16',
    description: '100% organic cotton t-shirt, fair trade certified',
    aiAnalysis: {
      productName: 'Organic Cotton T-Shirt',
      score: 84,
      explanation: 'Strong transparency in materials and labor practices.',
      suggestions: [
        'Add water usage per unit calculation',
        'Include dye composition details'
      ],
      flags: ['Missing dye information']
    }
  },
  {
    id: '8',
    name: 'Reusable Coffee Cup',
    category: 'Foodware',
    score: 76,
    status: 'draft',
    lastUpdated: '2024-01-11',
    description: 'Insulated reusable cup made from recycled stainless steel',
    aiAnalysis: {
      productName: 'Reusable Coffee Cup',
      score: 76,
      explanation: 'Good material transparency, limited manufacturing details.',
      suggestions: [
        'Add manufacturing energy consumption data',
        'Include end-of-life recycling instructions',
        'Provide carbon footprint calculation'
      ],
      flags: ['Missing manufacturing data']
    }
  },
  {
    id: '9',
    name: 'Natural Insect Repellent',
    category: 'Outdoor',
    score: 43,
    status: 'needs_attention',
    lastUpdated: '2024-01-09',
    description: 'DEET-free insect repellent with essential oils',
    aiAnalysis: {
      productName: 'Natural Insect Repellent',
      score: 43,
      explanation: 'Critical transparency gaps in safety and efficacy data.',
      suggestions: [
        'Provide third-party efficacy testing',
        'Include complete safety data sheets',
        'Add sourcing for all essential oils',
        'Clarify environmental impact'
      ],
      flags: ['Missing safety data', 'Unverified efficacy claims', 'Incomplete sourcing']
    }
  },
  {
    id: '10',
    name: 'Bamboo Cutting Board',
    category: 'Kitchenware',
    score: 82,
    status: 'published',
    lastUpdated: '2024-01-17',
    description: 'Sustainable bamboo cutting board with natural finish',
    aiAnalysis: {
      productName: 'Bamboo Cutting Board',
      score: 82,
      explanation: 'Good transparency in materials and manufacturing process.',
      suggestions: [
        'Add bamboo harvesting practices details',
        'Include coating composition information'
      ],
      flags: ['Missing coating details']
    }
  },
  {
    id: '11',
    name: 'Probiotic Yogurt',
    category: 'Dairy',
    score: 67,
    status: 'published',
    lastUpdated: '2024-01-13',
    description: 'Grass-fed cow milk yogurt with live cultures',
    aiAnalysis: {
      productName: 'Probiotic Yogurt',
      score: 67,
      explanation: 'Moderate transparency. Limited animal welfare and probiotic data.',
      suggestions: [
        'Add animal welfare certification',
        'Include probiotic strain specificity',
        'Provide farming partnership details'
      ],
      flags: ['Missing welfare information', 'Unverified probiotic claims']
    }
  },
  {
    id: '12',
    name: 'Solar Powered Lamp',
    category: 'Electronics',
    score: 74,
    status: 'draft',
    lastUpdated: '2024-01-19',
    description: 'Portable solar lamp with USB charging capability',
    aiAnalysis: {
      productName: 'Solar Powered Lamp',
      score: 74,
      explanation: 'Good energy transparency, limited component sourcing.',
      suggestions: [
        'Add battery composition and lifespan data',
        'Include solar panel efficiency details',
        'Provide repair and disposal guidelines'
      ],
      flags: ['Missing battery information', 'Incomplete component sourcing']
    }
  },
  {
    id: '13',
    name: 'Herbal Sleep Tincture',
    category: 'Wellness',
    score: 59,
    status: 'needs_attention',
    lastUpdated: '2024-01-20',
    description: 'Natural sleep aid with valerian root and chamomile',
    aiAnalysis: {
      productName: 'Herbal Sleep Tincture',
      score: 59,
      explanation: 'Significant gaps in herbal sourcing and efficacy data.',
      suggestions: [
        'Provide clinical study references',
        'Add detailed herbal sourcing locations',
        'Include alcohol content transparency',
        'Add third-party testing results'
      ],
      flags: ['Unverified health claims', 'Missing clinical data', 'Incomplete sourcing']
    }
  },
  {
    id: '14',
    name: 'Recycled PET Backpack',
    category: 'Accessories',
    score: 87,
    status: 'published',
    lastUpdated: '2024-01-21',
    description: 'Durable backpack made from recycled plastic bottles',
    aiAnalysis: {
      productName: 'Recycled PET Backpack',
      score: 87,
      explanation: 'Excellent material traceability and recycling documentation.',
      suggestions: [
        'Add plastic bottle conversion ratio',
        'Include manufacturing labor conditions'
      ],
      flags: []
    }
  },
  {
    id: '15',
    name: 'Organic Baby Food Pouches',
    category: 'Baby Products',
    score: 81,
    status: 'published',
    lastUpdated: '2024-01-22',
    description: 'Organic fruit and vegetable blends for infants',
    aiAnalysis: {
      productName: 'Organic Baby Food Pouches',
      score: 81,
      explanation: 'Strong food safety and organic certification transparency.',
      suggestions: [
        'Add pouch recyclability information',
        'Include heavy metal testing results'
      ],
      flags: ['Missing packaging sustainability']
    }
  }
];