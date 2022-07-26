const mongoose = require('mongoose');
const Customer = require('./models/customer');


mongoose.Promise = global.Promise;

  
const db = mongoose.connect('mongodb://localhost/customercli', { useNewUrlParser: true, useUnifiedTopology: true }).then((db)=> console.log('connected'));

const addCustomer = (name) => {
    console.log('start')
    const customer = new Customer(name);
    customer.save().then(res => {
        console.log('success')
        mongoose.connection.close()
    }).catch(err => console.log('error', err));
}

const findCustomer =  (name) => {
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname:search}]}).then(customers => {
        console.log(customers);
        console.log(`${customers.length} matches`)
        mongoose.connection.close()
    }).catch(err => {
        console.log(err);
    }
    );
}

const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer)
        .then(customer => {
            console.log('customer updated')
            mongoose.connection.close()
        })
        .catch(err => console.log(err))
}
const removeCustomer = (_id) => {
    Customer.deleteOne({_id})
        .then(customer => {
            console.log('customer removed')
            mongoose.connection.close()
        })
        .catch(err => console.log(err))
}

const listAllCustomers =  () => {
    Customer.find()
        .then(customers => {
            console.log(customers);
            console.log(`${customers.length} customers`)
            mongoose.connection.close()
        }).catch(err => {
            console.log(err);
        });
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listAllCustomers
}