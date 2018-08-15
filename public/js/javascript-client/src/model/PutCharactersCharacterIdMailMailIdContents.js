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
    root.EveSwaggerInterface.PutCharactersCharacterIdMailMailIdContents = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PutCharactersCharacterIdMailMailIdContents model module.
   * @module model/PutCharactersCharacterIdMailMailIdContents
   * @version 0.8.5
   */

  /**
   * Constructs a new <code>PutCharactersCharacterIdMailMailIdContents</code>.
   * contents object
   * @alias module:model/PutCharactersCharacterIdMailMailIdContents
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>PutCharactersCharacterIdMailMailIdContents</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PutCharactersCharacterIdMailMailIdContents} obj Optional instance to populate.
   * @return {module:model/PutCharactersCharacterIdMailMailIdContents} The populated <code>PutCharactersCharacterIdMailMailIdContents</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('labels')) {
        obj['labels'] = ApiClient.convertToType(data['labels'], ['Number']);
      }
      if (data.hasOwnProperty('read')) {
        obj['read'] = ApiClient.convertToType(data['read'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Labels to assign to the mail. Pre-existing labels are unassigned.
   * @member {Array.<Number>} labels
   */
  exports.prototype['labels'] = undefined;
  /**
   * Whether the mail is flagged as read
   * @member {Boolean} read
   */
  exports.prototype['read'] = undefined;



  return exports;
}));


