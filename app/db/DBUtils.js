var MongoClient = require('mongodb').MongoClient;
var config = require('config');
var debug = require('debug')('guzzsystem:db');

const SCHEMA = 'serate';

class DBUtils {

  connect(next, error){
    MongoClient.connect(
      config.get('db.mongo_string'),
      function(err, db){
        if(!err){
          next(db);
        }
        else{
          error('Errore di connessione: ' + err);
        }
      }
    );
  }

  list(filter,next,error){
    if('undefined' === typeof filter.from || !filter.from){
      error('la data di inizio è obbligatoria');
      return;
    }
    if('undefined' === typeof filter.to || !filter.to){
      filter.to = filter.from;
    }

    this.connect((db) => {
      db.collection(SCHEMA)
        .aggregate([
          {
            $match: {
              'date': {
                  $gte: new Date(filter.from + " 00:00:00"),
                  $lte: new Date(filter.to + " 23:59:59")
              }
            }
          },
          {
            $group : {
              "_id": null,
              "incasso-lordo": {
                $sum: {
                  $add: [
                    { $ifNull: ['$incasso-lordo-ingresso', 0]}, 
                    { $ifNull: ['$incasso-lordo-festa', 0]},
                    { $ifNull: ['$incasso-lordo-bancone', 0]},
                    { $ifNull: ['$incasso-lordo-tessere', 0]},
                    { $ifNull: ['$incasso-lordo-libri', 0]}
                  ]
                }
              },
              "incasso-netto": {
                $sum: '$incasso-netto'
              },
              "rimborsi": {
                $sum: {
                  $add: [
                    { $ifNull: ['$rimborso-amount', 0]}, 
                    { $ifNull: ['$rimborso-cena', 0]}
                  ]
                }
              },
              "pagamenti": {
                $sum: '$pagamento-baristi'
              },
              "versamenti": {
                $sum: '$versamento-amount'
              }
            }
          },
          {"$project" : {
            "_id": 0, 
            "incasso-lordo": 1,
            "incasso-netto": 1,
            "rimborsi": 1,
            "pagamenti": 1,
            "versamenti": 1
          }}
        ], 
        (err, data) => {
          if(err){
            error('errore: ' + err);
            debug(err);
          }
          else
            next(data);
        }
      );
    }, error);

  }

  read(filter, next, error){
    if('undefined' === typeof filter.date){
      error('la data è obbligatoria');
      return;
    }
    filter.date = new Date(filter.date);
    this.connect((db) => {
      db.collection(SCHEMA)
        .findOne(
          filter, 
          (err, data) => {
            if(err){
              error('errore: ' + err);
              debug(err);
            }
            else
              next(data);
          }
        );
    }, error);
  }

  write(data, next, error){
    if('undefined' === typeof data.date){
      error('la data è obbligatoria');
      return;
    }
    Object.keys(data).map(function(key){
      let val = data[key];
      if('' === val){
        data[key] = 0;
      }
      else if(/^[0-9.]*$/.test(val)){
        val = parseFloat(val);
        if(!isNaN(val)){
          data[key] = val;
        }
      }
    });

    data.date = new Date(data.date);

    this.connect((db) => {
      db.collection(SCHEMA)
  		  .updateOne(
			     {"date": data.date},
			     data,
			     {"upsert": true},
           function(err){
            if(err)
              error('errore: ' + err);
           }
	      );
      next();
    }, error);
  }
}

module.exports = new DBUtils(MongoClient);
