import { Meteor } from 'meteor/meteor';
import { Webapp } from 'meteor/webapp';
import { FlowRouter } from 'meteor/kadira:flow-router';

Meteor.startup(() => {
    const express = require('express');
    const morgan = require('morgan');
    const path = require('path');
    const flickr = require("flickrapi");
    const fs = require("fs");
    const cors = require('cors');
    const app = express();

    const mongoose = require('mongoose');
    const schema = mongoose.Schema;
    const MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
    const walmart = require('walmart')('nw8qw3u8ja5qhtzwkz4ex9ws');


    const url = 'mongodb://admin:admin@ds119380.mlab.com:19380/pickdb';
    const esquema = new schema({
        Objeto1:  String,
        marca1: String,
        Objeto2:  String,
        marca2: String,
        selected:   String,
        comments: [{ content: String, date: Date }],
        date: { type: Date, default: Date.now }
    });

    function getComparaciones(query) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to Mongo");
            var comparaciones = db.collection("comparaciones");
            console.log(comparaciones);

            comparaciones.find(query).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs);
                //callback(docs);

                db.close();
            });
        });
    }

    FlowRouter.route('/blog', {
    name: 'blog',
    action: function(req, res, next) {
      res.writeHead(200);
      walmart.search(req.params["query"]).then(function(data)
      {
          res.end(data);
      });
      res.json({hola:"prueba"});
    }
    });

    WebApp.connectHandlers.use("/hello", function(req, res, next) {
  res.writeHead(200);

  res.end("Hello world from: ");
});


//Searches with Walmart
    WebApp.connectHandlers.use('/:query',function(req, res)
    {
        walmart.search(req.params["query"]).then(function(data)
        {
            for (var i = 0; i < data.items.length; i++) {
                console.log('- name: ' + data.items[i].name);
                console.log('- price: ' + data.items[i].salePrice);
            }
            res.send("Informacion entra a walmart "+data);
        });

    });

//Searches with Walmart -- Item
    WebApp.connectHandlers.use('item/:query', function(req, res)
    {
        walmart.getItem(req.params["query"]).then(function(data)
        {
            var msg = '* brand:'+data.product.brand;
            console.log(msg);
            res.send(data);
        });
    });
    module.exports = app;

});
