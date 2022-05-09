import SellWithProgress from "@components/common/sale-with-progress";
import SectionHeader from "@components/common/section-header";
/* cd */
import { useWindowSize } from "@utils/use-window-size";
import { useProductsQuery } from "@framework/products/products.query";
/* import ProductListFeedLoader from "@components/ui/loaders/product-list-feed-loader"; */
/* import Alert from "@components/ui/alert"; */
import NotFoundItem from "@components/404/not-found-item";
import { useTranslation } from "next-i18next";
import { siteSettings } from "@settings/site.settings";
import React from "react";
/* import { usePopularProductsQuery } from "@framework/products/popular-products.query"; */

interface Props {
	className?: string;
	carouselBreakpoint?: {} | any;
}

const ProductsWithFlashSale: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-7",
	carouselBreakpoint,
}) => {
  const { t } = useTranslation();
	const { width } = useWindowSize();

  const flashSaleSettings = siteSettings.homePageBlocks.flashSale;

	/* const { data: topProducts, isLoading: topProductLoading, error } = usePopularProductsQuery({
    limit: 4
  }) */;

  const {
		data: flashSellProduct,
		isLoading: flashSellProductLoading,
	} = useProductsQuery({
    limit: flashSaleSettings.limit ?? 10,
    tags: flashSaleSettings.slug ?? "flash-sale"
	});

	return (
		<div
			className={`grid grid-cols-1 gap-5 md:gap-14 xl:gap-7 xl:grid-cols-7 2xl:grid-cols-9 ${className}`}
		>
			<div className="xl:col-span-5 2xl:col-span-7 border border-gray-300 rounded-lg pt-6 md:pt-7 lg:pt-9 xl:pt-7 2xl:pt-9 px-4 md:px-5 lg:px-7 pb-5 lg:pb-7">
				<SectionHeader
					sectionHeading="text-top-products"
					categorySlug="/search"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 xl:gap-7 xl:-mt-1.5 2xl:mt-0">
					{/* {error ? (
						<Alert message={error?.message} />
					) : topProductLoading && topProducts?.length ? (
						<ProductListFeedLoader limit={topProducts?.length} />
					) : (
            topProducts?.map((product) => (
							<ProductCard
								key={`product--key${product.id}`}
								product={product}
								imgWidth={265}
								imgHeight={265}
								imageContentClassName="flex-shrink-0 w-32 sm:w-44 md:w-40 lg:w-52 2xl:w-56 3xl:w-64"
								contactClassName="ps-3.5 sm:ps-5 md:ps-4 xl:ps-5 2xl:ps-6 3xl:ps-10"
							/>
						))
					)} */}
				</div>
			</div>
			{
			  flashSellProduct?.pages.length ? (width < 1280 ? (
          <SellWithProgress
            carouselBreakpoint={carouselBreakpoint}
            products={flashSellProduct.pages[0]?.data}
            loading={flashSellProductLoading}
            className="col-span-full xl:col-span-2 row-span-full xl:row-auto lg:mb-1 xl:mb-0"
          />
        ) : (
          <SellWithProgress
            carouselBreakpoint={carouselBreakpoint}
            products={flashSellProduct.pages[0]?.data}
            loading={flashSellProductLoading}
            productVariant="gridSlim"
            imgWidth={330}
            imgHeight={330}
            className="col-span-full xl:col-span-2 row-span-full xl:row-auto"
          />
        )) : (
          <NotFoundItem text={t('text-no-flash-products-found')} />
        )
      }
		</div>
	);
};

export default ProductsWithFlashSale;
