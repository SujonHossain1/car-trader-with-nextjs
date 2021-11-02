import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Faq from 'server/model/Faq';

DBConnect();

const faqHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === 'POST') {
        try {
            const faq = await Faq.create(body);
            res.status(201).json({
                success: true,
                data: faq,
                message: 'Faq created successfully',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(201).json({
                success: false,
                data: null,
                message,
            });
        }
    } else if (method === 'GET') {
        try {
            const faqs = await Faq.find({});
            res.status(200).json({
                success: true,
                data: faqs,
                message: '',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(200).json({
                success: false,
                data: null,
                message,
            });
        }
    }
};

export default faqHandler;
