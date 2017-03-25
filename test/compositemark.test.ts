/* tslint:disable:quotemark */

import {assert} from 'chai';
import {normalize} from '../src/spec';

describe("normalizeErrorBar", () => {

    it("should produce correct layered specs for horizontal error bar", () => {
      assert.deepEqual(normalize({
        "description": "A error bar plot showing mean, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "transform": {"filter": "datum.year == 2000"},
        mark: "error-bar",
        encoding: {
          "y": {"field": "age","type": "ordinal"},
          "x": {
            "aggregate": "min",
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          },
          "x2": {
            "aggregate": "max",
            "field": "people",
            "type": "quantitative"
          },
          "size": {"value": 5}
        }
      }), {
        "description": "A error bar plot showing mean, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "transform": {"filter": "datum.year == 2000"},
        "layer": [
          {
            "mark": "rule",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "x2": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "size": {"value": 5}
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative",
                // "axis": {"title": "population"}
              },
              "size": {"value": 5}
            }
          }
        ]
      });
    });

   it("should throw error when missing x2 and y2", () => {
      assert.throws(() => {
        normalize({
          "description": "A error bar plot showing mean, min, and max in the US population distribution of age groups in 2000.",
          "data": {"url": "data/population.json"},
          "transform": {"filter": "datum.year == 2000"},
          mark: "error-bar",
          encoding: {
            "y": {"field": "age","type": "ordinal"},
            "x": {
              "aggregate": "min",
              "field": "people",
              "type": "quantitative",
              "axis": {"title": "population"}
            },
            "size": {"value": 5}
          }
        });
      }, Error, 'Neither x2 or y2 provided');
    });
 });


describe("normalizeBox", () => {
  it("should produce an error if both axes are continuous", () => {
    assert.throws(() => {
      normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "x": {"field": "people","type": "quantitative"},
          "y": {
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          },
          "size": {"value": 5},
          "color": {"value" : "white"}
        }
      });
    }, Error, 'Need one continuous and one discrete axis for 2D boxplots');
  });

  it("should produce an error if build 1D boxplot with a discrete axis", () => {
    assert.throws(() => {
      normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "x": {"field": "age", "type": "ordinal"}
        }
      });
    }, Error, 'Need a continuous axis for 1D boxplot');
  });

  it("should produce an error if both axes are discrete", () => {
    assert.throws(() => {
      normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "x": {"field": "age","type": "ordinal"},
          "y": {
            "field": "age",
            "type": "ordinal",
            "axis": {"title": "age"}
          },
          "size": {"value": 5},
          "color": {"value" : "white"}
        }
      });
    }, Error, 'Need one continuous and one discrete axis');
  });

  it("should produce correct layered specs for vertical boxplot with min and max lower and upper ticks", () => {
     assert.deepEqual(normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "x": {"field": "age","type": "ordinal"},
          "y": {
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          },
          "size": {"value": 5},
          "color": {"value" : "white"}
        }
      }), {
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "layer": [
          {
            "mark": "rule",
            "encoding": {
              "x": {"field": "age","type": "ordinal"},
              "y": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "y2": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "x": {"field": "age","type": "ordinal"},
              "y": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "x": {"field": "age","type": "ordinal"},
              "y": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "x": {"field": "age","type": "ordinal"},
              "y": {
                "aggregate": "q1",
                "field": "people",
                "type": "quantitative"
              },
              "y2": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "x": {"field": "age","type": "ordinal"},
              "y": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "y2": {
                "aggregate": "q3",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          }
        ]
      });
  });

  it("should produce correct layered specs for horizontal boxplot with min and max lower and upper ticks", () => {
     assert.deepEqual(normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "y": {"field": "age","type": "ordinal"},
          "x": {
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          },
          "size": {"value": 5},
          "color": {"value" : "white"}
        }
      }), {
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "layer": [
          {
            "mark": "rule",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "x2": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "q1",
                "field": "people",
                "type": "quantitative"
              },
              "x2": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "x2": {
                "aggregate": "q3",
                "field": "people",
                "type": "quantitative"
              },
              "size": {"value": 5},
              "color": {"value" : "white"}
            }
          }
        ]
      });
  });

  it("should produce correct layered specs for horizontal with no nonpositional encoding properties boxplot with min and max lower and upper ticks", () => {
     assert.deepEqual(normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "y": {"field": "age","type": "ordinal"},
          "x": {
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          }
        }
      }), {
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "layer": [
          {
            "mark": "rule",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "x2": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "q1",
                "field": "people",
                "type": "quantitative"
              },
              "x2": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "y": {"field": "age","type": "ordinal"},
              "x": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "x2": {
                "aggregate": "q3",
                "field": "people",
                "type": "quantitative"
              }
            }
          }
        ]
      });
  });

  it("should produce correct layered specs for 1D boxplot with only x", () => {
     assert.deepEqual(normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "x": {
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          }
        }
      }), {
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "layer": [
          {
            "mark": "rule",
            "encoding": {
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "x2": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "x": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "x": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "x": {
                "aggregate": "q1",
                "field": "people",
                "type": "quantitative"
              },
              "x2": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "x": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "x2": {
                "aggregate": "q3",
                "field": "people",
                "type": "quantitative"
              }
            }
          }
        ]
      });
  });

  it("should produce correct layered specs for 1D boxplot with only y", () => {
     assert.deepEqual(normalize({
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        mark: "box",
        encoding: {
          "y": {
            "field": "people",
            "type": "quantitative",
            "axis": {"title": "population"}
          }
        }
      }), {
        "description": "A box plot showing median, min, and max in the US population distribution of age groups in 2000.",
        "data": {"url": "data/population.json"},
        "layer": [
          {
            "mark": "rule",
            "encoding": {
              "y": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative",
                "axis": {"title": "population"}
              },
              "y2": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {
                "aggregate": "min",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "tick",
            "encoding": {
              "y": {
                "aggregate": "max",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "y": {
                "aggregate": "q1",
                "field": "people",
                "type": "quantitative"
              },
              "y2": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              }
            }
          },
          {
            "mark": "bar",
            "encoding": {
              "y": {
                "aggregate": "median",
                "field": "people",
                "type": "quantitative"
              },
              "y2": {
                "aggregate": "q3",
                "field": "people",
                "type": "quantitative"
              }
            }
          }
        ]
      });
  });

});
