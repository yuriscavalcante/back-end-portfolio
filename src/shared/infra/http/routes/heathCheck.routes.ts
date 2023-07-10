import { Request, Response, Router } from "express";

const healthCheck = Router();

healthCheck.get('', (req: Request , res: Response) => {
    return res.status(200).json({message: 'Ok'})
});

export { healthCheck };