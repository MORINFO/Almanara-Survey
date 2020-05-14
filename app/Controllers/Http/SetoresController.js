'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with setores
 */
const Setor = use('App/Models/Setores')

class SetoresController {
  /**
   * Show a list of all setores.
   * GET setores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    const setor = await Setor.all()

    return setor
  }

  /**
   * Render a form to be used for creating a new setore.
   * GET setores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new setore.
   * POST setores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    
   try{
    const data = await request.all()

    const setor = await Setor.create(data)
   
    return setor
   }
   catch(err){
    return response.status(500).send({Mensagem:"Erro !"}, err)
   }
  

  }


  /**
   * Display a single setore.
   * GET setores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {

    const setor = await Setor.findByOrFail('id', params.id)

    return setor
  }

  /**
   * Render a form to update an existing setore.
   * GET setores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update setore details.
   * PUT or PATCH setores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    const data = await request.all()

    const setor = await Setor.findByOrFail('id', params.id)

    await setor.merge(data)
    await setor.save()

    return setor
  }


  /**
   * Delete a setore with id.
   * DELETE setores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const setor = await Setor.findByOrFail('id', params.id)

    await setor.delete()
 

  }
}

module.exports = SetoresController
