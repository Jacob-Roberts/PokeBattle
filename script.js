const stages = ["choose", "battleConfirm", "battle"];

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

      if (this.myPokemon.id === undefined)
        this.myPokemon = { ...pokemon, health: 100 };
      else this.opposingPokemon = { ...pokemon, health: 100 };
      this.search = "";

      if (
        this.myPokemon.id !== undefined &&
        this.opposingPokemon.id !== undefined
      ) {
        this.stage = "battleConfirm";
      }
    },
    startBattle() {
      this.stage = "battle";
    },
    attack1() {
      this.opposingPokemon.health -= 10;
    },
    attack2() {
      this.opposingPokemon.health -= 20;
    },
    attack3() {
      this.opposingPokemon.health -= 30;
    },
    attack4() {
      this.opposingPokemon.health -= 40;
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
    },
    opposingHealthColor() {
      if (this.opposingPokemon.health < 20) return "w3-red";
      if (this.opposingPokemon.health < 50) return "w3-yellow";
      return "w3-green";
    },
    myHealthColor() {
      if (this.myPokemon.health < 20) return "w3-red";
      if (this.myPokemon.health < 50) return "w3-yellow";
      return "w3-green";
    }
  }
});
