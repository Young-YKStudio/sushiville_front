import { useState } from "react";
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
  const [ messages, addMessage ] = useState('');
  const [ error, setError ] = useState(false);

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

  const testtestHandleForm = async (e) => {
    e.preventDefault();
    let testCard = elements.getElement('card')
    let billingDetails = {
      name: cardName,
      address: {
        city: city,
        line1: line1,
        state: state,
        postal_code: postal,
      }
    }

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: testCard,
      billing_details: billingDetails,
    })

    const paymentMethod = async (result) => {
      if(result.error) {
        console.log(error)
      } else {
        try {
          const paymentMethodReq = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/creditcard/charge`, {
            payment_method_id: result.paymentMethod.id,
            currency: 'usd',
            totalAmount: Number(props.total.toFixed(2)),
            orderNumber: props.orderNumber,
            billing: billingDetails,
          })

          if (paymentMethodReq.statusText === "OK") {
            props.handleComplete();
            props.handleNext();
          } else {
            addMessage('Please check the card')
          }
        } catch(error) {
          console.log(error)
        }
      }
    }

    paymentMethod(result);
  }

  const cardElementOpts = {
    iconStyle: 'solid',
    hidePostalCode:  true
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Card sx={{ padding: '1em 1em'}}>
          <form onSubmit={testtestHandleForm}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: 'center', color: '#dc5a41', fontSize: '1.15em'}}>{messages}</Typography>
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
                    id='card-element'
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