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
      pokesByName.length > 0 ? res.status(200).json(pokesByName) : res.json([]);
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
      abilities,
      createdInDb,
      types,
    } = req.body;

    const arrAbilities = abilities?.split(", ");

    const validateURL = (url) => {
      return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    };

    const validateName = (name) => {
      return /^[a-zA-Z]{1,10}$/.test(name);
    };

    const validateNumbers = (value) => {
      return /^[1-9][0-9]?$|^100$/.test(value);
    };

    const validateAbilities = (value) => {
      return /^[a-zA-Z,\s]*$/g.test(value);
    };

    const pokemons = await allPokeInfo();
    const exists = pokemons?.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (!name || name.length < 1) {
      return res
        .status(404)
        .json({ error: "The pokemon name must be provided" });
    } else if (!validateName(name)) {
      return res.status(404).json({
        error: "Only letters are accepted and 10 characters as maximum",
      });
    } else if (image.length > 0 && !validateURL(image)) {
      return res.status(404).json({
        error: "The url format must be jpg, jpeg, png, webp, avif, gif or svg",
      });
    } else if (!validateNumbers(hp)) {
      return res.status(404).json({
        error: "The hp field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(attack)) {
      return res.status(404).json({
        error: "The attack field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(defense)) {
      return res.status(404).json({
        error: "The defense field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(speed)) {
      return res.status(404).json({
        error: "The speed field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(height)) {
      return res.status(404).json({
        error: "The height field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(weight)) {
      return res.status(404).json({
        error: "The weight field must be an integer number from 1 to 100",
      });
    } else if (types.length === 0 || types.length > 3) {
      return res.status(404).json({
        error: "The pokemon types must be from 1 to 3",
      });
    } else if (!validateAbilities(abilities) || abilities.length <= 2) {
      return res.status(404).json({
        error:
          "Please, type the abilities (only letters, spaces and commas allowed)",
      });
    } else if (exists.length) {
      console.log({ error: "This pokemons already exists!" });
      return res.status(404).json({ error: "This pokemons already exists!" });
    } else {
      const newPokemon = await Pokemon.create({
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        abilities: arrAbilities.map(
          (a) => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
        ),
        image: image
          ? image
          : "https://i.pinimg.com/originals/f9/7f/5c/f97f5c6510994f677877b08320475008.gif",
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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const foundPokemon = await Pokemon.findByPk(id);
      if (foundPokemon["createdInDb"]) {
        await foundPokemon.destroy();
        return res.send({
          message: "Your pokemon has been successfully deleted",
        });
      } else {
        return res
          .status(404)
          .json({ message: "You can not delete an original pokemon" });
      }
    }
  } catch (error) {
    console.log({ error: error.message });
    return res
      .status(404)
      .send({ message: "You can not delete an original pokemon" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      abilities,
      types,
    } = req.body;
    const arrAbilities = abilities?.split(", ");

    const validateURL = (url) => {
      return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    };
    const validateNumbers = (value) => {
      return /^[1-9][0-9]?$|^100$/.test(value);
    };
    const validateAbilities = (value) => {
      return /^[a-zA-Z,\s]*$/g.test(value);
    };

    if (image.length > 0 && !validateURL(image)) {
      return res.status(404).json({
        error: "The url format must be jpg, jpeg, png, webp, avif, gif or svg",
      });
    } else if (!validateNumbers(hp)) {
      return res.status(404).json({
        error: "The hp field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(attack)) {
      return res.status(404).json({
        error: "The attack field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(defense)) {
      return res.status(404).json({
        error: "The defense field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(speed)) {
      return res.status(404).json({
        error: "The speed field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(height)) {
      return res.status(404).json({
        error: "The height field must be an integer number from 1 to 100",
      });
    } else if (!validateNumbers(weight)) {
      return res.status(404).json({
        error: "The weight field must be an integer number from 1 to 100",
      });
    } else if (types.length === 0 || types.length > 3) {
      return res.status(404).json({
        error: "The pokemon types must be from 1 to 3",
      });
    } else if (!validateAbilities(abilities) || abilities.length <= 2) {
      return res.status(404).json({
        error:
          "Please, type the abilities (only letters, spaces and commas allowed)",
      });
    } else {
      if (id) {
        const foundPokemon = await Pokemon.findByPk(id);
        if (foundPokemon["createdInDb"]) {
          await foundPokemon.update(
            {
              hp,
              attack,
              defense,
              speed,
              height,
              weight,
              abilities: arrAbilities.map(
                (a) => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
              ),
              image: image
                ? image
                : "https://i.pinimg.com/originals/f9/7f/5c/f97f5c6510994f677877b08320475008.gif",
            },
            { where: { id: id } }
          );

          const dbTypes = await Type.findAll({
            where: { name: types },
          });
          await foundPokemon.setTypes(dbTypes);
          return res.json({
            message: "Your pokemon has been successfully updated",
          });
        } else {
          return res.json({
            message: "You can not update an original pokemon",
          });
        }
      }
    }
  } catch (error) {
    console.log({ error: error.message });
    return res
      .status(404)
      .json({ message: "You can not update an original pokemon" });
  }
});

module.exports = router;
