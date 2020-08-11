import Knex from 'knex';

export async function up(knex: Knex ){
/*Alterações a serem realizadas no BD*/
    return knex.schema.createTable('connections',table =>{
        table.increments('id').primary();


        table.integer("user_id") /*conecta com qual professor?*/
            .notNullable()
            .references('id')
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete('CASCADE');

            table.timestamp('created_at') /*Marca quando e hoério do contato */
                .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
                .notNullable();
    });
}

export async function down(knex: Knex){
/* Se algo ocorroer como retornar*/
    return knex.schema.dropTable('connections');
}