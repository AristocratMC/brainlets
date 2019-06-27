export const GROWTH_FACTORS = {
  mod: {
    basic: {
      hp: [96.283, 0.138],
      armor: [13.979, 0.04],
      eva: [5],
      acc: [5],
      fp: [16],
      rof: [45],
    },
    grow: {
      eva: [0.075, 22.572],
      acc: [0.075, 22.572],
      fp: [0.06, 18.018],
      rof: [0.022, 15.741]
    }
  },
  normal: {
    basic: {
      hp: [55, 0.555],
      armor: [2, 0.161],
      eva: [5],
      acc: [5],
      fp: [16],
      rof: [45],
    },
    grow: {
      eva: [0.303, 0],
      acc: [0.303, 0],
      fp: [0.242, 0],
      rof: [0.181, 0]
    }
  }
};

export const TYPE_MAPPING = {
  1: 'HG',
  2: 'SMG',
  3: 'RF',
  4: 'AR',
  5: 'MG',
  6: 'SG'
};

export const TYPE_SCALARS = [
  { hp: 0.6, fp: 0.6, rof: 0.8, acc: 1.2, eva: 1.8, armor: 0 }, //hg
  { hp: 1.6, fp: 0.6, rof: 1.2, acc: 0.3, eva: 1.6, armor: 0 }, //smg
  { hp: 0.8, fp: 2.4, rof: 0.5, acc: 1.6, eva: 0.8, armor: 0 }, //rf
  { hp: 1.0, fp: 1.0, rof: 1.0, acc: 1.0, eva: 1.0, armor: 0 }, //ar
  { hp: 1.5, fp: 1.8, rof: 1.6, acc: 0.6, eva: 0.6, armor: 0 }, //mg
  { hp: 2.0, fp: 0.7, rof: 0.4, acc: 0.3, eva: 0.3, armor: 1 }, //sg
]; 

export default class dollUtils {
  /**
   * Returns object containing stats of the given T-Doll
   * at the provided level.
   * 
   * @param {Object} dollData - Object with T-Doll data
   * @param {number} level - Level to get the stats for the T-Doll
   * 
   * @returns {Object} New object containing attributes 
   *   <code>[hp, fp, acc, eva, rof, armor, crit, critdmg, ap, rounds]</code>
   *   for the T-Doll at the specified level. 
   */
  static getStatsAtLevel(dollData, level) {
    let dolldummy = {};
    let dollTypeScalars = TYPE_SCALARS[dollData.type - 1];

    let basicFactors = level > 100 ? GROWTH_FACTORS.mod.basic : GROWTH_FACTORS.normal.basic;
    let growFactors = level > 100 ? GROWTH_FACTORS.mod.grow : GROWTH_FACTORS.normal.grow;

    dolldummy.hp = Math.ceil((basicFactors.hp[0] + ((level - 1) * basicFactors.hp[1])) * dollTypeScalars.hp * dollData.hp / 100);

    dolldummy.fp = Math.ceil(basicFactors.fp[0] * dollTypeScalars.fp * dollData.fp / 100);
    dolldummy.fp += Math.ceil((growFactors.fp[1] + ((level - 1) * growFactors.fp[0])) * dollTypeScalars.fp * dollData.fp * dollData.growth_rating / 100 / 100);

    dolldummy.acc = Math.ceil(basicFactors.acc[0] * dollTypeScalars.acc * dollData.acc / 100);
    dolldummy.acc += Math.ceil((growFactors.acc[1] + ((level - 1) * growFactors.acc[0])) * dollTypeScalars.acc * dollData.acc * dollData.growth_rating / 100 / 100);

    dolldummy.eva = Math.ceil(basicFactors.eva[0] * dollTypeScalars.eva * dollData.eva / 100);
    dolldummy.eva += Math.ceil((growFactors.eva[1] + ((level - 1) * growFactors.eva[0])) * dollTypeScalars.eva * dollData.eva * dollData.growth_rating / 100 / 100);

    dolldummy.rof = Math.ceil(basicFactors.rof[0] * dollTypeScalars.rof * dollData.rof / 100);
    dolldummy.rof += Math.ceil((growFactors.rof[1] + ((level - 1) * growFactors.rof[0])) * dollTypeScalars.rof * dollData.rof * dollData.growth_rating / 100 / 100);

    dolldummy.armor = Math.ceil((basicFactors.armor[0] + ((level - 1) * basicFactors.armor[1])) * dollTypeScalars.armor * dollData.armor / 100);

    dolldummy.crit = dollData.crit;
    dolldummy.critdmg = dollData.critdmg;
    dolldummy.ap = dollData.ap;
    dolldummy.rounds = dollData.rounds;

    return dolldummy;
  }
}