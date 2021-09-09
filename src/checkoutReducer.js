export default function checkoutReducer(billingAddress, action) {
    switch (action.type) {
        case "copy":
            const { city, country } = action;
            console.log("Copy the shipping address to billing address")
            break
        default:
            throw new Error("Unknown action: " + action.type);
    }

}