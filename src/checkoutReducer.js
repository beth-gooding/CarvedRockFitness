export default function checkoutReducer(state, action) {
    switch (action.type) {
        case "copy": {
            const { city, country } = action;
            console.log("Copy the shipping address to billing address");
            return {...state, billingAddress: {billingCity: city, billingCountry: country}};
        }
        case "updateGeneralAddress":
            const { city } = action;
            console.log("Shipping addresses is being updated");
            return {...state, shippingAddress: {...state.shippingAddress, city: city}};
        case "updateBillingAddress":
            console.log("The billing address is being updated");
            return state;
        default:
            throw new Error("Unknown action: " + action.type);
    }

}