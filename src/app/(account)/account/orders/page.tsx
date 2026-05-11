import {OrdersPageContent} from "@/components/account";
import {getSession} from "@/lib";
import {getCustomerOrders} from "@/services";
import {redirect} from "next/navigation";

export default async function Orders() {
  const { accessToken, isAuthenticated } = await getSession();

  if (!isAuthenticated || !accessToken) {
    redirect("/");
  }

  const customerOrders = await getCustomerOrders(accessToken);

  return (
    <OrdersPageContent
      orders={customerOrders ?? []}
    />
  );
}
