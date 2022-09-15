import app from './index';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Server run in port ${PORT}`))