import SectionHeader from "@components/common/section-header";
import ProductOverlayCard from "@components/product/product-overlay-card";
import { useProductsQuery } from "@framework/products/products.query";
import Alert from "@components/ui/alert";
import { Product } from "@framework/types";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
import NotFoundItem from "@components/404/not-found-item";

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: "left" | "center";
}

const ProductsFeatured: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = "mb-12 md:mb-14 xl:mb-16",
  variant = "center",
}) => {
  const { t } = useTranslation();

  const featuredProductsSettings = siteSettings.homePageBlocks.featuredProducts;
  const { data: products, isLoading: loading, error } = useProductsQuery({
    limit: featuredProductsSettings.limit,
    tags: featuredProductsSettings.slug,
  });

  if (!loading && isEmpty(products?.pages?.[0].data)) {
    return <NotFoundItem text={t("text-no-featured-products-found")} />;
  }

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
        <div className="mb-4 h-12 py-2 pl-10 font-bold mx-auto max-w-[1920px] overflow-hidden bg-gradient-to-r  md:h-14 md:pl-10">
          <p className="text-justify font-light text-heading text-2xl md:text-3xl">
            Featured Products
          </p>
        </div>

      {error && <Alert message={error.message} />}

      <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7">
        {loading ? (
          <Spinner showText={false} />
        ) : (
          <>
            {products?.pages[0].data.map((product: Product, idx: number) => (
              <ProductOverlayCard
                key={`product--key${product.id}`}
                product={product}
                variant={variant}
                index={idx}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsFeatured;
