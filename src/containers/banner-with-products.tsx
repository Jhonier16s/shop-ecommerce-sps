import BannerCard from "@components/common/banner-card";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardListSmallLoader from "@components/ui/loaders/product-card-small-list-loader";
import { useProductsQuery } from "@framework/products/products.query";
import Alert from "@components/ui/alert";
import { ROUTES } from "@lib/routes";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
import NotFoundItem from "@components/404/not-found-item";
import { StaticBanner } from "@framework/types";

interface ProductsProps {
  banner: StaticBanner[];
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: "default" | "reverse";
}

const BannerWithProducts: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  variant = "default",
  className = "text-white mb-12 md:mb-14 xl:mb-16",
  banner,
}) => {
  const { t } = useTranslation();

  const onSellingSettings = siteSettings.homePageBlocks.onSaleSettings;
  const {
    data: products,
    isLoading: loading,
    error,
  } = useProductsQuery({
    limit: onSellingSettings.limit ?? 9,
    tags: onSellingSettings.slug ?? "on-sale",
  });

  if (!loading && isEmpty(products?.pages?.[0].data)) {
    return <NotFoundItem text={t("text-no-on-selling-products-found")} />;
  }

  return (
    <div className={className}>
      <div className="border rounded-md border-gray-800 mb-4 h-16 text-justify py-2 pl-9 font-bold mx-auto max-w-[1920px] overflow-hidden bg-gradient-to-r  md:h-20  md:pl-10">
        <p className="font-light pb-2 text-heading text-2xl md:text-3xl">
          Other Products
        </p>
        {
          <SectionHeader
            sectionHeading={sectionHeading}
            categorySlug={categorySlug}
          />
        }
      </div>

      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7">
          {variant === "reverse" ? (
            <BannerCard
              banner={banner[1]}
              href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
              className="hidden 3xl:block"
              effectActive={true}
            />
          ) : (
            <BannerCard
              banner={banner[0]}
              href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
              className="hidden 3xl:block"
              effectActive={true}
            />
          )}
          <div
            className={`col-span-full 3xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 xl:gap-7 ${
              variant === "reverse" ? "row-span-full" : ""
            }`}
          >
            {loading
              ? Array.from({ length: 9 }).map((_, idx) => (
                  <ProductCardListSmallLoader
                    key={idx}
                    uniqueKey={`on-selling-${idx}`}
                  />
                ))
              : products?.pages[0].data.map((product) => (
                  <ProductCard
                    key={`product--key${product.id}`}
                    product={product}
                    imgWidth={176}
                    imgHeight={176}
                    variant="listSmall"
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerWithProducts;
