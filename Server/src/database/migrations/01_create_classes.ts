import Knex from 'knex';

export async function up(knex: Knex ){
/*Alterações a serem realizadas no BD*/
    return knex.schema.createTable('classes',table =>{
        table.increments('id').primary();
        table.string("subject").notNullable();
        table.decimal("cost").notNullable();

        table.integer("user_id") /*gera chave estrangeira*/
            .notNullable()
            .references('id')
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex){
/* Se algo ocorroer como retornar*/
    return knex.schema.dropTable('classes');
}