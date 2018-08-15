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
    instance = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
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

  describe('GetCharactersCharacterIdClonesJumpClone', function() {
    it('should create an instance of GetCharactersCharacterIdClonesJumpClone', function() {
      // uncomment below and update the code to test GetCharactersCharacterIdClonesJumpClone
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
      //expect(instance).to.be.a(EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone);
    });

    it('should have the property implants (base name: "implants")', function() {
      // uncomment below and update the code to test the property implants
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
      //expect(instance).to.be();
    });

    it('should have the property jumpCloneId (base name: "jump_clone_id")', function() {
      // uncomment below and update the code to test the property jumpCloneId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
      //expect(instance).to.be();
    });

    it('should have the property locationId (base name: "location_id")', function() {
      // uncomment below and update the code to test the property locationId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
      //expect(instance).to.be();
    });

    it('should have the property locationType (base name: "location_type")', function() {
      // uncomment below and update the code to test the property locationType
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdClonesJumpClone();
      //expect(instance).to.be();
    });

  });

}));
