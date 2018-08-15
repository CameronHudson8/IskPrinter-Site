/**
 * EVE Swagger Interface
 * An OpenAPI for EVE Online
 *
 * OpenAPI spec version: 0.8.5
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GetUniverseMoonsMoonIdPosition'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetUniverseMoonsMoonIdPosition'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.GetUniverseMoonsMoonIdOk = factory(root.EveSwaggerInterface.ApiClient, root.EveSwaggerInterface.GetUniverseMoonsMoonIdPosition);
  }
}(this, function(ApiClient, GetUniverseMoonsMoonIdPosition) {
  'use strict';




  /**
   * The GetUniverseMoonsMoonIdOk model module.
   * @module model/GetUniverseMoonsMoonIdOk
   * @version 0.8.5
   */

  /**
   * Constructs a new <code>GetUniverseMoonsMoonIdOk</code>.
   * 200 ok object
   * @alias module:model/GetUniverseMoonsMoonIdOk
   * @class
   * @param moonId {Number} moon_id integer
   * @param name {String} name string
   * @param position {module:model/GetUniverseMoonsMoonIdPosition} 
   * @param systemId {Number} The solar system this moon is in
   */
  var exports = function(moonId, name, position, systemId) {
    var _this = this;

    _this['moon_id'] = moonId;
    _this['name'] = name;
    _this['position'] = position;
    _this['system_id'] = systemId;
  };

  /**
   * Constructs a <code>GetUniverseMoonsMoonIdOk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetUniverseMoonsMoonIdOk} obj Optional instance to populate.
   * @return {module:model/GetUniverseMoonsMoonIdOk} The populated <code>GetUniverseMoonsMoonIdOk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('moon_id')) {
        obj['moon_id'] = ApiClient.convertToType(data['moon_id'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('position')) {
        obj['position'] = GetUniverseMoonsMoonIdPosition.constructFromObject(data['position']);
      }
      if (data.hasOwnProperty('system_id')) {
        obj['system_id'] = ApiClient.convertToType(data['system_id'], 'Number');
      }
    }
    return obj;
  }

  /**
   * moon_id integer
   * @member {Number} moon_id
   */
  exports.prototype['moon_id'] = undefined;
  /**
   * name string
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {module:model/GetUniverseMoonsMoonIdPosition} position
   */
  exports.prototype['position'] = undefined;
  /**
   * The solar system this moon is in
   * @member {Number} system_id
   */
  exports.prototype['system_id'] = undefined;



  return exports;
}));


