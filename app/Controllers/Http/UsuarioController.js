'use strict'

const Usuario = use('App/Models/Usuario')

class UsuarioController {
  
  async store({request, response}){

   try{
    const data = await request.all()

    const usuario = await Usuario.create(data)

    return usuario

   } 
   catch(err){

    return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )

   }

  }

  async update({ request, response }) {
    try{

      const {usuario} = await request.all()

      const usuario = await Usuario.findByOrFail('usuario', usuario)
      const data = request.all()
    
      await usuario.merge(data);
      await usuario.save();

      return usuario
    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }
  }

  async show ({ request,params }){

    const {usuario} = await request.all(params)

    const usuario = await Usuario.findByOrFail('usuario', usuario)

    return usuario
  }

  async destroy ({ params,  response, request }) {
    const {usuario} = await request.all(params)
   
    const usuario = await Usuario.findByOrFail('usuario', usuario)
    
    await usuario.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})
  }

  async index({response}){

    const data = await Usuario.all()

    return {data}
  }

  async acesso({response, auth}){

    const usuario = await auth.getUsuario()
      
    return usuario
   

  }

}

module.exports = UsuarioController
