import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

interface IProps {
    success: boolean;
    data: ICar | null;
    message: string;
}

const CarDetails: NextPage<IProps> = ({ success, data, message }: IProps) => {
    if (!data) {
        return <h3>{message}</h3>;
    }
    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    margin: '10px auto',
                    maxWidth: 'lg',
                    flexGrow: 1,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Img alt="complex" src={data.photoUrl} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    component="div"
                                >
                                    {data.make} {data.model}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <span>Fuel Type: {data.fuelType}</span>
                                    <br />
                                    <span>Kilometers: {data.kilometers}</span>
                                    <br />
                                    <span>Kilometers: {data.year}</span>
                                    <br />
                                    <span>Price: {data.price}</span>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {data.details}
                                </Typography>
                                <Button
                                    color="warning"
                                    sx={{ marginTop: '20px' }}
                                    variant="outlined"
                                >
                                    Add to Cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
    const id = ctx.params?.id as string;
    try {
        const { data } = await axios.get<IProps>(
            `http://localhost:3000/api/cars/${id}`
        );

        return {
            props: {
                ...data,
            },
        };
    } catch (error: any) {
        const data = error?.response?.data;
        return {
            props: {
                ...data,
            },
        };
    }
};

export default CarDetails;
