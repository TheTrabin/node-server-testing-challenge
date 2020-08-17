/** @format */

exports.up = function (knex) {
	return knex.schema
		.createTable('roles', (tbl) => {
			tbl.increments();

			tbl.string('name', 128).notNullable().unique();
		})
		.createTable('users', (tbl) => {
			tbl.increments();

			tbl.string('username', 128).notNullable().unique().index();
			tbl.string('password', 256).notNullable();

			tbl
				.integer('role')
				.unsigned()
				.references('roles.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE');
		})
		.createTable('element', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl.string('description', 255).notNullable();
		})
		.createTable('class', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl.string('description', 255).notNullable();
		})
		.createTable('mob', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl.string('species', 128).notNullable();
			tbl
				.integer('element')
				.unsigned()
				.references('element.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE');
			tbl
				.integer('class')
				.unsigned()
				.references('class.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE');
			tbl.string('description', 255).notNullable();
		})
		.createTable('mob_element', (tbl) => {
			tbl
				.integer('mob_id')
				.unsigned()
				.notNullable()
				.references('mob.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.integer('element_id')
				.unsigned()
				.notNullable()
				.references('element.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['mob_id', 'element_id']);
		})
		.createTable('mob_class', (tbl) => {
			tbl
				.integer('mob_id')
				.unsigned()
				.notNullable()
				.references('mob.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.integer('class_id')
				.unsigned()
				.notNullable()
				.references('class.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['mob_id', 'class_id']);
		})
		.createTable('weapons', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl.integer('attack').notNullable();
			tbl
				.integer('element')
				.unsigned()
				.references('element.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE');
			tbl.integer('cost').notNullable();
			tbl.integer('durability').notNullable();
			tbl.integer('enhancement').notNullable();
			tbl.string('description', 255).notNullable();
		})
		.createTable('armor', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl.integer('defense').notNullable();
			tbl
				.integer('element')
				.unsigned()
				.references('element.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE');
			tbl.integer('cost').notNullable();
			tbl.integer('durability').notNullable();
			tbl.integer('enhancement').notNullable();
			tbl.string('description', 255).notNullable();
		})
		.createTable('relic', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl
				.integer('element')
				.unsigned()
				.references('element.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE');
			tbl.string('description', 255).notNullable();
		})
		.createTable('npc', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('roles')
		.dropTableIfExists('users')
		.dropTableIfExists('element')
		.dropTableIfExists('class')
		.dropTableIfExists('mob')
		.dropTableIfExists('mob_element')
		.dropTableIfExists('mob_class')
		.dropTableIfExists('weapons')
		.dropTableIfExists('armor')
		.dropTableIfExists('relic')
		.dropTableIfExists('npc');
};
