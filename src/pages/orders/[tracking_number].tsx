import Order from "@framework/orders/order";
import { getLayout } from "@components/layout/layout";

export { getServerSideProps } from "@framework/ssr/order";
export default function OrderPage() {
  return <Order />;
}

OrderPage.authenticate = true;
OrderPage.getLayout = getLayout;
