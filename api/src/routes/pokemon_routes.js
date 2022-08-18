const { Router } = require("express");
const { allPokeInfo } = require("../controllers/Controllers.js");
const { Pokemon, Type } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const pokemons = await allPokeInfo();
    if (name) {
      const pokesByName = pokemons?.filter(
        (p) => p.name.toLowerCase() === name.toLowerCase()
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

    console.log(name, image, types);

    const validateURL = (url) => {
      return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    };

    const exists = await Pokemon.findOne({ where: { name: name } });

    if (!name || typeof name !== "string" || name.length < 1) {
      return res
        .status(404)
        .json({ error: "The pokemon name must be provided" });
    } else if (image.length > 0 && !validateURL(image)) {
      return res.status(404).json({
        error: "The url format must be jpg, jpeg, png, webp, avif, gif or svg",
      });
    } else if (hp > 100 || hp < 0 || isNaN(hp)) {
      return res.status(404).json({
        error: "The hp field must be a number from 1 to 100",
      });
    } else if (attack > 100 || attack < 0 || isNaN(attack)) {
      return res.status(404).json({
        error: "The attack field must be a number from 1 to 100",
      });
    } else if (defense > 100 || defense < 0 || isNaN(defense)) {
      return res.status(404).json({
        error: "The defense field must be a number from 1 to 100",
      });
    } else if (speed > 100 || speed < 0 || isNaN(speed)) {
      return res.status(404).json({
        error: "The speed field must be a number from 1 to 100",
      });
    } else if (height > 100 || height < 0 || isNaN(height)) {
      return res.status(404).json({
        error: "The height field must be a number from 1 to 100",
      });
    } else if (weight > 100 || weight < 0 || isNaN(weight)) {
      return res.status(404).json({
        error: "The weight field must be a number from 1 to 100",
      });
    } else if (types.length === 0 || types.length > 3) {
      return res.status(404).json({
        error: "The pokemon types must be from 1 to 3",
      });
    } else if (exists) {
      return res.json({ error: "This pokemons already exists!" });
    } else {
      const newPokemon = await Pokemon.create({
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image: image
          ? image
          : "https://www.seekpng.com/png/full/125-1251017_can-you-become-a-pokmon-master-like-me.png",
        createdInDb,
      });
      const dbTypes = await Type.findAll({
        where: { name: types },
      });
      newPokemon.addType(dbTypes);
      res.status(200).send("The pokemon has been created");
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = router;
