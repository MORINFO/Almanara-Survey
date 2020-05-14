'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cadastroepis
 */
const Epi = use('App/Models/Epis')

class EpiController {
  /**
   * Show a list of all cadastroepis.
   * GET cadastroepis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const data = await Epi.all()

    return data
  }

  /**
   * Render a form to be used for creating a new cadastroepi.
   * GET cadastroepis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cadastroepi.
   * POST cadastroepis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const data = await request.all()

    const epi = await Epi.create(data)

    return epi
  }

  /**
   * Display a single cadastroepi.
   * GET cadastroepis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const epi = await Epi.findByOrFail('id',params.id)

    return epi
  }

  /**
   * Render a form to update an existing cadastroepi.
   * GET cadastroepis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update cadastroepi details.
   * PUT or PATCH cadastroepis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = await request.all()    

    const epi = await Epi
    .findByOrFail('id',params.id)

    await epi.merge(data)
    await epi.save()

    return epi 

  }

  /**
   * Delete a cadastroepi with id.
   * DELETE cadastroepis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const epi = await Epi.findByOrFail('id', params.id)

    await epi.delete()
  }
}

module.exports = EpiController
