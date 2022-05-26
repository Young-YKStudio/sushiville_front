import { useState, useEffect } from 'react';
import AddOn from './AddOn';
import OrderDetails from './OrderDetails';
import PaymentSetting from './PaymentSetting';
import OrderFinal from './OrderFinal';
import OrderResult from './OrderResult';
// TODO: import use navigate to home

// Mui
import { Card, Grid, Typography, Stepper, Step, StepButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';

const Confirmation = (props) => {
  // States
  const [ finalCart, setFinalCart ] = useState([]);
  const [ orderId, setOrderId ] = useState();
  
  // MUI Steps
  const [ activeStep, setActiveStep ] = useState(0);
  const [ completed, setCompleted ] = useState({});
  
  // Calc Total
  const [ subTotal, setSubTotal ] = useState();
  const [ tax, setTax ] = useState();
  const [ creditCardFee, setCreditCardFee ] = useState();
  const [ grandTotal, setGrandTotal ] = useState();

  // Handlers

  // MUI Steps

  const steps = [
    'Confirmation',
    'Add-On Order',
    'Order Placement',
    'Payment'
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const calcGrandTotal = () => {
    setSubTotal(props.subTotal*1);
    setTax(props.subTotal*0.0875);
    setCreditCardFee((props.subTotal*0.03)+.3);
    let allFees = tax+creditCardFee
    let tempTotal = subTotal+allFees
    setGrandTotal(tempTotal);
  }
  
  useEffect(() => {
    async function setFinalCartItems() {
      await setFinalCart({ "Orders": props.cart });
    }
    calcGrandTotal();
    setFinalCartItems();
  },[props.cart, props.subTotal, grandTotal])
  
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: '300px', maxWidth: '800px', padding: '3em 3em', margin: '0 auto', backgroundColor: 'rgba(255, 249, 220, 1)', marginTop: '1em' }} >
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ fontFamily: 'Raleway', fontWeight: 'bold', paddingBottom: '.5em', marginBottom: '1em', borderBottom: '2px solid #dc5a41' }}>
            <Typography variant='h4' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>Order Confirmation</Typography>
          </Grid>
          {/* Steps */}
          <Stepper nonLinear activeStep={activeStep} disabled={true} sx={{ marginTop: '.5em', width: '100%'}} alternativeLabel>
            {steps.map((label, i) => (
              <Step key={label} completed={completed[i]}>
                <StepButton color='inherit' >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {allStepsCompleted() ? (
            <OrderResult 
              closeConfirmation={props.closeConfirmation}
              orderId={orderId}
              subTotal={subTotal}
            />
          ) : activeStep === 0 ? (
            <OrderDetails 
              finalCart={finalCart} 
              subTotal={subTotal} 
              tax={tax} 
              creditCardFee={creditCardFee}
              grandTotal={grandTotal}
              setOrderId={setOrderId}
              orderId={orderId}
              handleComplete={handleComplete}
              closeConfirmation={props.closeConfirmation}
              handleNext={handleNext}
            />
          ) : activeStep === 1 ? (
            <AddOn 
              handleBack={handleBack} 
              handleNext={handleNext} 
              handleComplete={handleComplete}
              orderId={orderId}
              subTotal={subTotal}
              tax={tax}
              creditCardFee={creditCardFee}
              grandTotal={grandTotal}
            />
            ) : activeStep === 2 ? (
              <OrderFinal 
                handleBack={handleBack}
                handleNext={handleNext} 
                orderId={orderId}
                subTotal={subTotal}
                tax={tax}
                creditCardFee={creditCardFee}
                grandTotal={grandTotal}
                handleComplete={handleComplete}
              />
            ) : (
              <PaymentSetting 
                handleBack={handleBack} 
                handleNext={handleNext}
                orderId={orderId}
                handleComplete={handleComplete}
                allStepsCompleted={allStepsCompleted}
                completed={completed}
                activeStep={activeStep}
                subTotal={subTotal}
              />
          )}
        </Grid>
      </Card>
    </ThemeProvider>
  );
}
export default Confirmation;