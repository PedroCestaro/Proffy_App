import Knex from 'knex';

export async function up(knex: Knex ){
/*Alterações a serem realizadas no BD*/
    return knex.schema.createTable('class_schedule',table =>{
        table.increments('id').primary();

        table.integer("week_day").notNullable();
        table.integer("from").notNullable();
        table.integer("to").notNullable();

        table.integer("class_id") 
            .notNullable()
            .references('id')
            .inTable("classes")
            .onUpdate("CASCADE")
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex){
/* Se algo ocorroer como retornar*/
    return knex.schema.dropTable('class_schedule');
}