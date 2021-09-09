export default function checkoutReducer(state, action) {
    switch (action.type) {
        case "copy":
            const { city, country } = action;
            console.log("Copy the shipping address to billing address");
            return state;
        case "updateGeneralAddress":
            console.log("Shipping addresses is being updated");
            return state;
        case "updateBillingAddress":
            console.log("The billing address is being updated");
            return state;
        default:
            throw new Error("Unknown action: " + action.type);
    }

}