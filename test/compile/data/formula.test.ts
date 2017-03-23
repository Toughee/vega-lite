/* tslint:disable:quotemark */
import {assert} from 'chai';
import {formula} from '../../../src/compile/data/formula';
import {Formula} from '../../../src/transform';
import {Dict, hash} from '../../../src/util';
import {parseUnitModel} from '../../util';

describe('compile/data/formula', () => {
  describe('parseUnit', () => {
    it('should return a dictionary of formula', () => {
      const f: Formula = {
        "as": "a",
        "expr": "5"
      };
      const model = parseUnitModel({
        "data": {"url": "a.json"},
        "transform": {
          "calculate": [f]
        },
        "mark": "point",
        "encoding": {}
      });

      const formulaComponent = formula.parseUnit(model);
      const hashed = hash(f);
      let expected = {};
      expected[hashed] = f;
      assert.deepEqual(formulaComponent, expected);
    });
  });

  describe('parseLayer', function() {
    // TODO: write test
  });

  describe('parseFacet', function() {
    // TODO: write test
  });

  describe('assemble', function() {
    it('should return correct vega formula transform', () => {
      assert.deepEqual(formula.assemble({
        aaa: {as: 'a', expr: '5'}
      } as Dict<Formula>), [{
        type: 'formula',
        as: 'a',
        expr: '5'
      }]);
    });
  });
});
