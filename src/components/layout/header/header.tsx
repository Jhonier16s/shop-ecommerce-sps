import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
/* import HeaderMenu from "@components/layout/header/header-menu"; */
import SpsHome from "@components/common/homeSps/spsHome";
/* import MetaC from "@components/common/HomeSps/metaC"; */
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@lib/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";
import { authorizationAtom } from "@store/authorization-atom";
/* import { useMenuQuery } from "@framework/menu/menu.query";
import isEmpty from "lodash/isEmpty"; */
import Link from "@components/ui/link";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const Header: React.FC = () => {
  /* const { data, isLoading: loading } = useMenuQuery(); */
  const { openSidebar, setDrawerView, openSearch, openModal, setModalView } =
    useUI();
  const [isAuthorize] = useAtom(authorizationAtom);
  const { t } = useTranslation("common");
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  function handleMobileMenu() {
    setDrawerView("MOBILE_MENU");
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="w-full h-4 sm:h-12 lg:h-20 mb-2 relative z-20"
    >
      <div className="innerSticky text-yellowSps body-font fixed bg-blackSps w-full h-14 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn  rounded-full text-white hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <span className="menuIcon">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>

          <Link href={ROUTES.HOME}>
            <div>
              <SpsHome
                src="/assets/images/banner/Logo-sparklife-ecommerce.jpg"
                className="w-28"
              />
            </div>
          </Link>

          {/* {!loading && !isEmpty(data?.menu) && (
            <HeaderMenu
              data={data?.menu}
              className="hidden lg:flex md:ms-6 xl:ms-10"
            />
          )} */}

          <div className="hidden w-full lg:flex lg:flex-row lg:justify-evenly px-20">
            <Link className="" href={ROUTES.HOME}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Home</h3>
              </div>
            </Link>
            <Link className="" href={ROUTES.CATEGORYMEN}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Men</h3>
              </div>
            </Link>
            <Link className="" href={ROUTES.CATEGORYWOMAN}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Women</h3>
              </div>
            </Link>
            {/* <Link className="mx-4" href={ROUTES.HOME}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Categorias</h3>
              </div>
            </Link> */}
            <Link className="" href={ROUTES.OFFERS}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Offers</h3>
              </div>
            </Link>
            <Link className="" href={ROUTES.SHOPS}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Shops</h3>
              </div>
            </Link>
            <Link className="" href={ROUTES.SEARCH}>
              <div>
                <h3 className="font-segoe font-bold text-xl">Search</h3>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
          {/* <MetaC /> */}
            <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isAuthorize}
                href={ROUTES.ACCOUNT}
                className="text-sm xl:text-base text-yellowSps font-semibold"
                btnProps={{
                  className:
                    "text-sm xl:text-base text-yellowSps font-semibold focus:outline-none",
                  children: t("text-sign-in"),
                  onClick: handleLogin,
                }}
              >
                {t("text-page-my-account")}
              </AuthMenu>
            </div>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
