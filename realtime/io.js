module.exports = function(io){

    io.on('connection',function(socket){
        console.log('Connected');
        var user = socket.request.user;
        console.log(user.name);
    });

}

