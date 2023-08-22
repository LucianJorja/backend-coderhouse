import { developmentLogger, productionLogger } from "../utils/logger.js";
import { Router } from "express";

const router = new Router();

router.get('/', async (req, res) => {
    try {
        developmentLogger.debug('Debug log for testing');
        developmentLogger.http('HTTP log for testing');
        developmentLogger.info('Info log for testing');
        developmentLogger.warn('Warning log for testing');
        developmentLogger.error('Error log for testing');
        
        productionLogger.info('Info log in production for testing');
        productionLogger.warn('Warning log in production for testing');
        productionLogger.error('Error log in production for testing');

        res.send('Logs generated. Check the console and errors.log file.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating logs.');
    }
});


export default router;