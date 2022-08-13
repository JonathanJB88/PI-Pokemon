const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemon = require("./pokemon_routes.js");
const type = require("./type_routes.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemon);
router.use("/types", type);

module.exports = router;
