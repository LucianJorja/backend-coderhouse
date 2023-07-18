import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_ATLAS_URL,
    GITHUB_KEY: process.env.SECRET_KEY_GITHUB,
    CALLBACK_URL: process.env.CALLBACK_URL_GITHUB,
    CLIENT_ID: process.env.CLIENTID_GITHUB,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}