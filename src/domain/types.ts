export type ProjectCategory = 
  | 'all' 
  | 'fachadas' 
  | 'interiores' 
  | 'renders' 
  | 'albercas' 
  | 'terrenos';

export type FinishLevel = 'economico' | 'residencial' | 'luxury';

export type ServiceType = 
  | 'diseno_arquitectonico' 
  | 'proyecto_ejecutivo' 
  | 'visualizacion_3d' 
  | 'remodelacion' 
  | 'direccion_obra';

export interface PortfolioItem {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  location: string;
  m2?: number;
  year: string;
  mainImage: string;
  beforeImage?: string;
  galleryImages: string[];
  features: string[];
  is3dRender?: boolean;
}

export interface EstimationParams {
  projectType: ServiceType;
  areaM2: number;
  finishLevel: FinishLevel;
  include3DRenders: boolean;
  includeStructuralCalc: boolean;
  includePermits: boolean;
}

export interface EstimationResult {
  estimatedDesignCostMin: number;
  estimatedDesignCostMax: number;
  estimatedConstructionCostMin: number;
  estimatedConstructionCostMax: number;
  estimatedDays: number;
  breakdown: {
    label: string;
    amount: number;
  }[];
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  projectType: ServiceType;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
