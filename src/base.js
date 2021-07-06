/*
Copyright 2020 Yegor Bitensky
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


/** Helpful functionality. */
const UTILS = {

  /**
   * Create svg element.
   * @param {string} elementName - Name of created svg element like "svg", "circle" etc.
   */
  createSvgElement(elementName) {
    return document.createElementNS('http://www.w3.org/2000/svg', elementName);
  },
};


/** Dimensions logic. */
class Dimensions {

  /** Validate value. */
  static validate(value) {
    if (value instanceof Dimensions) return;
    throw Error('Value has to be an instance of Dimensions.');
  };

  /**
   * Creation.
   * @param {integer} width.
   * @param {integer} height.
   */
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  /**
   * Get width.
   * @return {integer} Width.
   */
  get width() {
    return this._width;
  }

  /**
   * Get height.
   * @return {integer} Height.
   */
  get height() {
    return this._height;
  }
}


module.exports = {
  UTILS: UTILS,
  Dimensions: Dimensions,
};
