var errorHandler = {
  methods: {
    handleError: function (response) {
      try{
        alert(response.response.data.message);
      }
      catch(e){
        try{
          alert(response.message);
        }
        catch(e){
          alert('errore sconosciuto');
        }
      }
    }
  }
}

export default errorHandler;