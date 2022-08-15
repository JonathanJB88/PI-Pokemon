const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const pokeApiInfo = async () => {
  try {
    let allPokeInfo = [];
    const urlPoke1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
    let urlPromises1 = urlPoke1.data.results?.map((p) => axios.get(p.url));

    const urlPoke2 = await axios.get(urlPoke1.data.next);
    let urlPromises2 = urlPoke2.data.results?.map((p) => axios.get(p.url));

    let allUrlPromises = urlPromises1.concat(urlPromises2);

    await axios.all(allUrlPromises).then((url) => {
      url?.map((p) => {
        allPokeInfo.push({
          id: p.data.id,
          name: p.data.name,
          hp: p.data.stats.find((s) => s.stat.name === "hp").base_stat,
          attack: p.data.stats.find((s) => s.stat.name === "attack").base_stat,
          defense: p.data.stats.find((s) => s.stat.name === "defense")
            .base_stat,
          speed: p.data.stats.find((s) => s.stat.name === "speed").base_stat,
          height: p.data.height,
          weight: p.data.weight,
          types: p.data.types.map((t) => (t = { name: t.type.name })),
          image: p.data.sprites.other["official-artwork"].front_default,
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
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
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
