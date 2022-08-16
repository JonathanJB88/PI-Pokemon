const { Router } = require("express");
const { Type } = require("../db.js");
const { allPokeInfo } = require("../controllers/Controllers.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pokemons = await allPokeInfo();
    const types = pokemons?.map((p) => p.types).flat();
    const listTypes = [];
    types?.forEach((t) => {
      if (!listTypes.includes(t.name)) listTypes.push(t.name);
    });

    listTypes?.forEach((t) => {
      Type.findOrCreate({ where: { name: t } });
    });

    const allTypes = await Type.findAll();
    res.status(200).json(allTypes);
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = router;
