const {Router} = require("express")
const linksRoutes = require("./links.routes")
const router = Router()

router.use("/links", linksRoutes)

module.exports = router