const expect = require('chai').expect;
const assert = require('chai').assert;

const PokemonList = require('../PokemonList.js')
const Pokemon  = require('../Pokemon.js')

describe ('All tests', () => {
  
  before(function() {
	 // runs before each test in this block
	 pokemon = new Pokemon("Dima",3);  	 
  });

  describe('Pokemon class', () => {
  	it('метод show', () => {
  		const res = pokemon.show();
  		assert.equal(res, "Hi! My name is Dima, my level is 3")

  	})
  });

  before(function() {
	 // runs before each test in this block
	 pokemon1 = new Pokemon("Dima",333);
	 pokemon2 = new Pokemon("Ivan",2);
	 pokemon3 = new Pokemon("Petr",22);
	 pokemonlist = new PokemonList(pokemon1, pokemon2, pokemon3);  	 
  });

  describe('PokemonList class', () => {
  	it('метод add', () => {
  	  pokemonlist.add("Pavel",123);
  	  assert.equal(4, pokemonlist.length);
  	})

  	it('метод show', () => {
  		const res = pokemonlist.show();
	 	console.log('res = ', res); 
  		assert.equal(res, "There are 4 pokemons here.");
  	})

  	it('метод max', () => {
      const res = pokemonlist.max();
      assert.deepEqual(res, pokemon1);
  	})
  });

})