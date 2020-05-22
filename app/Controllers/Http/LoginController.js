'use strict'

const Usuarios = use('App/Models/Usuario')

const Env = use('Env')


class LoginController {

  async login({ response, request, params, auth }) {

    const { Usuario, Senha } = await request.all()
    try {
      const usuarioProcura = await Usuarios.findByOrFail('Usuario', Usuario)

      const senhaProcura = await Usuarios.findByOrFail('Senha', Senha)

      return Usuario

    } catch {
      return response.status(401).send({ Mensagem: 'Usuario ou Senha inválido' })
    }

  }

}

module.exports = LoginController
