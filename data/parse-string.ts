import * as mongoose from 'mongoose';
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url =
  'mongodb://jsdaddy:jsdaddy2020@ds219459.mlab.com:19459/heroku_smfd2t77';
const products = require('./output/json-products.json');
const categories = require('./output/json-categories.json');
const subcategories = require('./output/json-sub-categories.json');

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  // tslint:disable-next-line:no-any
  async (_err: any, db: any) => {
    const dbo = db.db('heroku_smfd2t77');
    // tslint:disable-next-line:no-any
    products.map((elem: any) => {
      elem._id = mongoose.Types.ObjectId(elem._id);
      elem.subCategory = mongoose.Types.ObjectId(elem.subCategory);
      // tslint:disable-next-line:no-any
      dbo.collection('products').insertOne(elem);
    });
    // tslint:disable-next-line:no-any
    categories.map((elem: any) => {
      elem._id = mongoose.Types.ObjectId(elem._id);
      dbo.collection('categories').insertOne(elem);
    });
    // tslint:disable-next-line:no-any
    subcategories.map((elem: any) => {
      elem._id = mongoose.Types.ObjectId(elem._id);
      elem.category = mongoose.Types.ObjectId(elem.category);
      dbo.collection('subcategories').insertOne(elem);
    });
    const anotherCat = await dbo
      .collection('categories')
      .insertOne({ name: 'Прочее' });
    await dbo.collection('subcategories').insertOne({
      category: mongoose.Types.ObjectId(anotherCat._id),
      name: 'Без категории',
    });
    // tslint:disable-next-line:no-console
    console.log('done');
    db.close();
  }
);
