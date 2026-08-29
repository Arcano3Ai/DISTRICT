import { describe, it, expect } from 'vitest';
import { calculateProjectEstimate } from '../domain/estimator';
import type { EstimationParams } from '../domain/types';

describe('Project Estimator Engine (TDD)', () => {
  it('calculates residential architectural design cost correctly', () => {
    const params: EstimationParams = {
      projectType: 'diseno_arquitectonico',
      areaM2: 150,
      finishLevel: 'residencial',
      include3DRenders: true,
      includeStructuralCalc: true,
      includePermits: false
    };

    const result = calculateProjectEstimate(params);

    expect(result.estimatedDesignCostMin).toBeGreaterThan(0);
    expect(result.estimatedDesignCostMax).toBeGreaterThan(result.estimatedDesignCostMin);
    expect(result.estimatedDays).toBeGreaterThan(15);
    expect(result.breakdown.length).toBeGreaterThan(0);
  });

  it('applies luxury finish level multiplier properly', () => {
    const baseParams: EstimationParams = {
      projectType: 'diseno_arquitectonico',
      areaM2: 100,
      finishLevel: 'economico',
      include3DRenders: false,
      includeStructuralCalc: false,
      includePermits: false
    };

    const luxuryParams: EstimationParams = {
      ...baseParams,
      finishLevel: 'luxury'
    };

    const baseResult = calculateProjectEstimate(baseParams);
    const luxuryResult = calculateProjectEstimate(luxuryParams);

    expect(luxuryResult.estimatedConstructionCostMin).toBeGreaterThan(baseResult.estimatedConstructionCostMin);
  });

  it('handles minimum area floor gracefully', () => {
    const tinyParams: EstimationParams = {
      projectType: 'remodelacion',
      areaM2: 5,
      finishLevel: 'residencial',
      include3DRenders: false,
      includeStructuralCalc: false,
      includePermits: false
    };

    const result = calculateProjectEstimate(tinyParams);
    expect(result.estimatedDesignCostMin).toBeGreaterThanOrEqual(8000);
  });
});
