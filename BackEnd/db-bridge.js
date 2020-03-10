const mongoClient = require('mongodb');
const environment = require('./environment')

var client = null


function connect(dbName) {
    return new Promise(async (resolve, reject) => {

        if (client == null) {
            host = environment.dbHost;
            port = environment.dbPort;

            for (let i = 0; i < environment.dbConnectionRetry; i++) {
                try {
                    console.log('Initiating DB connection....')
                    client = await mongoClient.connect(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
                    console.log('DB Connected!')
                    return resolve(client.db(dbName))
                }
                catch (e) {
                    client = null;
                    if ((i+1) < environment.dbConnectionRetry) {
                        console.log(`Retrying Again`);
                        continue;
                    } else {
                        return reject(null)
                    }

                }

            }

        }
        else {
            return resolve(client.db(dbName))
        }
    })
}


function findWithAggregate(collectionName, pipeline) {
    return new Promise((resolve, reject) => {
        connect('AppleTrading').then(db => {
            let collection = db.collection(collectionName)
            var cursor = collection.aggregate(pipeline);
            getArray(cursor).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        }).catch(err => {
            return reject(err);
        });
    })
}

function getArray(iterator) {
    return new Promise((resolve, reject) => {
        iterator.toArray((err, res) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(res);
            }
        })
    })
}

function init() {
    return connect()
}

module.exports = {
    init,
    findWithAggregate
}