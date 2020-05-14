'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with funcionarios001S
 */
const Funcionario = use('App/Models/Funcionario')
const Database = use('Database')
class FuncionarioController {
  /**
   * Show a list of all funcionarios001S.
   * GET funcionarios001S
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0': '') + (now.getMonth()+1)

    const data = await Database.select('Codigo', 'Nome', 'Referencia')
    .from('funcionarios')
    .where('referencia', '=', referencia)


    return data
  }

  /**
   * Render a form to be used for creating a new funcionarios001.
   * GET funcionarios001S/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new funcionarios001.
   * POST funcionarios001S
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single funcionarios001.
   * GET funcionarios001S/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing funcionarios001.
   * GET funcionarios001S/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update funcionarios001 details.
   * PUT or PATCH funcionarios001S/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a funcionarios001 with id.
   * DELETE funcionarios001S/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FuncionarioController
