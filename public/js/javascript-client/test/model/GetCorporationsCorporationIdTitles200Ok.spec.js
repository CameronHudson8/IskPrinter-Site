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
    instance = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
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

  describe('GetCorporationsCorporationIdTitles200Ok', function() {
    it('should create an instance of GetCorporationsCorporationIdTitles200Ok', function() {
      // uncomment below and update the code to test GetCorporationsCorporationIdTitles200Ok
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be.a(EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok);
    });

    it('should have the property grantableRoles (base name: "grantable_roles")', function() {
      // uncomment below and update the code to test the property grantableRoles
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property grantableRolesAtBase (base name: "grantable_roles_at_base")', function() {
      // uncomment below and update the code to test the property grantableRolesAtBase
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property grantableRolesAtHq (base name: "grantable_roles_at_hq")', function() {
      // uncomment below and update the code to test the property grantableRolesAtHq
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property grantableRolesAtOther (base name: "grantable_roles_at_other")', function() {
      // uncomment below and update the code to test the property grantableRolesAtOther
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property roles (base name: "roles")', function() {
      // uncomment below and update the code to test the property roles
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property rolesAtBase (base name: "roles_at_base")', function() {
      // uncomment below and update the code to test the property rolesAtBase
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property rolesAtHq (base name: "roles_at_hq")', function() {
      // uncomment below and update the code to test the property rolesAtHq
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property rolesAtOther (base name: "roles_at_other")', function() {
      // uncomment below and update the code to test the property rolesAtOther
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

    it('should have the property titleId (base name: "title_id")', function() {
      // uncomment below and update the code to test the property titleId
      //var instane = new EveSwaggerInterface.GetCorporationsCorporationIdTitles200Ok();
      //expect(instance).to.be();
    });

  });

}));
