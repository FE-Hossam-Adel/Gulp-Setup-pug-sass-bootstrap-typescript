import SstaticServer from "static-server"

const server =new SstaticServer({
    rootPath:'./dist/',
    port:3000
});

server.start(()=>{
    console.log("server starts in " , "http://localhost:3000")
})