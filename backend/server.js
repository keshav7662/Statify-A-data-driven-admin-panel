import app from './app.js';
import { connectDb } from './config/databaseConnection.js';
import environment from './config/environment.js';
const { port } = environment;
import updateExpiredSubscriptions from './middlewares/updateExpiredSubscriptions.js';

connectDb();
updateExpiredSubscriptions();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
