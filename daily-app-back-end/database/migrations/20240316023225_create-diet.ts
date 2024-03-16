import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('diet',(table)=>{
    table.uuid('id').primary()
    table.text('breakfast').notNullable()
    table.text('lunch').notNullable()
    table.text('dinner').notNullable()
    table.text('snack').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

