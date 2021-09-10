export default function checkoutReducer(state, action) {
    switch (action.type) {
        case "copy": {
            const { city, country } = state.shippingAddress;
            return {...state, billingAddress: {billingCity: city, billingCountry: country}};
        }
        case "updateGeneralAddress":
            const { fieldName, payload } = action;
            return {...state, shippingAddress: {...state.shippingAddress, [fieldName]: payload}};
        case "updateBillingAddress":
            console.log("The billing address is being updated");
            return state;
        default:
            throw new Error("Unknown action: " + action.type);
    }

}