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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.EveSwaggerInterface);
  }
}(this, function(expect, EveSwaggerInterface) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('GetCorporationsCorporationIdBlueprints200Ok', function() {
    it('should create an instance of GetCorporationsCorporationIdBlueprints200Ok', function() {
      // uncomment below and update the code to test GetCorporationsCorporationIdBlueprints200Ok
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be.a(EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok);
    });

    it('should have the property itemId (base name: "item_id")', function() {
      // uncomment below and update the code to test the property itemId
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property locationFlag (base name: "location_flag")', function() {
      // uncomment below and update the code to test the property locationFlag
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property locationId (base name: "location_id")', function() {
      // uncomment below and update the code to test the property locationId
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property materialEfficiency (base name: "material_efficiency")', function() {
      // uncomment below and update the code to test the property materialEfficiency
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property quantity (base name: "quantity")', function() {
      // uncomment below and update the code to test the property quantity
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property runs (base name: "runs")', function() {
      // uncomment below and update the code to test the property runs
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property timeEfficiency (base name: "time_efficiency")', function() {
      // uncomment below and update the code to test the property timeEfficiency
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

    it('should have the property typeId (base name: "type_id")', function() {
      // uncomment below and update the code to test the property typeId
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdBlueprints200Ok();
      //expect(instance).to.be();
    });

  });

}));
