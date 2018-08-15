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
    instance = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
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

  describe('GetCharactersCharacterIdSkillqueue200Ok', function() {
    it('should create an instance of GetCharactersCharacterIdSkillqueue200Ok', function() {
      // uncomment below and update the code to test GetCharactersCharacterIdSkillqueue200Ok
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be.a(EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok);
    });

    it('should have the property finishDate (base name: "finish_date")', function() {
      // uncomment below and update the code to test the property finishDate
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property finishedLevel (base name: "finished_level")', function() {
      // uncomment below and update the code to test the property finishedLevel
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property levelEndSp (base name: "level_end_sp")', function() {
      // uncomment below and update the code to test the property levelEndSp
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property levelStartSp (base name: "level_start_sp")', function() {
      // uncomment below and update the code to test the property levelStartSp
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property queuePosition (base name: "queue_position")', function() {
      // uncomment below and update the code to test the property queuePosition
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property skillId (base name: "skill_id")', function() {
      // uncomment below and update the code to test the property skillId
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property startDate (base name: "start_date")', function() {
      // uncomment below and update the code to test the property startDate
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

    it('should have the property trainingStartSp (base name: "training_start_sp")', function() {
      // uncomment below and update the code to test the property trainingStartSp
      //var instane = new EveSwaggerInterface.GetCharactersCharacterIdSkillqueue200Ok();
      //expect(instance).to.be();
    });

  });

}));
