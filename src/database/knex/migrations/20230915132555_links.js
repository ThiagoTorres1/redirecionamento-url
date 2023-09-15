
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id"),
  table.text("url")
  table.text("url_code")
})

exports.down = knex => knex.schema.dropTable("links")