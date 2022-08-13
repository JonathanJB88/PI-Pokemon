const { Router } = require("express");
const { allPokeInfo } = require("../controllers/Controllers.js");
const { Pokemon, Type } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const pokemons = await allPokeInfo();
    if (name) {
      const pokesByName = pokemons?.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      pokesByName.length > 0
        ? res.status(200).json(pokesByName)
        : res
            .status(404)
            .json({ error: "There is not a pokemon with that name" });
    } else {
      res.status(200).json(pokemons);
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemons = await allPokeInfo();
    if (id) {
      const pokemonId = pokemons?.find((p) => p.id.toString() === id);
      pokemonId
        ? res.status(200).json(pokemonId)
        : res
            .status(404)
            .json({ error: `There is not a pokemon with the id: ${id}` });
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createdInDb,
      types,
    } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createdInDb,
    });
    const typesSent = types.split(", ");
    const dbTypes = await Type.findAll({
      where: {
        name: typesSent.map((t) => t),
      },
    });
    if (!name) return res.status(404).send("The pokemon name must be provided");
    newPokemon.addType(dbTypes);
    res.status(200).send("The pokemon has been created");
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = router;
