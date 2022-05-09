import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { useRouter } from "next/router";
import Spinner from "@components/ui/loaders/spinner/spinner";
import OrderDetails from "@components/orders/order-details";
import { useOrderQuery } from "@framework/orders/orders.query";

export { getServerSideProps } from "@framework/ssr/order";

export default function OrderPage() {
  const { query } = useRouter();

  const { data, isLoading: loading }: any = useOrderQuery({
    tracking_number: query.tracking_number as string,
  });

  return (
    <AccountLayout>
      {loading ? (
        <Spinner showText={false} />
      ) : (
        <>
          <OrderDetails order={data} />
        </>
      )}
    </AccountLayout>
  );
}

OrderPage.Layout = Layout;
