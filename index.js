const mongoose = require('mongoose');
// const { db } = require('./models/customer');
const Customer = require('./models/customer');


mongoose.Promise = global.Promise;

console.log('neeeeeeeeeeeeeeeeeeeeeee')

  
const db = mongoose.connect('mongodb://localhost/customercli', { useNewUrlParser: true, useUnifiedTopology: true });

const addCustomer = (name) => {
    console.log('start')
    const customer = new Customer(name);
    customer.save().then(res => {
        console.log('success')
        mongoose.connection.close()
    }).catch(err => console.log('error', err));
}

const findCustomer = async (name) => {
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname:search}]}).then(customers => {
        console.log(customers);
        db.disconnect()
    }).catch(err => {
        console.log(err);
    }
    );
}

module.exports = {
    addCustomer,
    findCustomer
}