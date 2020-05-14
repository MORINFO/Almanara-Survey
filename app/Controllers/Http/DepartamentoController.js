'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with departamentos
 */
const Departamento = use('App/Models/Departamento')

class DepartamentoController {
  /**
   * Show a list of all departamentos.
   * GET departamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const departamento = await Departamento.all()

    return departamento
  }

  /**
   * Render a form to be used for creating a new departamento.
   * GET departamentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new departamento.
   * POST departamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const data = await request.all()

    const departamento = await Departamento.create(data)

    return departamento
  }

  /**
   * Display a single departamento.
   * GET departamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const departamento = await Departamento.findByOrFail('Codigo', params.Codigo)

    return departamento
  }

  /**
   * Render a form to update an existing departamento.
   * GET departamentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update departamento details.
   * PUT or PATCH departamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const data = await request.all()
    const departamento = await Departamento.findByOrFail('Codigo', params.Codigo)

    departamento.merge(data)
    departamento.save()

    return departamento
  }

  /**
   * Delete a departamento with id.
   * DELETE departamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try{

      await Departamento.delete(params.Codigo)

      return response.status(200).send({Mensagem:'Deletado com sucesso !'})
    }
    catch(erro){
      return response.status(500).send({Mensagem:'Problema ao deletar !'})
    }
  
  }
}

module.exports = DepartamentoController
