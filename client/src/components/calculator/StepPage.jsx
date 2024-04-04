import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StepSidebar, SelectionForm, OptionCard, NextStep } from "./StepComponents"; // Adjust the import path as needed
import "../../style/main.scss";
import "./Calculator.css";
import mansionImage from "../assets/images/Mansion.png";
import houseImage from "../assets/images/House.png";
import condoImage from "../assets/images/Condo.png";
import infoIcon from '../assets/images/est.png';
import vectorIcon from '../assets/images/dailyusage.png';
import decisionIcon from '../assets/images/faq.png';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Stepper, Step, StepLabel, StepContent, StepConnector, Box, Button, StepIcon } from '@mui/material';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const StepPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedHomeType, setSelectedHomeType] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [customHomeSize, setCustomHomeSize] = useState('');
    const [selectedHomeYear, setSelectedHomeYear] = useState(null);
    const [selectedEfficiency, setSelectedEfficiency] = useState(null);
    const [customEfficiency, setCustomEfficiency] = useState('');
    const [efficiencySubmitted, setEfficiencySubmitted] = useState(false);

    const steps = [
        {
          label: 'Home Type',
        },
        {
          label: 'Home Year',
        },
        {
          label: 'Consumption',
        },
      ];

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function CustomStepIcon(props) {
        const { active, completed, icon } = props;
      
        return (
          <StepIcon
            {...props}
            sx={{
              width: '60px', 
              height: '60px', 

              '& .MuiStepIcon-text': { 
                fill: 'white', 
                fontSize: '20px', 
              },
            }}
          />
        );
      }

      // Usage within your Stepper component
function CustomizedStepper({ activeStep, steps, handleNext, handleBack }) {
    return (
      <Stepper activeStep={activeStep} orientation="vertical" 
      connector={<StepConnector sx={{
        '& .MuiStepConnector-line': {
          minHeight: '28vh',
          borderLeftStyle: 'solid', 
          borderColor: 'grey.500', 
           marginLeft: '1em', 
        },
      }}/>}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={CustomStepIcon}
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: '1.5rem',
                  fontWeight: 'normal',
                  color: 'grey.500',
                  '&.Mui-active, &.Mui-completed': {
                    color: '#0057FF',
                    fontWeight: 'bold',
                  }
                }
              }}
            >
              {step.label}
            </StepLabel>
           
          </Step>
        ))}
      </Stepper>
    );
  }
  

    const Card = ({ id, title, dataPoints }) => {
        return (
            <div className="card" id={id}>
                <h2 className="card-title">{title}</h2>
                {dataPoints.map((point, index) => (
                    <div key={index} className="data-point">
                        <label className="data-label">{point.label}</label>
                        <div className="data-bar-container">
                            <div className="data-bar" style={{ width: point.valueWidth }}></div>
                            <span className="data-value">{point.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    
    
   
        const downloadPdf = () => {
            html2canvas(document.body).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("download.pdf");
            });
        }
        const handleCardClick = () => {
            let cardStack = document.getElementById('cardStack');
            let firstCard = cardStack.children[0];
            cardStack.appendChild(firstCard);
    
      
            for (let i = 0; i < cardStack.children.length; i++) {
                cardStack.children[i].style.zIndex = cardStack.children.length - i;
            }
        };
        const cardData = [
            {
                id: 'card1',
              title: 'HEAT PUMP #1',
              dataPoints: [
                { label: 'UPFRONT INVESTMENT', value: '$7,500', valueWidth: '70%' },
                { label: 'COST SAVINGS', value: '$2,293', valueWidth: '30%' },
                { label: 'ENERGY USE (GJ/YEAR)', value: '75', valueWidth: '50%' },
                { label: 'GHG EMISSIONS (TONNES CO2E/YEAR)', value: '4.1', valueWidth: '40%' },
    
              ],
            },
            {
                id: 'card2',
                title: 'HEAT PUMP #2',
                dataPoints: [
                  { label: 'UPFRONT INVESTMENT', value: '$7,500', valueWidth: '70%' },
                  { label: 'COST SAVINGS', value: '$2,293', valueWidth: '30%' },
                  { label: 'ENERGY USE (GJ/YEAR)', value: '75', valueWidth: '50%' },
                  { label: 'GHG EMISSIONS (TONNES CO2E/YEAR)', value: '4.1', valueWidth: '40%' },
        
                ],
              },
              {
                id: 'card3',
                title: 'HEAT PUMP #3',
                dataPoints: [
                  { label: 'UPFRONT INVESTMENT', value: '$7,500', valueWidth: '70%' },
                  { label: 'COST SAVINGS', value: '$2,293', valueWidth: '30%' },
                  { label: 'ENERGY USE (GJ/YEAR)', value: '75', valueWidth: '50%' },
                  { label: 'GHG EMISSIONS (TONNES CO2E/YEAR)', value: '4.1', valueWidth: '40%' },
   
                ],
              },
        ];
        
    

    const handleEfficiencySelect = (efficiency) => {
        setSelectedEfficiency(efficiency);
        setActiveStep(activeStep + 1)
    };

    const handleCustomEfficiencySubmit = () => {
        if (customEfficiency) {
            setSelectedEfficiency(customEfficiency);
            setEfficiencySubmitted(true);
            setActiveStep(activeStep + 1)
        }
    };


    const handleCustomHomeSizeSubmit = () => {
        if (customHomeSize) {
            setSelectedHomeType(customHomeSize);
            setSubmitted(true);
            setActiveStep(activeStep + 1)
        }
    };

    const handleHomeYearSelect = (yearRange) => {
        setSelectedHomeYear(yearRange);
        setActiveStep(activeStep + 1)
    };


    // Function to handle the selection of a home type
    const handleHomeTypeSelect = (type) => {
        setSelectedHomeType(type);
        setCustomHomeSize('');
        setActiveStep(activeStep + 1)
    };
    
    const homeTypes = [
        { type: "Mansion", size: "3000+ SQFT", image: mansionImage },
        { type: "House", size: "2400 - 3000 SQFT", image: houseImage },
        { type: "Condo", size: "2000 - 2400 SQFT", image: condoImage },
        { type: "Condo", size: "1200 - 2000 SQFT", image: condoImage },
        { type: "Condo", size: "800 - 1200 SQFT", image: condoImage },
    ];

    const homeYearRanges = [
        { label: "<1949", range: "1940-1970" },
        { label: "1950-1959", range: "1970-2000" },
        { label: "1960-1981", range: "2000-2024" },
        { label: "1982-1990", range: "2000-2024" },
        { label: "1991-1997", range: "2000-2024" },
        { label: "1998-2006", range: "2000-2024" },
        { label: "2007-2014", range: "2000-2024" },
        { label: "2015-Present", range: "2000-2024" },
      ];

      const efficiencyOptions = [
        { label: "80%", value: "80%" },
        { label: "92%", value: "92%" },
        { label: "97%", value: "97%" },
        { label: "I don't know", value: "I don't know" },
      ];

      const history = useHistory();
      console.log(activeStep);

      const parseHomeSize = (homeType) => {
        const sizePattern = /(\d+)/;
        const match = homeType.match(sizePattern);
        if (match) {
          return parseInt(match[0]);
        }
        return 0; 
      };

    return (
        <div className="home-type-selection">
            <div className="title">
                <h2>House Type Selection</h2>
                Explore & Save Money With The Best Heat Pump For Your Home.
            </div>
            
            <div className="page-container">
                <Box sx={{ maxWidth: 400, }}>
                <IconButton 
                    onClick={handleBack} 
                    disabled={activeStep === 0}
                    aria-label="back"
                    style={{
                        color: 'white', // Icon color
                        backgroundColor: '#1976d2', // Circle color
                        borderRadius: '50%', // Circle shape
                        padding: '15px', // Circle size
                        transform: 'translateX(2px)', // Adjust if icon is off to the left
                       
                        // Directly applying hover effects through inline styles is not straightforward
                    }}
                >
                    <ArrowBackIosIcon 
                    style={{ 
                        
                        transform: 'translateX(4px)'
                    }}/>
                 </IconButton>
                    <CustomizedStepper 
                    activeStep={activeStep}
                    steps={steps}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    />
                    {activeStep === steps.length && (
                        history.push({
                            pathname: `/results?buildYear=${selectedHomeYear}&sizeOfHome=${parseHomeSize(selectedHomeType)}&existingFurnaceEfficiency=${String(selectedEfficiency).replace("%", "")}`,
                            state: { selectedHomeType, selectedHomeYear, selectedEfficiency }
                          })
                          
                    )}
                </Box>
                <div className="content">  
                    {activeStep === 0 && (
                        <>
                         <div className="options">
                            {homeTypes.map((home, index) => (
                                <div className="option" key={index} onClick={() => handleHomeTypeSelect(`${home.type} (${home.size})`)}>
                                <img src={home.image} alt={home.type} className="image"/>
                                <div className="label">{home.type}</div>
                                <div className="size">{home.size}</div>
                                </div>
                            ))}
                            </div>
                           
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column', // Stack the elements vertically.
                                        alignItems: 'center', // Align items to the start of the flex container.
                                        '& .MuiTextField-root': { m: 1, width: '400px' }, // Increase width as needed.
                                        '& .MuiButton-root': { m: 1 },
                                        marginLeft: '',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="customSize"
                                        name="customSize"
                                        label="Custom Home Size"
                                        variant="outlined"
                                        value={customHomeSize}
                                        onChange={(event) => setCustomHomeSize(event.target.value)}
                                        placeholder="Enter custom size"
                                        size="small"
                                        // Adjust the TextField styles as necessary.
                                        sx={{
                                            marginBottom: 2, // Ensures space between the TextField and Button.
                                        }}
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handleCustomHomeSizeSubmit}
                                        // Adjust the Button styles if necessary.
                                    >
                                        Submit
                                    </Button>
                                </Box>
                        
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                             <div className="options">
                                {homeYearRanges.map((year, index) => (
                                <div className="option-year" key={index} onClick={() => handleHomeYearSelect(year.label)}>
                                    <div className="label-year">{year.label}</div>
                                </div>
                                ))}
                            </div>
                            
                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            <div className="options">
                                {efficiencyOptions.map((efficiency, index) => (
                                    <div 
                                    className="option-efficiency" 
                                    key={index} 
                                    onClick={() => handleEfficiencySelect(efficiency.value)}
                                    >
                                    <div className="label-efficiency">{efficiency.label}</div>
                                    </div>
                                ))}
                                </div>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column', // Stack the elements vertically.
                                        alignItems: 'center', // Align items to the start of the flex container.
                                        '& .MuiTextField-root': { m: 1, width: '400px' }, // Increase width as needed.
                                        '& .MuiButton-root': { m: 1 },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="customEfficiency"
                                        name="customEfficiency"
                                        label="Custom Home efficiency"
                                        variant="outlined"
                                        value={customEfficiency}
                                        onChange={(event) => setCustomEfficiency(event.target.value)}
                                        placeholder="Enter custom efficiency"
                                        size="small"
                                        // Adjust the TextField styles as necessary.
                                        sx={{
                                            marginBottom: 2, // Ensures space between the TextField and Button.
                                        }}
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handleCustomEfficiencySubmit}
                                        // Adjust the Button styles if necessary.
                                    >
                                        Submit
                                    </Button>
                                </Box>
                        </>
                    )}
                </div>
            </div>
        </div>


    );
};