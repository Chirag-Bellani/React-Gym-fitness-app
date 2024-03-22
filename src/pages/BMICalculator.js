
// Find body mass index value (BMI) with this endpoint.
//  You just need to enter three parameters which are age, weight (kg), and height(cm) information.

// url with
// const BMICalUrl = 'https://fitness-calculator.p.rapidapi.com/bmi?age=25&weight=65&height=180';

// {3 items
//     "status_code":200
//     "request_result":"Successful"
//     "data":{3 items
//     "bmi":20.06
//     "health":"Normal"
//     "healthy_bmi_range":"18.5 - 25"
//     }
// }

import React, { useState } from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { fetchData, BMIOptions } from '../utils/fetchData';

const BMICalculator = () => {
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [BMI, setBMI] = useState("Not Calculated")
    const [health, setHealth] = useState("Not Calculated")
    const [healthyBmiRange, setHealthyBmiRange] = useState("Not Calculated")
    const [loading, setLoading] = useState(false)
    const [reset, setReset] = useState(true)


    // reset fields

    const resetFields = () => {
        setAge('');
        setWeight('');
        setHeight('');
        setBMI('Not Calculated');
        setHealth('Not Calculated');
        setHealthyBmiRange('Not Calculated');
        setLoading(false)
        setReset(true)
    };

    const fetchBMICalData = async () => {
        if ((weight > 40 && weight < 160) && (height > 130 && height < 230) && (age > 0 && age < 80)) {
            const BMIData = await fetchData(`https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`, BMIOptions)
            console.log('BMIData:', BMIData);
            setLoading(true);
            if (BMIData.status_code === 200 && BMIData.data) {
                setBMI(BMIData.data.bmi);
                setHealth(BMIData.data.health);
                setHealthyBmiRange(BMIData.data.healthy_bmi_range);
            } else {
                alert('Unable to fetch data from API');
            }
            window.scrollTo({ top: 1400, behavior: 'smooth' });
        }
        else {
            alert('Please enter valid values');
        }
        setReset(false);

    }



    return (
        <Box>
            <Stack p="80px" gap="30px" width="90%" margin="auto" mt="100px">
                <TextField type="number" placeholder='Your Weight in Kg(must be 40kg to 160kg in range)'
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'red',
                                borderWidth: '3px',
                                // Change this to the desired focused border color
                            }
                        }
                    }}
                    onChange={(e) => setWeight(e.target.value)} />
                <TextField type="number" placeholder='Your Height in CM (must be 130cm to 230cm in range)'
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'red',
                                borderWidth: '3px', // Change this to the desired focused border color
                            }
                        }
                    }}
                    onChange={(e) => setHeight(e.target.value)} />
                <TextField type="number" placeholder='Your Age(must be 0 to 80 in range)'
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'red',
                                borderWidth: '3px', // Change this to the desired focused border color
                            }
                        }
                    }}
                    onChange={(e) => setAge(e.target.value)} />
                <Button variant="contained" sx={{
                    backgroundColor: '#FF2625', color: 'white', boxShadow: 3, fontWeight: "600", '&:hover': {
                        backgroundColor: 'red',
                    },
                }} onClick={fetchBMICalData} disabled={loading}>Calculate BMI</Button>

                <Button variant="contained" sx={{
                    backgroundColor: '#FF2625', color: 'white', boxShadow: 3, fontWeight: "600", '&:hover': {
                        backgroundColor: 'red',
                    },
                }} onClick={resetFields} disabled={reset}>Reset</Button>
            </Stack>
            {
                BMI === "Not Calculated" ? '' :
                    <Stack p="80px" gap="30px" width="90%" margin="auto" mt="60px">
                        <Typography variant="h3">BMI Results</Typography>
                        <Box>
                            <Typography variant="h5">BMI: <span style={{ color: '#FF2625', fontWeight: "600", fontSize: "40px" }}>{BMI}</span></Typography>
                            <Typography variant="h5">HEALTH: <span style={{ color: '#FF2625', fontWeight: "600", fontSize: "40px" }}>{health}</span></Typography>
                            <Typography variant="h5">HEALTH_BMI_RANGE: <span style={{ color: '#FF2625', fontWeight: "600", fontSize: "40px" }}>{healthyBmiRange}</span></Typography>
                        </Box>
                    </Stack>
            }
        </Box >

    );
};

export default BMICalculator;
