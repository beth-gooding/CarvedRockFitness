export default function checkoutReducer(state, action) {
    switch (action.type) {
        case "copy": {
            const { city, country } = state.shippingAddress;
            return {...state, billingAddress: {billingCity: city, billingCountry: country}};
        }
        case "updateShippingAddress": {
            const { fieldName, payload } = action;
            return {...state, shippingAddress: {...state.shippingAddress, [fieldName]: payload}};
        }
        case "updateBillingAddress": {
            const { fieldName, payload } = action;
            return {...state, billingAddress: {...state.billingAddress, [fieldName]: payload}};
        }
        case "updateAddress":
            const { addressType, fieldName, payload } = action;
            return {...state, [addressType]: {...[state.addressType], [fieldName]: payload}};
        default:
            throw new Error("Unknown action: " + action.type);
    }

}