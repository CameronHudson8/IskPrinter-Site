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
    root.EveSwaggerInterface.GetCorporationsCorporationIdWalletsDivisionTransactions200Ok = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GetCorporationsCorporationIdWalletsDivisionTransactions200Ok model module.
   * @module model/GetCorporationsCorporationIdWalletsDivisionTransactions200Ok
   * @version 0.8.5
   */

  /**
   * Constructs a new <code>GetCorporationsCorporationIdWalletsDivisionTransactions200Ok</code>.
   * wallet transaction
   * @alias module:model/GetCorporationsCorporationIdWalletsDivisionTransactions200Ok
   * @class
   * @param clientId {Number} client_id integer
   * @param _date {Date} Date and time of transaction
   * @param isBuy {Boolean} is_buy boolean
   * @param journalRefId {Number} -1 if there is no corresponding wallet journal entry
   * @param locationId {Number} location_id integer
   * @param quantity {Number} quantity integer
   * @param transactionId {Number} Unique transaction ID
   * @param typeId {Number} type_id integer
   * @param unitPrice {Number} Amount paid per unit
   */
  var exports = function(clientId, _date, isBuy, journalRefId, locationId, quantity, transactionId, typeId, unitPrice) {
    var _this = this;

    _this['client_id'] = clientId;
    _this['date'] = _date;
    _this['is_buy'] = isBuy;
    _this['journal_ref_id'] = journalRefId;
    _this['location_id'] = locationId;
    _this['quantity'] = quantity;
    _this['transaction_id'] = transactionId;
    _this['type_id'] = typeId;
    _this['unit_price'] = unitPrice;
  };

  /**
   * Constructs a <code>GetCorporationsCorporationIdWalletsDivisionTransactions200Ok</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCorporationsCorporationIdWalletsDivisionTransactions200Ok} obj Optional instance to populate.
   * @return {module:model/GetCorporationsCorporationIdWalletsDivisionTransactions200Ok} The populated <code>GetCorporationsCorporationIdWalletsDivisionTransactions200Ok</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('client_id')) {
        obj['client_id'] = ApiClient.convertToType(data['client_id'], 'Number');
      }
      if (data.hasOwnProperty('date')) {
        obj['date'] = ApiClient.convertToType(data['date'], 'Date');
      }
      if (data.hasOwnProperty('is_buy')) {
        obj['is_buy'] = ApiClient.convertToType(data['is_buy'], 'Boolean');
      }
      if (data.hasOwnProperty('journal_ref_id')) {
        obj['journal_ref_id'] = ApiClient.convertToType(data['journal_ref_id'], 'Number');
      }
      if (data.hasOwnProperty('location_id')) {
        obj['location_id'] = ApiClient.convertToType(data['location_id'], 'Number');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
      if (data.hasOwnProperty('transaction_id')) {
        obj['transaction_id'] = ApiClient.convertToType(data['transaction_id'], 'Number');
      }
      if (data.hasOwnProperty('type_id')) {
        obj['type_id'] = ApiClient.convertToType(data['type_id'], 'Number');
      }
      if (data.hasOwnProperty('unit_price')) {
        obj['unit_price'] = ApiClient.convertToType(data['unit_price'], 'Number');
      }
    }
    return obj;
  }

  /**
   * client_id integer
   * @member {Number} client_id
   */
  exports.prototype['client_id'] = undefined;
  /**
   * Date and time of transaction
   * @member {Date} date
   */
  exports.prototype['date'] = undefined;
  /**
   * is_buy boolean
   * @member {Boolean} is_buy
   */
  exports.prototype['is_buy'] = undefined;
  /**
   * -1 if there is no corresponding wallet journal entry
   * @member {Number} journal_ref_id
   */
  exports.prototype['journal_ref_id'] = undefined;
  /**
   * location_id integer
   * @member {Number} location_id
   */
  exports.prototype['location_id'] = undefined;
  /**
   * quantity integer
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;
  /**
   * Unique transaction ID
   * @member {Number} transaction_id
   */
  exports.prototype['transaction_id'] = undefined;
  /**
   * type_id integer
   * @member {Number} type_id
   */
  exports.prototype['type_id'] = undefined;
  /**
   * Amount paid per unit
   * @member {Number} unit_price
   */
  exports.prototype['unit_price'] = undefined;



  return exports;
}));


