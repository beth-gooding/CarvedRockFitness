export default function checkoutReducer(billingAddress, action) {
    switch (action.type) {
        case "copy":
            const { city, country } = action;
            console.log("Copy the shipping address to billing address");
            break
        case "updateShippingAddress":
            console.log("Shipping addresses is being updated");
            break
        case "updateBillingAddress":
            console.log("The billing address is being updated");
            break
        default:
            throw new Error("Unknown action: " + action.type);
    }

}