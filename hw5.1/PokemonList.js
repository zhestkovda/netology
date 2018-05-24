const Pokemon  = require('./Pokemon.js');

class PokemonList extends Array{
  constructor(...items){
    items = items.filter(
      item => item instanceof Pokemon
    );
    super(...items);
  }
  
  add(name,level){
    let newPokemon = new Pokemon(name,level);
    this.push(newPokemon);
  }

  show(){
    this.forEach(function(item){
      item.show();
    });
    console.log(`There are ${this.length} pokemons here.`);
    return "There are " + this.length + " pokemons here.";
  }

  max(){
    let strongestPokemon = Math.max(...this);
    return this.find(
    item => item.level==strongestPokemon
    );
  }
}

module.exports = PokemonList;