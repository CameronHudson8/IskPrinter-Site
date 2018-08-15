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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.GetCharactersCharacterIdStatsInventory = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GetCharactersCharacterIdStatsInventory model module.
   * @module model/GetCharactersCharacterIdStatsInventory
   * @version 0.8.5
   */

  /**
   * Constructs a new <code>GetCharactersCharacterIdStatsInventory</code>.
   * inventory object
   * @alias module:model/GetCharactersCharacterIdStatsInventory
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>GetCharactersCharacterIdStatsInventory</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCharactersCharacterIdStatsInventory} obj Optional instance to populate.
   * @return {module:model/GetCharactersCharacterIdStatsInventory} The populated <code>GetCharactersCharacterIdStatsInventory</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('abandon_loot_quantity')) {
        obj['abandon_loot_quantity'] = ApiClient.convertToType(data['abandon_loot_quantity'], 'Number');
      }
      if (data.hasOwnProperty('trash_item_quantity')) {
        obj['trash_item_quantity'] = ApiClient.convertToType(data['trash_item_quantity'], 'Number');
      }
    }
    return obj;
  }

  /**
   * abandon_loot_quantity integer
   * @member {Number} abandon_loot_quantity
   */
  exports.prototype['abandon_loot_quantity'] = undefined;
  /**
   * trash_item_quantity integer
   * @member {Number} trash_item_quantity
   */
  exports.prototype['trash_item_quantity'] = undefined;



  return exports;
}));


