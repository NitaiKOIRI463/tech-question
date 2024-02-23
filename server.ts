import express,{Request,Response} from 'express';

import Router from './router';
const app = express();
const port = 5000;

app.use('/api/vi/',Router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
