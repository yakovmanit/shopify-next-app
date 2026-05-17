import {AddressesPageContent} from "@/components/account";

export default async function Addresses() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 mt-4">Your Addresses</h1>

      <AddressesPageContent />
    </div>
  );
}
