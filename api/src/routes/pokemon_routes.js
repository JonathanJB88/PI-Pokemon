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
      abilities,
      createdInDb,
      types,
    } = req.body;

    const arrAbilities = abilities?.split(", ");

    const validateURL = (url) => {
      return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    };

    const pokemons = await allPokeInfo();
    const exists = pokemons?.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (!name || !isNaN(name) || name.length < 1) {
      return res
        .status(404)
        .json({ error: "The pokemon name must be provided" });
    } else if (image.length > 0 && !validateURL(image)) {
      return res.status(404).json({
        error: "The url format must be jpg, jpeg, png, webp, avif, gif or svg",
      });
    } else if (
      hp > 100 ||
      hp < 0 ||
      isNaN(hp) ||
      hp.includes(".") ||
      hp.includes(",")
    ) {
      return res.status(404).json({
        error: "The hp field must be an integer number from 1 to 100",
      });
    } else if (
      attack > 100 ||
      attack < 0 ||
      isNaN(attack) ||
      attack.includes(".") ||
      attack.includes(",")
    ) {
      return res.status(404).json({
        error: "The attack field must be an integer number from 1 to 100",
      });
    } else if (
      defense > 100 ||
      defense < 0 ||
      isNaN(defense) ||
      defense.includes(".") ||
      defense.includes(",")
    ) {
      return res.status(404).json({
        error: "The defense field must be an integer number from 1 to 100",
      });
    } else if (
      speed > 100 ||
      speed < 0 ||
      isNaN(speed) ||
      speed.includes(".") ||
      speed.includes(",")
    ) {
      return res.status(404).json({
        error: "The speed field must be an integer number from 1 to 100",
      });
    } else if (
      height > 100 ||
      height < 0 ||
      isNaN(height) ||
      height.includes(".") ||
      height.includes(",")
    ) {
      return res.status(404).json({
        error: "The height field must be an integer number from 1 to 100",
      });
    } else if (
      weight > 100 ||
      weight < 0 ||
      isNaN(weight) ||
      weight.includes(".") ||
      weight.includes(",")
    ) {
      return res.status(404).json({
        error: "The weight field must be an integer number from 1 to 100",
      });
    } else if (types.length === 0 || types.length > 3) {
      return res.status(404).json({
        error: "The pokemon types must be from 1 to 3",
      });
    } else if (!isNaN(abilities) || abilities.length <= 2) {
      return res
        .status(404)
        .json({ error: "Please, type just the abilities of your pokemon" });
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
        return res.send({ message: "You can not delete an original pokemon" });
      }
    }
  } catch (error) {
    console.log({ error: error.message });
    return res
      .status(404)
      .send({ message: "You can not delete an original pokemon" });
  }
});

// router.put("/update/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       hp,
//       attack,
//       defense,
//       speed,
//       height,
//       weight,
//       image,
//       abilities,
//       types,
//     } = req.body;
//     const arrAbilities = abilities?.split(", ");
//     if (id) {
//       const foundPokemon = await Pokemon.findByPk(id);
//       if (foundPokemon["createdInDb"]) {
//         await foundPokemon.update(
//           {
//             hp,
//             attack,
//             defense,
//             speed,
//             height,
//             weight,
//             abilities: arrAbilities.map(
//               (a) => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
//             ),
//             image: image
//               ? image
//               : "https://i.pinimg.com/originals/f9/7f/5c/f97f5c6510994f677877b08320475008.gif",
//           },
//           { where: { id: id } }
//         );

//         const dbTypes = await Type.findAll({
//           where: { name: types },
//         });
//         await foundPokemon.setTypes(dbTypes);
//         return res.send({
//           message: "Your pokemon has been successfully updated",
//         });
//       } else {
//         return res.send({ message: "You can not update an original pokemon" });
//       }
//     }
//   } catch (error) {
//     console.log({ error: error.message });
//     return res
//       .status(404)
//       .send({ message: "You can not update an original pokemon" });
//   }
// });

module.exports = router;
