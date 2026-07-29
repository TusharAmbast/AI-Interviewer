import PayPalCheckout from "@/app/(main)/billing/_components/PayPalCheckout"; // Adjust path as needed

export default function BillingPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Billing & Upgrades</h1>
      <p className="mb-8 text-muted-foreground">Upgrade your account to unlock unlimited interviews.</p>
      
      <PayPalCheckout amount="29.99" />
    </div>
  );
}