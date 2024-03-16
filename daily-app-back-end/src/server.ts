import {app} from './app';
import routes from './routes/index';

app.use(routes)

app.listen(3000, ()=>{console.log('Server running on port 3000')})