import express from 'express';

const router = express.Router();

router.get('/health',(req,res) => {
    const timestamp = new Date().toISOString();
    res.status(200).json({
        status:'Ok',
        message:'Server is running smoothly!',
        timestamp:timestamp
    })
})

export default router;