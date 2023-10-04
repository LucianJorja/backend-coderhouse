import { logger } from "../utils/logger.js";
import { Router } from "express";

const router = new Router();

router.get('/', async (req, res) => {
    try {
        logger.debug('Debug log for testing');
        logger.http('HTTP log for testing');
        logger.info('Info log for testing');
        logger.warn('Warning log for testing');
        logger.error('Error log for testing');
        res.send('Logs generated. Check the console and errors.log file.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating logs.');
    }
});


export default router;