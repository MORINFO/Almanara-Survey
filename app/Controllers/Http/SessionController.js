'use strict'

const User = use('App/Models/Usuario')

class SessionController {
  async store({ request, response, auth }) {

    const data = await request.all()
    
    const busca = await User.query()
      .where('Usuario', '=', data.Usuario)
      .andWhere('Senha', '=', data.Senha)
      .andWhere('UsaControleEPI', '=', 'S').fetch()
      

    const convert = busca.toJSON()

    const Usuario = convert[0]
  
    if (!Usuario) {
      return response.status(401).send({ Mensagem: 'Usuario não identificado!' })
    }

    return Usuario

  }
}
module.exports = SessionController
