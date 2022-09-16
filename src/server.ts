import dotenv from 'dotenv';
import app from './index';

dotenv.config()

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Server run in port ${PORT}`))