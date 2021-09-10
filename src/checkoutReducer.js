export default function checkoutReducer(state, action) {
    switch (action.type) {
        case "copy": {
            return {...state, billingCity: state.city, billingCountry: state.country};
        }
        case "updateField":
            const {fieldName, payload } = action;
            return {...state, [fieldName]: payload};
        default:
            throw new Error("Unknown action: " + action.type);
    }

}