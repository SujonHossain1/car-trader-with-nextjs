import { Container, Grid, InputLabel, Paper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    success: boolean;
    data: {
        _id: string;
        make: string;
        count: number;
    }[];
    message: string;
}
interface IFormInputs {
    make: string;
    model: string;
}

const Home: NextPage<Props> = ({ data }: Props) => {
    const { query } = useRouter();

    const initialValues: IFormInputs = {
        make: (query.make || 'all') as string,
        model: query.model as string,
    };

    const { handleSubmit, control } = useForm<IFormInputs>();
    const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

    return (
        <Container maxWidth="lg">
            <Paper sx={{ marginTop: '30px', padding: '10px' }} elevation={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Make
                                </InputLabel>
                                <Controller
                                    name="make"
                                    control={control}
                                    defaultValue={initialValues.make}
                                    render={({ field }) => (
                                        <Select {...field} label="Make">
                                            <MenuItem value="all">
                                                All Make
                                            </MenuItem>
                                            {data.map((item, index) => (
                                                <MenuItem
                                                    value={item.make}
                                                    key={item._id + index}
                                                >
                                                    {item.make}{' '}
                                                    {`(${item.count})`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Model
                                </InputLabel>
                                <Controller
                                    name="model"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            value={30}
                                            label="Age"
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>
                                                Twenty
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Thirty
                                            </MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <button type="submit">Submit</button>
                </form>
            </Paper>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { data } = await axios.get('http://localhost:3000/api/cars/make');
    return {
        props: {
            ...data,
        },
    };
};

export default Home;
