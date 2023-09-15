const knex = require("../database/knex")
const generateCod = require("generate-password")
const AppError = require("../utils/appError")

class LinksController {
  async createLink(request, response) {
    const {url} = request.body

    if(!url) {
      throw new AppError("Você precisa digitar uma url")
    }

    const alphanumericString = generateCod.generate({
      length: 5,
      numbers: true,
      symbols: false,
      uppercase: true,
      strict: true,
      excludeSimilarCharacters: true,
    })

    const hasHttp = url.includes("http")
    const hasHttps = url.includes("https")

    if(hasHttp || hasHttps) {
      await knex("links").insert({
        url,
        url_code: alphanumericString
      })
    } else {
      await knex("links").insert({
        url: `https://${url}`,
        url_code: alphanumericString
      })
    }

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