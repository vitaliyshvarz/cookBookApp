
var should      = require('should'),
    db          = require('../src/config/db.js'),
    models      = require('../dbmodels/Recipes.js'),
    Recipes      = models.Recipes,
    dbURI       = 'mongodb://localhost/test';
// DB
var mongo = require('mocha-mongo')('mongodb://localhost/test');
var ready = mongo.ready();

describe('db', function () {

    it('should have Recipes', function () {
        models.should.be.have.property('Recipes');
    });

    describe('Recipes', function () {

        it('should be have #find method', function () {
            Recipes.should.be.have.property('find');
            Recipes.find.should.be.type('function');
        });

        it('should be have #findById method', function () {
            Recipes.should.be.have.property('findById');
            Recipes.findById.should.be.type('function');
        });

        it('should be have #save method', function () {
            Recipes.prototype.should.be.have.property('save');
            Recipes.prototype.save.should.be.type('function');
        });

        it('should be have #toJSON method', function () {
            Recipes.prototype.should.be.have.property('toJSON');
            Recipes.prototype.toJSON.should.be.type('function');
        });

        describe('#find', function () {
            var Recipes;
            beforeEach(function() {

            });

            it('should return number of recipes', ready(function(db, done) {
                db.collection('recipes').count(function(err, count) {
                    recipes = count;
                    done();
                });

            }));

            it('should add recipe', ready(function(db, done) {
                db.collection('recipes').insert({name: 'test', email: 'test@mail.com'}, done);
            }));

            it('should add recipe', ready(function(db, done) {
                db.collection('recipes').find().count(function(err, count) {
                    count.should.be.exactly(++recipes);
                    done();
                });
            }));

        });

    });

});