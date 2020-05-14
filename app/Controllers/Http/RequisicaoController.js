'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with requisicaos
 */
const Requisicao = use('App/Models/Requisicoes')
class RequisicaoController {
  /**
   * Show a list of all requisicaos.
   * GET requisicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const data = await Requisicao.all()

    return data
  }

  /**
   * Render a form to be used for creating a new requisicao.
   * GET requisicaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new requisicao.
   * POST requisicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const data = await request.all()

    
    const requisicao = await  Requisicao.create(data)

    return requisicao
  }

  /**
   * Display a single requisicao.
   * GET requisicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const requisicao = await Requisicao.findByOrFail('id', params.id)

    return requisicao

  }

  /**
   * Render a form to update an existing requisicao.
   * GET requisicaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update requisicao details.
   * PUT or PATCH requisicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    
      const data = await request.all()
      
      const requisicao = await Requisicao.findByOrFail('id',params.id)
   
      await requisicao.merge(data)
      await requisicao.save()
    
      return requisicao


  }

  /**
   * Delete a requisicao with id.
   * DELETE requisicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RequisicaoController
