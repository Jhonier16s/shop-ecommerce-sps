import { getLayout } from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrdersTable from "@components/my-account/orders-table";
import ErrorMessage from "@components/ui/error-message";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useOrdersQuery } from "@framework/orders/orders.query";

export { getStaticProps } from "@framework/ssr/common";

export default function OrdersTablePage() {
  const { data, isLoading: loading, error } = useOrdersQuery({});

  console.log("Customer", data);

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <AccountLayout>
      {loading ? (
        <Spinner showText={false} />
      ) : (
        <OrdersTable orders={data?.pages?.[0]?.data} />
      )}
    </AccountLayout>
  );
}

OrdersTablePage.authenticate = true;
OrdersTablePage.getLayout = getLayout;
