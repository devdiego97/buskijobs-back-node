import j from 'joi'

export const schemaCompany = j.object().keys({
    idcreator:j.number().required(),
    logo:j.string().optional(),
    about:j.string().min(50).max(1000).required(),
    cnpj:j.string().length(14).pattern(/^\d{14}$/,"formato inválido,remova espaços,barras,traços u pontos").message('o cnpj deve ter 14 números somente'),
    instagram:j.string().allow(null).default(null).optional(),
    site:j.string().optional().allow(null).default(null),
    linkedin:j.string().allow(null).default(null).optional(),
    city:j.string().required(),
    state:j.string().max(2).required(),
    name: j.string().min(3).max(30).required(),
    tel: j.string()
    .regex(/^\d{10,11}$/).max(11)
    .message('Formato de número de celular inválido. Deve conter dois dígitos de DDD, um dígito "9" e mais oito dígitos numéricos.')
    .required(),
    email: j.string().email().required(),
  }).unknown();

  export const schemaCompanyUpdate = j.object().keys(
    {
        about:j.string().min(50).max(1000).optional(),
        cnpj:j.string().length(14).pattern(/^[0-9]+$/).optional(),
        instagram:j.string().optional(),
        site:j.string().optional(),
        linkedin:j.string().optional(),
        city:j.string().optional(),
        state:j.string().max(2).optional(),
        name: j.string().min(3).max(30).optional(),
        tel: j.string()
        .regex(/^[0-9]{2}9[0-9]{8}$/)
        .message('Formato de número de celular inválido. Deve conter dois dígitos de DDD, um dígito "9" e mais oito dígitos numéricos.')
        .optional(),
        email: j.string().email().optional(),
    }
  ).unknown(true)

