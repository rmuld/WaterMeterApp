import app from './app';
import config from './apiConfig';

const { port } = config;

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});