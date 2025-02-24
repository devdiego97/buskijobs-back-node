import j from 'joi'

export const schemaRegister = j.object({
    name: j.string().min(3).max(30).required(),
    lastname: j.string().min(3).max(30).required(),
    tel: j.string().max(11)
    .regex(/^[0-9]{2}9[0-9]{8}$/)
    .message('Formato de número de celular inválido. Deve conter dois dígitos de DDD, um dígito "9" e mais oito dígitos numéricos.')
    .required(),
    type: j.string().min(5),
    email: j.string().email().required(),
    password: j.string().max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

  export const schemaUpdate = j.object().keys(
    {
      name: j.string().trim().min(3).max(30).optional(),
      lastname: j.string().trim().min(3).max(30).optional(),
      tel: j.string().trim()
      .regex(/^[0-9]{2}9[0-9]{8}$/)
      .message('Formato de número de celular inválido. Deve conter dois dígitos de DDD, um dígito "9" e mais oito dígitos numéricos.').optional(),
      email: j.string().trim().email().optional(),
      password: j.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional(),
    }
  ).unknown(true)

export const schemaLogin = j.object({
    type: j.string().trim().min(8).max(50).required(),
    email: j.string().trim().email().required(),
    password: j.string().trim().max(20).required(),
});