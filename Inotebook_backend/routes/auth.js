import express from 'express';
 const router = express.Router();
import user from '../models/User.js';

 router.get('/', (req, res) => {
     console.log(req.body);
     const newUser = user(req.body);
     newUser.save();
     res.send('Hello from auth route')
    }); 

    export default router;  