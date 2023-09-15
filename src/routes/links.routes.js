const {Router} = require("express")
const LinksController = require("../controller/linksController")

const linksRoutes = Router()

const linksController = new LinksController()

linksRoutes.post("/", linksController.createLink)
linksRoutes.get("/:url_code", linksController.redirectLink)

module.exports = linksRoutes