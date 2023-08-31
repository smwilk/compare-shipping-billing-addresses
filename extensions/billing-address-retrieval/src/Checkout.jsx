import React from "react";
import {
  reactExtension,
  Banner,
  useSettings,
  useShippingAddress,
  useBillingAddress,
  useAttributes
} from "@shopify/ui-extensions-react/checkout";

// Set the entry points for the extension
const checkoutBlock = reactExtension("purchase.checkout.block.render", () => <App />);
export { checkoutBlock };

function App() {
  // Use the merchant-defined settings to retrieve the extension's content
  const billingAddress = useBillingAddress();
  const shippingAddress = useShippingAddress();
  const cartAttributes = useAttributes();

  // Check if shipping address and billing address are the same
  const isSameAddress = JSON.stringify(billingAddress) === JSON.stringify(shippingAddress);
  // Check if cart attribute with the key of "gift wrapping" has the value "I want gift wrapping"
  const hasGiftWrapping = cartAttributes?.some(attr => attr.key === "gift wrapping" && attr.value === "I want gift wrapping");
  // Render the banner only if both conditions are true
  return (
    isSameAddress && hasGiftWrapping && (
      <Banner
        status="warning"
      >
        You've selected gift wrapping. Update the billing address so we can send the invoice to you.
      </Banner>
    )
  );
}
