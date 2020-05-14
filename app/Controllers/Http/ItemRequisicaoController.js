'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with itemrequisicaos
 */
const ItensRequisicoes = use('App/Models/Itemrequisicoes')
const Database = use('Database')

class ItemRequisicaoController {
  /**
   * Show a list of all itemrequisicaos.
   * GET itemrequisicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
   
  }

  /**
   * Render a form to be used for creating a new itemrequisicao.
   * GET itemrequisicaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new itemrequisicao.
   * POST itemrequisicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const id = await request.only('id')
    const {Itens} = await request.all() // idPainel = itens // numero = idUsuario

    await Database.from('itemrequisicoes').where(id).delete()

    for(var i = 0; i < Itens.length; i++){
        
      var data = {...Itens[i], ...id}

      const up = await ItensRequisicoes.create(data)
      
      await up.save()
     
    }


  }

  /**
   * Display a single itemrequisicao.
   * GET itemrequisicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    
    const item = await ItensRequisicoes.query()
    .where('id', '=', params.id).fetch()

    return item
  }

  /**
   * Render a form to update an existing itemrequisicao.
   * GET itemrequisicaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update itemrequisicao details.
   * PUT or PATCH itemrequisicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a itemrequisicao with id.
   * DELETE itemrequisicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ItemRequisicaoController
