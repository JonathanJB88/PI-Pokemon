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

export const validate = (input, pokemons) => {
  let errors = {};
  if (!input.name || input.name.length < 1) {
    errors.name = "Please, type a name for your pokemon";
  } else if (!validateName(input.name)) {
    errors.name = "Only letters are accepted and 10 characters as maximum";
  } else if (
    pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())
  ) {
    errors.name = "There is already a pokemon with that name";
  } else if (
    !validateAbilities(input.abilities) ||
    input.abilities.length <= 2
  ) {
    errors.abilities =
      "Please, type the abilities (only letters, spaces and commas allowed)";
  } else if (input.image.length > 0 && !validateURL(input.image)) {
    errors.image = "Please, insert a jpg, jpeg, png, webp, avif, gif, svg url";
  } else if (!validateNumbers(input.hp)) {
    errors.hp = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.attack)) {
    errors.attack = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.defense)) {
    errors.defense = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.speed)) {
    errors.speed = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.height)) {
    errors.height = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.weight)) {
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

export const valUpdate = (input) => {
  let errors = {};
  if (!validateAbilities(input.abilities) || input.abilities.length <= 2) {
    errors.abilities =
      "Please, type the abilities (only letters, spaces and commas allowed)";
  } else if (input.image.length > 0 && !validateURL(input.image)) {
    errors.image = "Please, insert a jpg, jpeg, png, webp, avif, gif, svg url";
  } else if (!validateNumbers(input.hp)) {
    errors.hp = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.attack)) {
    errors.attack = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.defense)) {
    errors.defense = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.speed)) {
    errors.speed = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.height)) {
    errors.height = "Please, insert a valid integer number from 1 to 100";
  } else if (!validateNumbers(input.weight)) {
    errors.weight = "Please insert a valid integer number from 1 to 100";
  }
  return errors;
};
