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

  read(filter, next, error){
    if('undefined' === typeof filter.date){
      error('la data è obbligatoria');
      return;
    }
    this.connect((db) => {
      db.collection(SCHEMA)
        .findOne(
          filter, 
          (err, data) => {
            if(err)
              error('errore: ' + err);
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
