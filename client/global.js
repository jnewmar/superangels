UI.registerHelper('indexedArray', function(context, options) {
	if (context) {
		return context.map(function(item, index) {
			item._index = index + 1;
			return item;
		});
	}
});

UI.registerHelper('check', function(value1, value2, options) {
	if (value1== value2) {
		return true;
	}else{
		return false;
	}
});

UI.registerHelper('oculta',function(value,tam) {
	if(!tam){
		tam=5;
	}
	return value.substr(0,tam)+"********";
	
});


UI.registerHelper('truncate',function(value,tam) {
  if(!tam){
    tam=5;
  }
  return value.substr(0,tam)+"...";
  
});

UI.registerHelper('toLowerCase',function(value) {
	//console.log("to lowerCase "+JSON.stringify(value));	
	return value.toLowerCase();
	
});




UI.registerHelper('formatTime', function(data, formato) {
	d = new Date(data);
  dia=pad(d.getDate(),2);
  mes=pad(d.getMonth()+1,2);
  hora=pad(d.getHours(),2);
  minuto=pad(d.getMinutes(),2);
	switch (formato) {
		case "DD/MM/YYYY" :
  			return dia+"/"+mes+"/"+d.getFullYear();
  			break;
  		default:	
  			return dia+"/"+mes+"/"+d.getFullYear()+" "+hora+":"+minuto;
	  }	
    
});


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Password = {
 
  _pattern : /[a-zA-Z0-9_\-\+\.]/,
  
  
  _getRandomByte : function()
  {
    // http://caniuse.com/#feat=getrandomvalues
    if(window.crypto && window.crypto.getRandomValues) 
    {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    }
    else if(window.msCrypto && window.msCrypto.getRandomValues) 
    {
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    }
    else
    {
      return Math.floor(Math.random() * 256);
    }
  },
  
  generate : function(length)
  {
    return Array.apply(null, {'length': length})
      .map(function()
      {
        var result;
        while(true) 
        {
          result = String.fromCharCode(this._getRandomByte());
          if(this._pattern.test(result))
          {
            return result;
          }
        }        
      }, this)
      .join('');  
  }    
    
};