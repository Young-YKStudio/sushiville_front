import { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Grid, Typography, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';
import CardInformation from './CardInformation';
import styled from "@emotion/styled";


const Cardform = (props) => {

  // states 
  const [ paymentProcessing, setPaymentProcessing ] = useState(false);
  const [ line1, setLine1 ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ cardName, setCardName ] = useState('');
  const [ postal, setPostal ] = useState('');
  const [ checkoutError, setCheckoutError ] = useState('');


  // stripe
  const stripe = useStripe();
  const elements = useElements();

  const CardElementContainer = styled.div`
    height: 15px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;

    & .StripeElement {
      width: 100%;
      padding: 15px;
      border: 1px solid gray;
      border-radius: 4px;
    }
  `;

  // handlers
  const cardNameHandler = (e) => {
    setCardName(e.currentTarget.value);
  }

  const cardAddressHandler = (e) => {
    setLine1(e.currentTarget.value);
  }
  const cardCityHandler = (e) => {
    setCity(e.currentTarget.value);
  }

  const cardPostalHandler = (value) => {
    setPostal(value);
  }

  const cardStateHandler = (value) => {
    setState(value)
  }

  const cardCountryHandler = (value) => {
    setCountry(value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const billingDetails = {
      name: cardName,
      address: {
        city: city,
        line1: line1,
        state: state,
        postal_code: postal
      }
    }

    try {
      const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/creditcard/charge`, {
        totalAmount: Number(props.total.toFixed(2)),
        orderNumber: props.orderNumber
      })

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement('card'),
        billing_details: billingDetails
      })

      
      if (paymentMethodReq.error) {
          setCheckoutError(paymentMethodReq.error.message);
          setPaymentProcessing(false)
          return
        }
        
      const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodReq.paymentMethod.id
        })
        
      if (error) {
        setCheckoutError(error.message)
        setPaymentProcessing(false)
        return
      }

      props.handleComplete();
      props.handleNext();

    } catch (err) {
      setCheckoutError(err.message)
    }

  }

  const cardElementOpts = {
    iconStyle: 'solid',
    hidePostalCode:  true
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Card sx={{ padding: '1em 1em'}}>
          <form onSubmit={handleFormSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <CardInformation 
                  line1={line1}
                  city={city}
                  state={state}
                  country={country}
                  cardName={cardName}
                  postal={postal}
                  cardNameHandler={cardNameHandler}
                  cardAddressHandler={cardAddressHandler}
                  cardCityHandler={cardCityHandler}
                  cardStateHandler={cardStateHandler}
                  cardCountryHandler={cardCountryHandler}
                  cardPostalHandler={cardPostalHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <CardElementContainer>
                  <CardElement 
                    options={cardElementOpts}
                  />
                </CardElementContainer>
              </Grid>
              { !checkoutError === '' ? 
              <Grid item xs={12}>
                <Typography sx={{ color: 'red', textAlign: 'center', marginBottom: '1em'}}>There is error</Typography>
              </Grid> 
              : null}
              <Grid item xs={12}>
                <LoadingButton disabled={paymentProcessing || !stripe} loading={paymentProcessing} variant="contained" type='submit' sx={{ width: '100%'}}>Pay ${(props.total).toFixed(2)}</LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
export default Cardform;