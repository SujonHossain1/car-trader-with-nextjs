import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useState } from 'react';

interface Props {
    data: IFaq[];
}
const SuccessAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
    // color: '#fff',
    // background: theme.palette.success.light,
    // '.MuiSvgIcon-root': {
    //     color: '#fff',
    // },
}));

const FaqList: NextPage<Props> = ({ data }: Props) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <div>
            {data.map((item) => (
                <SuccessAccordion
                    expanded={expanded === `panel${item._id}`}
                    onChange={handleChange(`panel${item._id}`)}
                    key={item._id}
                    square={false}
                    sx={(theme) => ({
                        color: theme.palette.success.light,
                    })}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </SuccessAccordion>
            ))}
        </div>
    );
};

export default FaqList;
