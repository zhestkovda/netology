const express = require("express");
const bodyParser = require("body-parser");
const {ObjectId} = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const drone = require('netology-fake-drone-api');
var fs = require('file-system');

const User = require('./models/user');
const Order = require('./models/order');

const app = express();
const MyAPI = express.Router();

app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/src", express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


MongoClient.connect("mongodb://localhost:27017/dronecafe", function (err, db) {
    // insert menu into db.menu collection
    fs.readFile('./menu.json', 'utf8', function (err, data) {
		if (err) throw err;
		var json = JSON.parse(data);
		var collection = db.collection('menu');
		collection.drop();

		collection.insert(json, function(err, docs) { // Should succeed
			if(err) console.log(err);
	    });
	});


    db.collection('users', function (err, collection) {
        //collection.remove({});
        //список пользователей
        MyAPI.get("/users/", function (req, res) {
            collection.find().toArray((err, result) => {
                res.send(result);
            });
        });

        //новый пользователь
        MyAPI.post("/users/", function (req, res) {
            let user = new User(req.body.name, req.body.email, req.body.credit);
            collection.insert(user, (err, result) => {
                res.send(result);
            });
        });

        //баланс пользователя его email
        MyAPI.get("/users/:email", function (req, res) {
            collection.find({"email": req.params.email}).toArray((err, result) => {
                res.send(result);
            });
        });

        //обновляем пользователя его email
        MyAPI.put("/users/", function (req, res) {
            let user = new User(req.body.name, req.body.email, req.body.credit);
            collection.update({"email": req.body.email}, user, (err, result) => {
                res.send(result);
            });
        });

    });

    db.collection('menu', function (err, collection) {
        //список
        MyAPI.get("/menu/", function (req, res) {
            collection.find().toArray((err, result) => {
                res.send(result);
            });
        });
    });


    db.collection('order', function (err, collection) {
        //collection.remove({});
        //список
        MyAPI.get("/orders/", function (req, res) {
            collection.find().toArray((err, result) => {
                res.send(result);
            });
        });

        //новый заказ
        MyAPI.post("/orders/", function (req, res) {
            let order = new Order(req.body.email, req.body.title, req.body.image, req.body.rating, req.body.ingredients, req.body.price, req.body.status, new Date(), 0, 0, 0);
            collection.insert(order, (err, result) => {
                io.emit('new order');
                res.send(result);
            });
        });

        //обновить заказ по id
        MyAPI.put("/orders/:id", function (req, res) {
            let order = new Order(req.body.email, req.body.title, req.body.image, req.body.rating, req.body.ingredients, req.body.price, req.body.status, req.body.starttime, 0, 0, 0);
            collection.update({"_id": ObjectId(req.params.id)}, order, (err, result) => {
                io.emit('order changed', {
                    data: order
                });

                if (req.body.status == "cooking") {
                    order.cookingStarted = new Date();
                    collection.update({"_id": ObjectId(req.params.id)}, order, (err, result) => {
                        io.emit('new order');
                    })
                }


                if (req.body.status == "deliver") {
                    order.cookedIn = new Date() - new Date(order.cookingStarted);
                    collection.update({"_id": ObjectId(req.params.id)}, order, (err, result) => {
                        io.emit('new order');
                    })

                    drone.deliver(order)
                        .then(() => {
                            order.status = "delivered";
                            order.endtime = Math.floor((new Date() - new Date(order.starttime)) / 1000);
                            collection.update({"_id": ObjectId(req.params.id)}, order, (err, result) => {
                                io.emit('order changed', {
                                    data: order
                                });


                                setTimeout(() => {
                                    order.status = "deleted";
                                    collection.update({"_id": ObjectId(req.params.id)}, order, (err, result) => {
                                        io.emit('order changed', {
                                            data: order
                                        });
                                    })
                                }, 120000);


                            })
                        })
                        .catch(() => {
                            order.status = "problem";
                            collection.update({"_id": ObjectId(req.params.id)}, order, (err, result) => {
                                //обновляем баланс

                                db.collection('users', function (err, userCollection) {
                                    userCollection.update({"email": order.email}, {$inc: {credit: order.price}});
                                });

                                io.emit('order changed', {
                                    data: order
                                });

                            })
                        });
                }
                res.send(result);
            });
        });

        //список заказов пользователя
        MyAPI.get("/orders/:email", function (req, res) {
            collection.find({"email": req.params.email}).toArray((err, result) => {
                res.send(result);
            });
        });

    });
});

app.use("/", MyAPI);
server.listen(process.env.PORT || 3333, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
