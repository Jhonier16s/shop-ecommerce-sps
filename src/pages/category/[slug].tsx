import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";
/* import Subscription from "@components/common/subscription"; */
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { useRouter } from "next/router";

export default function Category() {
  const { query } = useRouter();

	return (
		<div className="border-t-2 border-borderBottom">
			<Container>
				<CategoryBanner />
				<div className="pb-16 lg:pb-20">
					<ProductGrid className="3xl:grid-cols-6" categorySlug={query?.slug as string} />
				</div>
				{/* <Subscription /> */}
			</Container>
		</div>
	);
}

Category.getLayout = getLayout;

export const getServerSideProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
