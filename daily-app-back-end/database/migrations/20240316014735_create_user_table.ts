import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table)=>{
    table.uuid('id').primary().index()
    table.text('name').notNullable()
    table.text('email').notNullable().unique()
    table.text('password').notNullable()
    table.decimal('accept_rate')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}

