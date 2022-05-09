import Orders from "@framework/orders/orders";
import { getLayout } from "@components/layout/layout";

export { getStaticProps } from "@framework/ssr/common";

export default function OrdersPage() {
  return <Orders />;
}

OrdersPage.authenticate = true;

OrdersPage.getLayout = getLayout;
