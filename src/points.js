/*
Copyright 2021 Yegor Bitensky
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


/** Point logic. */
class Point {

  /**
   * Validate coordinate.
   * @param {number} value - Coordinate.
   */
  static validateCoordinate(value) {
    if (Number.isInteger(value)) return;
    throw Error('Point coordinate has to be an integer.');
  };

  /**
   * Validate coordinates.
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   */
  static validateCoordinates(x, y) {
    Point.validateCoordinate(x);
    Point.validateCoordinate(y);
  };

  /**
   * Creation.
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   */
  constructor(x, y) {
    Point.validateCoordinates(x, y);
    this._x = x;
    this._y = y;
  }

  /**
   * Primitive.
   * @return {string|null} Primitive value.
   */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.x},${this.y}`;
    }
    return null;
  }

  /**
   * Get x value.
   * @return {number} X coordinate.
   */
  get x() {
    return this._x;
  }

  /**
   * Get y value.
   * @return {number} Y coordinate.
   */
  get y() {
    return this._y;
  }
}


/** Points logic. */
class Points {

  /**
   * Validate items.
   * @param {number[][]} items - Array of (x, y) pairs.
   */
  static validateItems(items) {
    if (!Array.isArray(items)) {
      throw Error('Points items has to be an Array instance.');
    }
    for (let item of items) {
      if (!Array.isArray(item) || item.length != 2) {
        throw Error('Point coordinates has to be array of two integers.');
      }
      Point.validateCoordinates(...item);
    }
  };

  /**
   * Creation.
   * @param {number[][]} items - Array of (x, y) pairs.
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * Iterator.
   * @returns {Generator} Points.
   */
  *[Symbol.iterator]() {
      for (let item of this.items) {
          yield item;
      }
  }

  /**
   * Get items.
   * @returns {Point[]} Items.
   */
  get items() {
    return this._items;
  }

  /**
   * Set items.
   * @param {number[][]} items - Array of (x, y) pairs.
   */
  set items(items) {
    Points.validateItems(items);
    this._items = this._createItems(items);
  }

  /**
   * Get SVG string path.
   * @returns {string} SVG string path.
   */
  get path() {
    return this.items.map((point, index) => {
      let command = index === 0 ? 'M' : 'L';
      return `${command} ${point}`;
    }).join(' ');
  }

  /**
   * Create items.
   * @private
   * @param {number[][]} items - Array of (x, y) pairs.
   */
  _createItems(items) {
    return items.map(coords => new Point(...coords));
  }
}


/** PolygonPoints logic. */
class PolygonPoints extends Points {

  /**
   * Validate items.
   * @param {number[][]} items - Array of (x, y) pairs.
   */
  static validateItems(items) {
    Points.validateItems(items);
    if (
      items.length < 3
    ||
      items.length == 3
      &&
      items[0][0] == items[items.length - 1][0]
      &&
      items[0][1] == items[items.length - 1][1]
    ) {
      throw Error('Polygon points array has to include at least 3 items.');
    }
  };

  /**
   * Get items.
   * @returns {Point[]} Items.
   */
  get items() {
    return super.items;
  }

  /**
   * Set items.
   * @param {number[][]} itemsData - Array of (x, y) pairs.
   */
  set items(items) {
    PolygonPoints.validateItems(items);
    let latest = items.length - 1;
    if (items[0][0] != items[latest][0] || items[0][1] != items[latest][1]) {
      items.push(items[0]);
    }
    this._items = this._createItems(items);
  }
}


module.exports = {
  Point: Point,
  Points: Points,
  PolygonPoints: PolygonPoints,
};
