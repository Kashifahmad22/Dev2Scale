import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/services/ecommerce");

export default function EcommercePage() {
  return (
    <ServicePageTemplate
      path="/services/ecommerce"
      phase="build"
      headline="A store built to sell, not just to list products."
      intro="An online store is an operation, not a page: payments, shipping, inventory, returns, and the checkout that decides whether any of it earns money. We set the whole thing up and hand you the keys."
      deliverables={[
        {
          title: "Store, product and collection architecture",
          body: "Categories and product structure a customer can navigate, and that you can extend without it becoming a mess after fifty products.",
        },
        {
          title: "Cart and checkout, tuned",
          body: "The highest-leverage screens in the whole store. Fewer steps, visible trust signals, and no surprise costs appearing at the last stage.",
        },
        {
          title: "Payments, shipping and inventory",
          body: "Gateway, shipping partners, order flow, customer accounts and stock — configured and tested with real transactions before launch.",
        },
        {
          title: "Up to 25 product uploads",
          body: "Loaded properly with images, variants, descriptions and pricing, so the store opens with a real catalogue rather than three samples.",
        },
        {
          title: "Add-to-cart and purchase tracking",
          body: "Conversion events wired for Meta and Google, so when you start advertising you can see which products actually sell.",
        },
        {
          title: "Admin training and handover",
          body: "A walkthrough of adding products, processing orders and handling returns. You run the store; you don't file a ticket to change a price.",
        },
      ]}
      audience={[
        "You sell physical products and take orders over WhatsApp or Instagram DMs.",
        "You're on a marketplace and want a direct channel you actually own.",
        "You have a store that gets traffic but almost no completed checkouts.",
        "You're a fashion, jewellery or lifestyle brand ready to sell direct.",
      ]}
      priceNote="E-commerce builds run ₹40,000–₹50,000 one-time. Platform subscriptions, themes and apps are billed by those providers, not by us."
    />
  );
}
