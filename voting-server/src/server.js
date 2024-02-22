import {Server} from 'socket.io';
import {createServer} from 'http';

export default function startServer(store){

    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:8081",
          methods: ["GET", "POST"]
        }
    });
    httpServer.listen(8095, () => {
        console.log('Socket server running on http://localhost:8095');
    });

      
    //const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state',store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}