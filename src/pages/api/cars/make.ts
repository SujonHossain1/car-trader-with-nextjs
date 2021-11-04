import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Car from 'server/model/Car';

DBConnect();

const makeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const cars = await Car.aggregate([
            {
                $match: {},
            },
            {
                $group: {
                    _id: '$make',
                    make: { $first: '$make' },
                    count: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            data: cars,
            message: '',
        });
    }
};

export default makeHandler;
