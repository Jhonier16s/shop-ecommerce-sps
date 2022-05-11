import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import BrandGridBlock from "@containers/brand-grid-block";
import CategoryBlock from "@containers/category-block";
import { getLayout } from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
/* import BannerBlock from "@containers/banner-block"; */
import Divider from "@components/ui/divider";
/* import DownloadApps from "@components/common/download-apps"; */
/* import Support from "@components/common/support";
import Instagram from "@components/common/instagram"; */
import ProductsFeatured from "@containers/products-featured";
/* import BannerSliderBlock from "@containers/banner-slider-block"; */
import ExclusiveBlock from "@containers/exclusive-block";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
/* import Subscription from "@components/common/subscription"; */
import { ROUTES } from "@lib/routes";

// All data file
import { useBannerQuery } from "@framework/banner/banner.query";
import NewTittles from "@components/ui/NewTittles";

export { getStaticProps } from "@framework/ssr/pages";

export default function Home() {
  const { data: banners } = useBannerQuery();

  return (
    <>
      <ExclusiveBlock className="mb-12 md:mb-14 xl:mb-16 px-2.5 mx-auto max-w-[1920px]" />
      <Container>
        <CategoryBlock sectionHeading="text-shop-by-category" />
        <ProductsFeatured
          sectionHeading="text-featured-products"
          variant="center"
        />
      </Container>
      {/* <BannerBlock banners={banners?.bannerDataOne} /> */}
      <Container>
        <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/#"
          banner={banners?.homeThreeProductsBanner}
        />
      </Container>
      {/* <BannerSliderBlock banners={banners?.promotionBanner} /> */}
      <Container>
      <NewTittles name="Flash Sale" />
        <ProductsFlashSaleBlock date={"2023-03-01T01:02:03"} />
      </Container>
      {/* <BannerBlock banners={banners?.homeThreeMasonryBanner} /> */}
      <Container>
        <NewTittles name="Brands" />
        <BrandGridBlock sectionHeading="text-top-brands" />
        <BannerCard
          banner={banners?.homeFiveBanner}
          href={`${ROUTES.COLLECTIONS}/${banners?.homeFiveBanner?.slug}`}
          className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
          effectActive={true}
        />
        <NewTittles name = "New Arrivals" />
        <NewArrivalsProductFeed />
       {/*  <DownloadApps />
        <Support />
        <Instagram />
        <Subscription className="bg-opacity-0 px-8 sm:px-16 xl:px-0" /> */}
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.getLayout = getLayout;
