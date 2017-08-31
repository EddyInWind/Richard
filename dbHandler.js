var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('phrase');

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS phrase (year TEXT, quote TEXT)");
})

function insertQuote(quoteInfo){
    db.serialize(function(){
        var sql = "INSERT INTO phrase(year, quote) VALUES(?,?)";
        db.run(sql, [quoteInfo.year, quoteInfo.quote]);
    });
}

function queryQuotesAll() {
    return new Promise(function(resolve, reject) {
        db.serialize(function(){
            var sql = "SELECT rowid AS id, year, quote FROM phrase";
            db.all(sql, function(err, dataAry){
                if (err)
                    reject(err);
                else 
                    resolve(dataAry);
            })
        });
    });
}

function deleteQuote(id) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            var sql = "DELETE FROM phrase WHERE rowid=(?)";
            db.run(sql, [id], function(err){
                if (err)
                    reject(err);
                else 
                    resolve();
            })
        })
    })
}

module.exports.insertQuote = insertQuote;
module.exports.queryQuotesAll = queryQuotesAll;
module.exports.deleteQuote = deleteQuote;