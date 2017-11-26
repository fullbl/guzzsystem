import axios from 'axios';
import {getAccessToken,logout} from '../utils/auth';

export default {
	headers: { Authorization: `Bearer ${getAccessToken()}` },

	get: function(url, params, next, error){
		axios.get(
			url,
			{
				"params": params,
				"headers": this.headers
			}
		)
		.then(next)
		.catch(this.errorHandler(error))
	},

	post: function(url, data, next, error){
		axios.post(
			url,
			data,
			{"headers": this.headers}
		)
		.then(next)
		.catch(this.errorHandler(error))
	},

	errorHandler: function(next){
		return function(error){
			if(
				'undefined' !== typeof error.response &&
				error.response.status === 401
			){
				alert('accesso scaduto');
				logout();
			}
			else{
				next(error);
			}
		};
	}

}