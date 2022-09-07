const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const pokeApiInfo = async () => {
  try {
    let allPokeInfo = [];
    const urlPoke1 = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=126"
    );
    let urlPromises1 = urlPoke1.data.results?.map((p) => axios.get(p.url));

    const urlPoke2 = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=126&limit=125"
    );
    let urlPromises2 = urlPoke2.data.results?.map((p) => axios.get(p.url));

    let allUrlPromises = urlPromises1.concat(urlPromises2);

    await axios.all(allUrlPromises).then((url) => {
      url?.map((p) => {
        allPokeInfo.push({
          id: p.data.id,
          name: p.data.name.charAt(0).toUpperCase() + p.data.name.slice(1),
          hp: p.data.stats.find((s) => s.stat.name === "hp").base_stat,
          attack: p.data.stats.find((s) => s.stat.name === "attack").base_stat,
          defense: p.data.stats.find((s) => s.stat.name === "defense")
            .base_stat,
          speed: p.data.stats.find((s) => s.stat.name === "speed").base_stat,
          height: p.data.height,
          weight: p.data.weight,
          abilities: p.data.abilities.map(
            (a) =>
              a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)
          ),
          types: p.data.types.map(
            (t) =>
              (t = {
                name:
                  t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1),
              })
          ),
          image: p.data.sprites.other.dream_world.front_default,
        });
      });
    });
    return allPokeInfo;
  } catch (error) {
    console.log({ error: error.message });
  }
};

const pokeDbInfo = async () => {
  try {
    const pokemons = await Pokemon.findAll({
      include: Type,
    });
    return pokemons;
  } catch (error) {
    console.log({ error: error.message });
  }
};

const allPokeInfo = async () => {
  try {
    const pokeInfo = await pokeApiInfo();
    const dbPokeInfo = await pokeDbInfo();
    const allPokemons = pokeInfo.concat(dbPokeInfo);
    return allPokemons;
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  pokeApiInfo,
  pokeDbInfo,
  allPokeInfo,
};
