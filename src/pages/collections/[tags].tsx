import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { ROUTES } from "@lib/routes";
import { useTranslation } from "next-i18next";
import CollectionTopBar from "@components/collection/collection-top-bar";
import { CollectionFilters } from "@components/collection/collection-filters";

export { getStaticPaths, getStaticProps } from "@framework/ssr/tags";

export default function Collections() {
  const { t } = useTranslation("common");

  return (
    <div className="border-t-2  border-borderBottom">
      <Container>
        <div className={`flex pt-8 pb-10 lg:pb-16 xl:pb-20`}>
          <div className="flex-shrink-0 pe-8 xl:pe-12 2xl:pe-24 hidden lg:block w-72 xl:w-80 2xl:w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-5 xl:pb-7 pt-1">
                <BreadcrumbItems separator="/">
                  <ActiveLink
                    href={"/"}
                    activeClassName="font-semibold text-white"
                    className="text-white"
                  >
                    <a>{t("breadcrumb-home")}</a>
                  </ActiveLink>
                  <ActiveLink
                    href={ROUTES.SEARCH}
                    activeClassName="font-semibold text-white"
                  >
                    <a className="capitalize">{t("breadcrumb-collection")}</a>
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <CollectionFilters />
            </StickyBox>
          </div>

          <div className="w-full xl:-ms-4 2xl:-ms-9">
            <CollectionTopBar />
            <ProductGrid />
          </div>
        </div>
        {/* <Subscription /> */}
      </Container>
    </div>
  );
}

Collections.getLayout = getLayout;
