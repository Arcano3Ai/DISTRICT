import type { EstimationParams, EstimationResult, FinishLevel, ServiceType } from './types';

const BASE_DESIGN_PER_M2: Record<ServiceType, number> = {
  diseno_arquitectonico: 180,
  proyecto_ejecutivo: 280,
  visualizacion_3d: 120,
  remodelacion: 200,
  direccion_obra: 150,
};

const BASE_CONSTRUCTION_PER_M2: Record<FinishLevel, number> = {
  economico: 8500,
  residencial: 14000,
  luxury: 22000,
};

const FINISH_MULTIPLIER: Record<FinishLevel, number> = {
  economico: 1.0,
  residencial: 1.25,
  luxury: 1.6,
};

export function calculateProjectEstimate(params: EstimationParams): EstimationResult {
  const effectiveArea = Math.max(params.areaM2, 25);
  const baseRate = BASE_DESIGN_PER_M2[params.projectType] || 200;
  const finishMult = FINISH_MULTIPLIER[params.finishLevel] || 1.2;

  let designBaseCost = effectiveArea * baseRate * finishMult;
  
  if (designBaseCost < 8000) {
    designBaseCost = 8000;
  }

  const breakdown: { label: string; amount: number }[] = [
    { label: 'Diseño Base y Anteproyecto', amount: Math.round(designBaseCost) }
  ];

  let addOnCosts = 0;

  if (params.include3DRenders) {
    const renderCost = Math.max(3500, effectiveArea * 45);
    addOnCosts += renderCost;
    breakdown.push({ label: 'Renders Fotorrealistas 3D HD', amount: Math.round(renderCost) });
  }

  if (params.includeStructuralCalc) {
    const structCost = Math.max(4500, effectiveArea * 55);
    addOnCosts += structCost;
    breakdown.push({ label: 'Cálculo Estructural y Planos de Cimentación', amount: Math.round(structCost) });
  }

  if (params.includePermits) {
    const permitCost = Math.max(3000, effectiveArea * 30);
    addOnCosts += permitCost;
    breakdown.push({ label: 'Gestión y Planos de Permiso Municipal', amount: Math.round(permitCost) });
  }

  const totalDesignMin = Math.max(8000, Math.round((designBaseCost + addOnCosts) * 0.95));
  const totalDesignMax = Math.round((designBaseCost + addOnCosts) * 1.15);

  const constrRate = BASE_CONSTRUCTION_PER_M2[params.finishLevel] || 12000;
  const constructionBase = effectiveArea * constrRate;
  const totalConstrMin = Math.round(constructionBase * 0.9);
  const totalConstrMax = Math.round(constructionBase * 1.2);

  const baseDays = 15;
  const daysPerM2 = 0.15;
  const totalDays = Math.round(baseDays + (effectiveArea * daysPerM2) + (params.include3DRenders ? 5 : 0));

  return {
    estimatedDesignCostMin: totalDesignMin,
    estimatedDesignCostMax: totalDesignMax,
    estimatedConstructionCostMin: totalConstrMin,
    estimatedConstructionCostMax: totalConstrMax,
    estimatedDays: totalDays,
    breakdown,
  };
}

export function formatCurrencyMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
}
