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
    define(['ApiClient', 'model/GetCharactersCharacterIdMailMailIdRecipient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetCharactersCharacterIdMailMailIdRecipient'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.GetCharactersCharacterIdMailMailIdOk = factory(root.EveSwaggerInterface.ApiClient, root.EveSwaggerInterface.GetCharactersCharacterIdMailMailIdRecipient);
  }
}(this, function(ApiClient, GetCharactersCharacterIdMailMailIdRecipient) {
  'use strict';




  /**
   * The GetCharactersCharacterIdMailMailIdOk model module.
   * @module model/GetCharactersCharacterIdMailMailIdOk
   * @version 0.8.5
   */

  /**
   * Constructs a new <code>GetCharactersCharacterIdMailMailIdOk</code>.
   * 200 ok object
   * @alias module:model/GetCharactersCharacterIdMailMailIdOk
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>GetCharactersCharacterIdMailMailIdOk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCharactersCharacterIdMailMailIdOk} obj Optional instance to populate.
   * @return {module:model/GetCharactersCharacterIdMailMailIdOk} The populated <code>GetCharactersCharacterIdMailMailIdOk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('body')) {
        obj['body'] = ApiClient.convertToType(data['body'], 'String');
      }
      if (data.hasOwnProperty('from')) {
        obj['from'] = ApiClient.convertToType(data['from'], 'Number');
      }
      if (data.hasOwnProperty('labels')) {
        obj['labels'] = ApiClient.convertToType(data['labels'], ['Number']);
      }
      if (data.hasOwnProperty('read')) {
        obj['read'] = ApiClient.convertToType(data['read'], 'Boolean');
      }
      if (data.hasOwnProperty('recipients')) {
        obj['recipients'] = ApiClient.convertToType(data['recipients'], [GetCharactersCharacterIdMailMailIdRecipient]);
      }
      if (data.hasOwnProperty('subject')) {
        obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
      }
      if (data.hasOwnProperty('timestamp')) {
        obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Mail's body
   * @member {String} body
   */
  exports.prototype['body'] = undefined;
  /**
   * From whom the mail was sent
   * @member {Number} from
   */
  exports.prototype['from'] = undefined;
  /**
   * Labels attached to the mail
   * @member {Array.<Number>} labels
   */
  exports.prototype['labels'] = undefined;
  /**
   * Whether the mail is flagged as read
   * @member {Boolean} read
   */
  exports.prototype['read'] = undefined;
  /**
   * Recipients of the mail
   * @member {Array.<module:model/GetCharactersCharacterIdMailMailIdRecipient>} recipients
   */
  exports.prototype['recipients'] = undefined;
  /**
   * Mail subject
   * @member {String} subject
   */
  exports.prototype['subject'] = undefined;
  /**
   * When the mail was sent
   * @member {Date} timestamp
   */
  exports.prototype['timestamp'] = undefined;



  return exports;
}));


