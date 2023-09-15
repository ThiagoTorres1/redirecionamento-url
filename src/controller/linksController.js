const knex = require("../database/knex")
const generateCod = require("generate-password")

class LinksController {
  async createLink(request, response) {
    const {url} = request.body

    const alphanumericString = generateCod.generate({
      length: 5,
      numbers: true,
      symbols: false,
      uppercase: true,
      strict: true,
      excludeSimilarCharacters: true,
    })

    await knex("links").insert({
      url,
      url_code: alphanumericString
    })

    return response.json({code: `Your alphanumeric: ${alphanumericString}`})
  }

  async redirectLink(request, response) {
    const {url_code} = request.params

    const urlInfos = await knex("links").where({url_code})
    const originalUrl = urlInfos[0].url

    return response.redirect(originalUrl)
  }
}

module.exports = LinksController