import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { Order } from "@framework/types";
import OrderSingleTable from "@components/my-account/order-single-list";
import OrderSingleList from "@components/my-account/order-single-table";
import React from "react";

type Props = {
  orders: any
}

const OrdersTable: React.FC<Props> = ({ orders }: Props) => {
  console.log("Orders", orders);
  const { width } = useWindowSize();
  const { t } = useTranslation("common");
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-orders")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex flex-col`}
      >
        {width >= 1025 ? (
          <table>
            <thead className="text-sm lg:text-base">
              <tr>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
                  {t("text-order")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {t("text-date")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {t("text-status")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {t("text-total")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
                  {t("text-actions")}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm lg:text-base">
              {orders && orders.map((order: Order) => <OrderSingleTable key={order.id} order={order}/>)}
            </tbody>
          </table>
        ) : (
          <div className="w-full space-y-4">
            {orders && orders.map((order: Order) => <OrderSingleList key={order.id} order={order}/>)}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrdersTable;
