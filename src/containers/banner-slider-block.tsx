import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@lib/routes";
import { StaticBanner } from "@framework/types";

interface BannerProps {
  banners: StaticBanner[];
  className?: string;
}

const breakpoints = {
	"0": {
		slidesPerView: 2,
	},
};

const BannerSliderBlock: React.FC<BannerProps> = ({
	className = "mt-0 md:mb-0 xl:mb-0",
  banners
}) => {
	return (
		<div className={`${className} bg-blackSps pt-12 md:pt-6 banner-slider-block.tsx mx-auto max-w-full max-h-full overflow-hidden`}>
			<div className="h-450 -mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
				<Carousel
					breakpoints={breakpoints}
					centeredSlides={true}
					pagination={{
						clickable: true,
					}}
					paginationVariant="circle"
					buttonClassName="hidden"
				>
					{banners.map((banner: any) => (
						<SwiperSlide
							key={`banner--key${banner.id}`}
							className="px-1.5 md:px-2.5 xl:px-3.5"
						>
							<BannerCard
								banner={banner}
								effectActive={true}
								href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default BannerSliderBlock;
