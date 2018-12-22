process.on('message', function(ev_obj) {
    var ok = true;
    try{
        for(var i = 0;i<ev_obj.input.length;i++){
            var evaluated_code = eval(ev_obj.jscode + "answer(" + ev_obj.input[i] + ");");
            if((evaluated_code != ev_obj.output[i])){
              ok = false; 
            }
          }
        process.send(ok);
    }catch(e){
        process.send(e.toString());
    }
  });