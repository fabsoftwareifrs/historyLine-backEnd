const yup = require("yup");

const schemaStore = yup.object().shape({
  name: yup.string().required("Error: O campo nome é obrigario"),
  email: yup
    .string()
    .required("Error: O campo email é obrigario")
    .email("O campo email precisa ser uma email"),
  password: yup
    .string()
    .required("Error: O campo senha é obrigario")
    .min(5, "A senha deve ter no minino 5 digitos"),
});
const schemaAuth = yup.object().shape({
  email: yup
    .string()
    .required("Error: O campo email é obrigario")
    .email("O campo email precisa ser uma email"),
  password: yup.string().required("Error: O campo senha é obrigario"),
});

module.exports = { schemaStore, schemaAuth };
