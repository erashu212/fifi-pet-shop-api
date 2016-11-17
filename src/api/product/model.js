"use strict";

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String,
    desc: String
});

const PriceSchema = new mongoose.Schema({
    amount: Number,
    discount: Number
});

const SellerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String
});

const InventorySchema = new mongoose.Schema({
    total: Number,
    purchased: Number
});

const product = {
    name: {
        type: String,
        required: [ true, 'name can not be empty' ]
    },
    category: CategorySchema,
    price: PriceSchema,
    inventory: InventorySchema,
    isActive: Boolean,
    desc: String,
    attrs: {
        age: Number,
        weight: Number,
        breed: String,
        img: String
    },
    seller: SellerSchema,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
}

module.exports = new mongoose.Schema(product);