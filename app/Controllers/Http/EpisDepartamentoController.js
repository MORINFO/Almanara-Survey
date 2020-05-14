'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with episdepartamentos
 */
const EpisDepartamento = use('App/Models/EpisDepartamento')
const Database = use('Database')
class EpisDepartamentoController {
  /**
   * Show a list of all episdepartamentos.
   * GET episdepartamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    const data = await EpisDepartamento.all()
    return data

  }

  /**
   * Render a form to be used for creating a new episdepartamento.
   * GET episdepartamentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new episdepartamento.
   * POST episdepartamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    try {
      const idEpi = await request.only('idEpi')
      const {idDepartamento} = request.all()
      
      await Database.from('epis_departamentos').where(idEpi).delete()
      
      for (var i = 0; i < idDepartamento.length; i++) {

        var departamento = { "idDepartamento": idDepartamento[i] }

        var data = { ...departamento, ...idEpi }
        
        const up = await EpisDepartamento.create(data)

        await up.save()
      }
    }
    catch (erro) {
       
        return response.send({erro})
      }

    
  }

  /**
   * Display a single episdepartamento.
   * GET episdepartamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    
    const epi = await Database.from('epis_departamentos')
      .where({ "idEpi": params.id })
      .orderBy('idDepartamento', 'asc')

    return { epi }
  }

  /**
   * Render a form to update an existing episdepartamento.
   * GET episdepartamentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update episdepartamento details.
   * PUT or PATCH episdepartamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    const idEpi = await request.only('idEpi')
    const { idDepartamento } = await request.all()
    
    await Database.from('epis_departamentos').where(idEpi).delete()
    
    for (var i = 0; i < idDepartamento.length; i++) {

      var departamento = { "idDepartamento": idDepartamento[i] }
      var data = { ...departamento, ...idEpi }

      const up = await EpisDepartamento.create(data)

      await up.save()


    }
  }

  /**
   * Delete a episdepartamento with id.
   * DELETE episdepartamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    await Database.from('epis_departamentos').where({ "idEpi": params.id }).delete()
  }
}

module.exports = EpisDepartamentoController
