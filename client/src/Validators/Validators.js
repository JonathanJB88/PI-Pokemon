const validateURL = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const validate = (input, pokemons) => {
  let errors = {};
  if (!input.name || !isNaN(input.name) || input.name.length < 1) {
    errors.name = "Please, type a name for your pokemon";
  } else if (
    pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())
  ) {
    errors.name = "There is already a pokemon with that name";
  } else if (!isNaN(input.abilities) || input.abilities.length <= 2) {
    errors.abilities = "Please, type the abilities of your pokemon";
  } else if (input.image.length > 0 && !validateURL(input.image)) {
    errors.image = "Please, insert a jpg, jpeg, png, webp, avif, gif, svg url";
  } else if (
    !input.hp ||
    input.hp > 100 ||
    input.hp < 0 ||
    isNaN(input.hp) ||
    input.hp.includes(".") ||
    input.hp.includes(",")
  ) {
    errors.hp = "Please, insert a valid integer number from 1 to 100";
  } else if (
    !input.attack ||
    input.attack > 100 ||
    input.attack < 0 ||
    isNaN(input.attack) ||
    input.attack.includes(".") ||
    input.attack.includes(",")
  ) {
    errors.attack = "Please, insert a valid integer number from 1 to 100";
  } else if (
    !input.defense ||
    input.defense > 100 ||
    input.defense < 0 ||
    isNaN(input.defense) ||
    input.defense.includes(".") ||
    input.defense.includes(",")
  ) {
    errors.defense = "Please, insert a valid integer number from 1 to 100";
  } else if (
    !input.speed ||
    input.speed > 100 ||
    input.speed < 0 ||
    isNaN(input.speed) ||
    input.speed.includes(".") ||
    input.speed.includes(",")
  ) {
    errors.speed = "Please, insert a valid integer number from 1 to 100";
  } else if (
    !input.height ||
    input.height > 100 ||
    input.height < 0 ||
    isNaN(input.height) ||
    input.height.includes(".") ||
    input.height.includes(",")
  ) {
    errors.height = "Please, insert a valid integer number from 1 to 100";
  } else if (
    !input.weight ||
    input.weight > 100 ||
    input.weight < 0 ||
    isNaN(input.weight) ||
    input.weight.includes(".") ||
    input.weight.includes(",")
  ) {
    errors.weight = "Please insert a valid integer number from 1 to 100";
  }
  return errors;
};

export const valSelect = (input) => {
  let errorSelect = {};
  if (input.types.length === 0 || input.types.length > 3) {
    errorSelect.types = "Please, choose from 1 to 3 pokemon types";
  }
  return errorSelect;
};
