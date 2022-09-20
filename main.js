import server from "./src/app.js";
import database from "./src/db/database.js";

// Promise connexion database
database()
    .then(connect => console.log('MongoDB Database connected'))
    .catch(err => console.error('MongoDB Error: ', err));

// Listen App Express
server.listen(process.env.PORT || 3000);
