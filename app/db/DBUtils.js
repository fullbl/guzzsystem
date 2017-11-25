var MongoClient = require('mongodb').MongoClient;
var config = require('config');

const SCHEMA = 'serate';

class DBUtils {
  constructor(client){
  	this.client = MongoClient.connect(
		config.get('db.mongo_string')
	);
  }

  write(data){
  	return this.client.collection(SCHEMA)
  		.updateOne(
			{"date": data.date},
			data,
			{"upsert": true}
		);
  }


}
