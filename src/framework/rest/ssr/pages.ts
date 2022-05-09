import { fetchSettings } from "@framework/settings/settings.query";
import { fetchCategories } from "@framework/category/categories.query";
import { fetchBrands } from "@framework/brand/brands.query";
import { fetchProducts } from "@framework/products/products.query";
import { API_ENDPOINTS } from "@framework/utils/endpoints";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchMenus } from "@framework/menu/menu.query";
import {fetchBanners} from "@framework/banner/banner.query";
import {fetchAttributes} from "@framework/attributes/attributes.query";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(API_ENDPOINTS.SETTINGS, fetchSettings);
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.PRODUCTS, {}],
    fetchProducts,
    {
      staleTime: 60 * 1000,
    }
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PARENT_CATEGORIES, {}],
    fetchCategories,
    {
      staleTime: 60 * 1000,
    }
  );
  await queryClient.prefetchQuery(API_ENDPOINTS.TYPE, fetchBrands, {
    staleTime: 60 * 1000,
  });

  await queryClient.prefetchQuery(API_ENDPOINTS.MENU, fetchMenus, {
   staleTime: 60 * 1000,
  });

  await queryClient.prefetchQuery(API_ENDPOINTS.BANNERS, fetchBanners, {
    staleTime: 60 * 1000,
  });

  await queryClient.prefetchQuery(API_ENDPOINTS.ATTRIBUTES, fetchAttributes, {
    staleTime: 60 * 1000,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "menu",
        "forms",
        "footer",
      ])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};
