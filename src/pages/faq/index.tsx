import Container from '@mui/material/Container';
import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import FaqList from 'src/components/FAQ/FaqList';

interface IProps {
    data: {
        success: boolean;
        data: IFaq[];
        message: string;
    };
}

const FAQ: NextPage<IProps> = ({ data }: IProps) => {
    console.log(data);

    return (
        <Container maxWidth="xl">
            <pre>{JSON.stringify(data, null, 4)}</pre>
            <FaqList data={data.data} />
        </Container>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await axios.get('http://localhost:3000/api/faq');

    return {
        props: {
            data,
        },
    };
};

export default FAQ;
