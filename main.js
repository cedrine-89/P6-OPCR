import server from "./src/app.js";
import database from "./src/db/database.js";

database()
    .then(connect => console.log('MongoDB Database connected'))
    .catch(err => console.error('MongoDB Error: ', err));

server.listen(process.env.PORT || 3000);
