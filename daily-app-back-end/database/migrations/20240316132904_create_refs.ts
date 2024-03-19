import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('refs',(table)=>{
    table.uuid('id').primary().index()
    table.uuid('user_id') 
    table.text('name')
    table.enu('type', ['breakfast','lunch','dinner','snack'])
    table.timestamp('created_at')
  })
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('refs');
}

