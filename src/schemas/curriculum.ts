import j from 'joi'

export const schemaCurriculum = j.object({
    iduser: j.number().required(),
    idlevel: j.number().required(),
    city: j.string().min(3).max(30).required(),
    name: j.string().min(3).max(30).required(),
    office: j.string().min(3).max(100).required(),
    lastname: j.string().min(3).max(30).required(),
    tel: j.string()
    .regex(/^[0-9]{2}9[0-9]{8}$/)
    .message('Formato de número de celular inválido. Deve conter dois dígitos de DDD, um dígito "9" e mais oito dígitos numéricos.')
    .required(),
   state: j.string().max(2),
    email: j.string().email().required(),
    linkedin: j.string().allow(null).optional(),
    pcd:j.number().max(1).optional(),
    deficiency: j.string().allow(null).max(50).optional(),
    dateNasc: j.string().required(),
    github: j.string().max(250).allow(null).optional(),
    about: j.string().max(600).required(),

  });


  export const schemaCurriculumUpdate = j.object().keys(({
    iduser: j.number().optional(),
    city: j.string().min(3).max(30).optional(),
    tel: j.string()
    .regex(/^[0-9]{2}9[0-9]{8}$/)
    .message('Formato de número de celular inválido. Deve conter dois dígitos de DDD, um dígito "9" e mais oito dígitos numéricos.')
    .optional(),
   state: j.string().min(5).optional,
    email: j.string().email().optional(),
    linkedin: j.string().allow(null).max(250).optional(),
    pcd:j.number().max(1).optional(),
    deficiency: j.string().allow(null).max(100).optional(),
    dateNasc: j.string().optional(),
    github: j.string().allow(null).max(250).optional(),
    about: j.string().max(500).optional(),

  })).unknown(true)