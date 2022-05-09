import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/products/products.query";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";
import { useEffect } from "react";
import { useSearch } from "@contexts/search.context";
import { formatPriceRange } from "@lib/format-price-range";
import NotFound from "@components/404/not-found";
import isEmpty from "lodash/isEmpty";

interface ProductGridProps {
  className?: string;
  shopId?: string;
  categorySlug?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "", shopId, categorySlug }) => {
  const { query } = useRouter();
  const { updateSearchResultCount } = useSearch();
  const priceRange = query.price && formatPriceRange(query.price as string);

  const {
    isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    ...(Boolean(shopId) && { shop_id: Number(shopId) }),
    text: query.q && query.q as string,
    category: query.category && query.category as string || categorySlug && categorySlug,
    type: query.brand && query.brand as string,
    orderBy: query.orderBy && query.orderBy as string,
    sortedBy: query.sortedBy && query.sortedBy as string,
    variations: query.variations && query.variations as string,
    tags: query.tags && query.tags as string,
    ...(priceRange && priceRange.length === 2 && { min_price: priceRange.join(",") }),
    ...(priceRange && priceRange.length === 1 && { max_price: priceRange[0] }),
  });

  useEffect(() => {
    if (data && data.pages[0].paginatorInfo.total >= 0) {
      updateSearchResultCount(data.pages[0].paginatorInfo.total);
    }
  }, [data]);


  if (error) return <p>{error.message}</p>;

  const { t } = useTranslation("common");

  // If no product found
  if (!isLoading && isEmpty(data?.pages?.[0].data)) {
    return (
      <NotFound text={t("text-no-products-found")} />
    )
  }

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data? (
          <ProductFeedLoader limit={20} uniqueKey="search-product"/>
        ) : (
          data?.pages?.map((page) => {
            return page?.data?.map((product: Product) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                variant="grid"
              />
            ));
          })
        )}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {hasNextPage && (
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            variant="slim"
          >
            {t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};
