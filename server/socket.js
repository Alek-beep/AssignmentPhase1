module.exports = {
    connect: function(io, PORT, roomName){

        io.on('connection',(socket)=> {
            // When a connection request comes in output to the server console
            console.log('user connection on port ' + PORT + ' : ' + socket.id + "Room Name: " + roomName);

            socket.join(roomName);
        
            //When a message comes in, emit it back to all sockets with the message.
            socket.on('message', (message)=> {
                io.to(roomName).emit('message', message);
            })
            socket.on("disconnect", () => {
                console.log('user disconnected ');
              });
        });
    }
}