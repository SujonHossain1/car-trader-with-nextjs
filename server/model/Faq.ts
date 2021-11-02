import { model, models, Schema } from 'mongoose';

const faqSchema = new Schema<IFaq>({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const Faq = models.Faq || model<IFaq>('Faq', faqSchema);
export default Faq;
