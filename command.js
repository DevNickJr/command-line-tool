#! /usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {addCustomer, findCustomer, updateCustomer, removeCustomer, listAllCustomers} = require('./index');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email'
    }
]

program
    .version('1.0.0')
    .description('CLI for managing customers');

// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add a new customer')
//     .action((firstname, lastname, phone, email) => {
//         addCustomer({firstname, lastname, phone, email});
//     })
program
    .command('add')
    .alias('a')
    .description('Add a new customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers))
    })


program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action((name) => {
        findCustomer(name);
    })

program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action((_id) => {
        prompt(questions).then(answers => updateCustomer(_id, answers))
    })

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a customer')
    .action((_id) =>removeCustomer(_id))

program
    .command('list')
    .alias('l')
    .description('List all customers')
    .action(() => listAllCustomers())

program.parse(process.argv)