import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Car from 'server/model/Car';

DBConnect();

const carItemHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;
    const { id } = query;

    if (method === 'GET') {
        try {
            const car = await Car.findOne({ _id: id });
            res.status(200).json({
                success: true,
                data: car,
                message: 'Car item retrieved successfully',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Car item could not be retrieved',
            });
        }
    } else {
        res.status(405).json({
            success: false,
            data: null,
            message: 'Method not allowed',
        });
    }
};

export default carItemHandler;
