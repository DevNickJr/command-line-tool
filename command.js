const program = require('commander');
const {addCustomer, findCustomer} = require('./index');

program
    .version('1.0.0')
    .description('CLI for managing customers');

program
    .command('add <firstname> <lastname> <phone> <email>')
    .alias('a')
    .description('Add a new customer')
    .action((firstname, lastname, phone, email) => {
        addCustomer({firstname, lastname, phone, email});
    })

program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action((name) => {
        findCustomer(name);
    })

program.parse(process.argv)