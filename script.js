const stages = ["choose", "battle"];

const PokemonAPI = new Pokedex.Pokedex();

let app = new Vue({
  el: "#app",
  data: {
    stage: "choose",
    myPokemon: {},
    opposingPokemon: {},
    loading: false,
    search: ""
  },
  methods: {
    async chooseMyPokemon() {
      var pokemon = await PokemonAPI.getPokemonByName(
        this.search.toLowerCase()
      );

      if (this.myPokemon.id === undefined) this.myPokemon = pokemon;
      else this.opposingPokemon = pokemon;
      this.search = "";

      if (
        this.myPokemon.id !== undefined &&
        this.opposingPokemon.id !== undefined
      ) {
        this.stage = "battle";
      }
    }
  },
  computed: {
    myTypes() {
      return [...this.myPokemon.types]
        .sort((a, b) => a.slot - b.slot)
        .map(i => i.type.name)
        .join(", ");
    },
    opponentTypes() {
      return [...this.opposingPokemon.types]
        .sort((a, b) => a.slot - b.slot)
        .map(i => i.type.name)
        .join(", ");
    },
    myAbilities() {
      return [...this.myPokemon.abilities]
        .sort((a, b) => a.slot - b.slot)
        .map(i => i.ability.name)
        .join(", ");
    },
    opponentAbilities() {
      return [...this.opposingPokemon.abilities]
        .sort((a, b) => a.slot - b.slot)
        .map(i => i.ability.name)
        .join(", ");
    }
  }
});
