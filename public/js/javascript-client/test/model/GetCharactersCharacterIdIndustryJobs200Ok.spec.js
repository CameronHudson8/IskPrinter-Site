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
    instance = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
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

  describe('GetCharactersCharacterIdIndustryJobs200Ok', function() {
    it('should create an instance of GetCharactersCharacterIdIndustryJobs200Ok', function() {
      // uncomment below and update the code to test GetCharactersCharacterIdIndustryJobs200Ok
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be.a(EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok);
    });

    it('should have the property activityId (base name: "activity_id")', function() {
      // uncomment below and update the code to test the property activityId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property blueprintId (base name: "blueprint_id")', function() {
      // uncomment below and update the code to test the property blueprintId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property blueprintLocationId (base name: "blueprint_location_id")', function() {
      // uncomment below and update the code to test the property blueprintLocationId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property blueprintTypeId (base name: "blueprint_type_id")', function() {
      // uncomment below and update the code to test the property blueprintTypeId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property completedCharacterId (base name: "completed_character_id")', function() {
      // uncomment below and update the code to test the property completedCharacterId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property completedDate (base name: "completed_date")', function() {
      // uncomment below and update the code to test the property completedDate
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property cost (base name: "cost")', function() {
      // uncomment below and update the code to test the property cost
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property duration (base name: "duration")', function() {
      // uncomment below and update the code to test the property duration
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property endDate (base name: "end_date")', function() {
      // uncomment below and update the code to test the property endDate
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property facilityId (base name: "facility_id")', function() {
      // uncomment below and update the code to test the property facilityId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property installerId (base name: "installer_id")', function() {
      // uncomment below and update the code to test the property installerId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property jobId (base name: "job_id")', function() {
      // uncomment below and update the code to test the property jobId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property licensedRuns (base name: "licensed_runs")', function() {
      // uncomment below and update the code to test the property licensedRuns
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property outputLocationId (base name: "output_location_id")', function() {
      // uncomment below and update the code to test the property outputLocationId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property pauseDate (base name: "pause_date")', function() {
      // uncomment below and update the code to test the property pauseDate
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property probability (base name: "probability")', function() {
      // uncomment below and update the code to test the property probability
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property productTypeId (base name: "product_type_id")', function() {
      // uncomment below and update the code to test the property productTypeId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property runs (base name: "runs")', function() {
      // uncomment below and update the code to test the property runs
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property startDate (base name: "start_date")', function() {
      // uncomment below and update the code to test the property startDate
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property stationId (base name: "station_id")', function() {
      // uncomment below and update the code to test the property stationId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

    it('should have the property successfulRuns (base name: "successful_runs")', function() {
      // uncomment below and update the code to test the property successfulRuns
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdIndustryJobs200Ok();
      //expect(instance).to.be();
    });

  });

}));
