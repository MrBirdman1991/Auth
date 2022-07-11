import mongoose from "mongoose";
import logger from "./logger";

function connect(connectionString: string){
    return mongoose.connect(connectionString).then(() => {
        logger.info("db is running")
    }).catch((err) => {
        logger.error(err.message);
        process.exit(1);
    })
}

export default connect;