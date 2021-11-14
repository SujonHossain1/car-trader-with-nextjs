import { Container, Grid, InputLabel, Paper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getAsString } from 'src/utils/getAsString';

interface Props {
    data: {
        _id: string;
        make: string;
        count: number;
    }[];
    make: {
        _id: string;
        model: string;
    }[];
}
interface IFormInputs {
    make: string;
    model: string;
    maxPrice: string;
    minPrice: string;
}
const prices = [
    500, 1000, 2500, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000,
    45000, 50000,
];

const Home: NextPage<Props> = ({ data, make }: Props) => {
    const { query } = useRouter();
    const { handleSubmit, control, watch } = useForm<IFormInputs>();

    const initialValues = {
        make: getAsString(query.make as string | string[]) || 'all',
        model: getAsString(query.model as string | string[]) || 'all',
        minPrice: getAsString(query.minPrice as string | string[]) || 'all',
        maxPrice: getAsString(query.maxPrice as string | string[]) || 'all',
    };

    console.log(watch('make'));

    const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

    return (
        <Container maxWidth="lg">
            <pre> {JSON.stringify(make, null, 4)} </pre>
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Min Price
                                </InputLabel>
                                <Controller
                                    name="minPrice"
                                    control={control}
                                    defaultValue={initialValues.minPrice}
                                    render={({ field }) => (
                                        <Select {...field} label="Make">
                                            <MenuItem value="all">
                                                No Min
                                            </MenuItem>
                                            {prices.map((price) => (
                                                <MenuItem
                                                    value={price}
                                                    key={price}
                                                >
                                                    {price}
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
                                    Max Price
                                </InputLabel>
                                <Controller
                                    name="maxPrice"
                                    control={control}
                                    defaultValue={initialValues.maxPrice}
                                    render={({ field }) => (
                                        <Select {...field} label="Max Price">
                                            <MenuItem value="all">
                                                No Max
                                            </MenuItem>
                                            {prices.map((price) => (
                                                <MenuItem
                                                    value={price}
                                                    key={price}
                                                >
                                                    {price}
                                                </MenuItem>
                                            ))}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data } = await axios.get('http://localhost:3000/api/cars/make');
    const make = getAsString(ctx.query.make as string | string[]);

    const { data: model } = await axios.get(
        `http://localhost:3000/api/make/${make}`
    );
    return {
        props: {
            data: data.data,
            make: model,
        },
    };
};

export default Home;
