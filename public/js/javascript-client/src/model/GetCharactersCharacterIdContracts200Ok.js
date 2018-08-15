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
    root.EveSwaggerInterface.GetCharactersCharacterIdContracts200Ok = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GetCharactersCharacterIdContracts200Ok model module.
   * @module model/GetCharactersCharacterIdContracts200Ok
   * @version 0.8.5
   */

  /**
   * Constructs a new <code>GetCharactersCharacterIdContracts200Ok</code>.
   * 200 ok object
   * @alias module:model/GetCharactersCharacterIdContracts200Ok
   * @class
   * @param acceptorId {Number} Who will accept the contract
   * @param assigneeId {Number} ID to whom the contract is assigned, can be corporation or character ID
   * @param availability {module:model/GetCharactersCharacterIdContracts200Ok.AvailabilityEnum} To whom the contract is available
   * @param contractId {Number} contract_id integer
   * @param dateExpired {Date} Expiration date of the contract
   * @param dateIssued {Date} Сreation date of the contract
   * @param forCorporation {Boolean} true if the contract was issued on behalf of the issuer's corporation
   * @param issuerCorporationId {Number} Character's corporation ID for the issuer
   * @param issuerId {Number} Character ID for the issuer
   * @param status {module:model/GetCharactersCharacterIdContracts200Ok.StatusEnum} Status of the the contract
   * @param type {module:model/GetCharactersCharacterIdContracts200Ok.TypeEnum} Type of the contract
   */
  var exports = function(acceptorId, assigneeId, availability, contractId, dateExpired, dateIssued, forCorporation, issuerCorporationId, issuerId, status, type) {
    var _this = this;

    _this['acceptor_id'] = acceptorId;
    _this['assignee_id'] = assigneeId;
    _this['availability'] = availability;


    _this['contract_id'] = contractId;


    _this['date_expired'] = dateExpired;
    _this['date_issued'] = dateIssued;


    _this['for_corporation'] = forCorporation;
    _this['issuer_corporation_id'] = issuerCorporationId;
    _this['issuer_id'] = issuerId;



    _this['status'] = status;

    _this['type'] = type;

  };

  /**
   * Constructs a <code>GetCharactersCharacterIdContracts200Ok</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCharactersCharacterIdContracts200Ok} obj Optional instance to populate.
   * @return {module:model/GetCharactersCharacterIdContracts200Ok} The populated <code>GetCharactersCharacterIdContracts200Ok</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('acceptor_id')) {
        obj['acceptor_id'] = ApiClient.convertToType(data['acceptor_id'], 'Number');
      }
      if (data.hasOwnProperty('assignee_id')) {
        obj['assignee_id'] = ApiClient.convertToType(data['assignee_id'], 'Number');
      }
      if (data.hasOwnProperty('availability')) {
        obj['availability'] = ApiClient.convertToType(data['availability'], 'String');
      }
      if (data.hasOwnProperty('buyout')) {
        obj['buyout'] = ApiClient.convertToType(data['buyout'], 'Number');
      }
      if (data.hasOwnProperty('collateral')) {
        obj['collateral'] = ApiClient.convertToType(data['collateral'], 'Number');
      }
      if (data.hasOwnProperty('contract_id')) {
        obj['contract_id'] = ApiClient.convertToType(data['contract_id'], 'Number');
      }
      if (data.hasOwnProperty('date_accepted')) {
        obj['date_accepted'] = ApiClient.convertToType(data['date_accepted'], 'Date');
      }
      if (data.hasOwnProperty('date_completed')) {
        obj['date_completed'] = ApiClient.convertToType(data['date_completed'], 'Date');
      }
      if (data.hasOwnProperty('date_expired')) {
        obj['date_expired'] = ApiClient.convertToType(data['date_expired'], 'Date');
      }
      if (data.hasOwnProperty('date_issued')) {
        obj['date_issued'] = ApiClient.convertToType(data['date_issued'], 'Date');
      }
      if (data.hasOwnProperty('days_to_complete')) {
        obj['days_to_complete'] = ApiClient.convertToType(data['days_to_complete'], 'Number');
      }
      if (data.hasOwnProperty('end_location_id')) {
        obj['end_location_id'] = ApiClient.convertToType(data['end_location_id'], 'Number');
      }
      if (data.hasOwnProperty('for_corporation')) {
        obj['for_corporation'] = ApiClient.convertToType(data['for_corporation'], 'Boolean');
      }
      if (data.hasOwnProperty('issuer_corporation_id')) {
        obj['issuer_corporation_id'] = ApiClient.convertToType(data['issuer_corporation_id'], 'Number');
      }
      if (data.hasOwnProperty('issuer_id')) {
        obj['issuer_id'] = ApiClient.convertToType(data['issuer_id'], 'Number');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('reward')) {
        obj['reward'] = ApiClient.convertToType(data['reward'], 'Number');
      }
      if (data.hasOwnProperty('start_location_id')) {
        obj['start_location_id'] = ApiClient.convertToType(data['start_location_id'], 'Number');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('volume')) {
        obj['volume'] = ApiClient.convertToType(data['volume'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Who will accept the contract
   * @member {Number} acceptor_id
   */
  exports.prototype['acceptor_id'] = undefined;
  /**
   * ID to whom the contract is assigned, can be corporation or character ID
   * @member {Number} assignee_id
   */
  exports.prototype['assignee_id'] = undefined;
  /**
   * To whom the contract is available
   * @member {module:model/GetCharactersCharacterIdContracts200Ok.AvailabilityEnum} availability
   */
  exports.prototype['availability'] = undefined;
  /**
   * Buyout price (for Auctions only)
   * @member {Number} buyout
   */
  exports.prototype['buyout'] = undefined;
  /**
   * Collateral price (for Couriers only)
   * @member {Number} collateral
   */
  exports.prototype['collateral'] = undefined;
  /**
   * contract_id integer
   * @member {Number} contract_id
   */
  exports.prototype['contract_id'] = undefined;
  /**
   * Date of confirmation of contract
   * @member {Date} date_accepted
   */
  exports.prototype['date_accepted'] = undefined;
  /**
   * Date of completed of contract
   * @member {Date} date_completed
   */
  exports.prototype['date_completed'] = undefined;
  /**
   * Expiration date of the contract
   * @member {Date} date_expired
   */
  exports.prototype['date_expired'] = undefined;
  /**
   * Сreation date of the contract
   * @member {Date} date_issued
   */
  exports.prototype['date_issued'] = undefined;
  /**
   * Number of days to perform the contract
   * @member {Number} days_to_complete
   */
  exports.prototype['days_to_complete'] = undefined;
  /**
   * End location ID (for Couriers contract)
   * @member {Number} end_location_id
   */
  exports.prototype['end_location_id'] = undefined;
  /**
   * true if the contract was issued on behalf of the issuer's corporation
   * @member {Boolean} for_corporation
   */
  exports.prototype['for_corporation'] = undefined;
  /**
   * Character's corporation ID for the issuer
   * @member {Number} issuer_corporation_id
   */
  exports.prototype['issuer_corporation_id'] = undefined;
  /**
   * Character ID for the issuer
   * @member {Number} issuer_id
   */
  exports.prototype['issuer_id'] = undefined;
  /**
   * Price of contract (for ItemsExchange and Auctions)
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * Remuneration for contract (for Couriers only)
   * @member {Number} reward
   */
  exports.prototype['reward'] = undefined;
  /**
   * Start location ID (for Couriers contract)
   * @member {Number} start_location_id
   */
  exports.prototype['start_location_id'] = undefined;
  /**
   * Status of the the contract
   * @member {module:model/GetCharactersCharacterIdContracts200Ok.StatusEnum} status
   */
  exports.prototype['status'] = undefined;
  /**
   * Title of the contract
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Type of the contract
   * @member {module:model/GetCharactersCharacterIdContracts200Ok.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * Volume of items in the contract
   * @member {Number} volume
   */
  exports.prototype['volume'] = undefined;


  /**
   * Allowed values for the <code>availability</code> property.
   * @enum {String}
   * @readonly
   */
  exports.AvailabilityEnum = {
    /**
     * value: "public"
     * @const
     */
    "public": "public",
    /**
     * value: "personal"
     * @const
     */
    "personal": "personal",
    /**
     * value: "corporation"
     * @const
     */
    "corporation": "corporation",
    /**
     * value: "alliance"
     * @const
     */
    "alliance": "alliance"  };

  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "outstanding"
     * @const
     */
    "outstanding": "outstanding",
    /**
     * value: "in_progress"
     * @const
     */
    "in_progress": "in_progress",
    /**
     * value: "finished_issuer"
     * @const
     */
    "finished_issuer": "finished_issuer",
    /**
     * value: "finished_contractor"
     * @const
     */
    "finished_contractor": "finished_contractor",
    /**
     * value: "finished"
     * @const
     */
    "finished": "finished",
    /**
     * value: "cancelled"
     * @const
     */
    "cancelled": "cancelled",
    /**
     * value: "rejected"
     * @const
     */
    "rejected": "rejected",
    /**
     * value: "failed"
     * @const
     */
    "failed": "failed",
    /**
     * value: "deleted"
     * @const
     */
    "deleted": "deleted",
    /**
     * value: "reversed"
     * @const
     */
    "reversed": "reversed"  };

  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "unknown"
     * @const
     */
    "unknown": "unknown",
    /**
     * value: "item_exchange"
     * @const
     */
    "item_exchange": "item_exchange",
    /**
     * value: "auction"
     * @const
     */
    "auction": "auction",
    /**
     * value: "courier"
     * @const
     */
    "courier": "courier",
    /**
     * value: "loan"
     * @const
     */
    "loan": "loan"  };


  return exports;
}));


