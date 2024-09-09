import { Server } from "socket.io"

const io = new Server(process.env.PORT||8080,{cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
}})
console.log("Running ...")

io.on("connection", (socket)=>{
    console.log("A user is connected...");
    socket.on("message",(message,roomName)=>{

        if(roomName.length){
            io.to(roomName).emit("message",message)
        }
        else{
            io.emit("message", message)
        }
        console.log(message,roomName);
        
    })
    socket.on("disconnect", ()=> console.log("user disconnected"))
    socket.on("joinRoom",(roomName)=>{
        console.log("joing room:"+roomName)
        socket.join(roomName)
    })
})