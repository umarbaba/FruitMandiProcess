const dbBridge = require('./db-bridge')


function getTransactions(growerID) {
    growerID = growerID.replace(/\s/g, "");
    return new Promise((resolve, reject) => {
        var pipeline = [
            {
                "$match": {
                    "gid": growerID,
                }
            }
        ];
        dbBridge.findWithAggregate("transactions", pipeline).then(result => {
            return resolve(result);
        }).catch((error) => {
            return reject(error)
        })
    })

}
module.exports = {
   
    getTransactions
}
