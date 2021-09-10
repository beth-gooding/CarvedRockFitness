import React, { useState, useEffect, useReducer } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { useCart } from "./cartContext";
import checkoutReducer from "./checkoutReducer";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

// Declaring outside component to avoid recreation on each render

const initialAddresses = {
    city: "",
    country: "",
    billingCity: "",
    billingCountry: ""
};

export default function Checkout() {
  const { cartDispatch } = useCart();
  const [state, checkoutDispatch] = useReducer(checkoutReducer, initialAddresses)
  const { city, country, billingCity, billingCountry } = state;
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});
  const [copySelected, setCopySelected] = useState(false);

  // Derived state
  const errors = getErrors({city: city, country: country});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (copySelected) {
        checkoutDispatch({ type: "copy"})
      }
  }, [copySelected, city, country])

  function handleChange(e) {
    e.persist(); // persist the event
    checkoutDispatch({
      type: "updateField",
      fieldName: e.target.id,
      payload: e.target.value,
    });
  }

  function handleBlur(event) {
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        const shippingAddress = {
          city: city,
          country: country
        }
        await saveShippingAddress(shippingAddress);
        cartDispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address) {
    const result = {};
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping!</h1>;
  }

  return (
    <>
      <h1>Checkout</h1>
      <h2>Shipping Info</h2>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <h2>Billing Info</h2>
        <label htmlFor="copyShippingAddress">Copy shipping address?</label>
        <input id="copyShippingAddress" 
               type="checkbox" 
               onChange={() => {setCopySelected((prevCopySelected) => !prevCopySelected);}}
               checked={copySelected}
               />

        <div>
            <label htmlFor="billingCity">City:</label>
            <br/>
            <input id="billingCity" 
                   type="text" 
                   value={billingCity}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   />
        </div> 
        <h2>Payment Info</h2>
        <div>
          Add in payment info inputs
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
