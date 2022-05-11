import Link from "next/link";
import { useRouter } from "next/router";
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { ROUTES } from "@lib/routes";
import { useTranslation } from "next-i18next";
import { useLogoutMutation } from "@framework/auth/auth.query";
import { signOut as socialLoginSignOut } from "next-auth/client";
import { useAtom } from "jotai";
import { authorizationAtom } from "@store/authorization-atom";
import Cookies from "js-cookie";
import { AUTH_TOKEN } from "@lib/constants";

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT,
    name: "text-dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_ORDERS,
    name: "text-orders",
    icon: <IoCartOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_ADDRESS,
    name: "text-account-address",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_CONTACT_NUMBER,
    name: "text-contact-number",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_CHANGE_PASSWORD,
    name: "text-change-password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];

export default function AccountNav() {
  const { mutate } = useLogoutMutation();
  const { pathname, ...router } = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  const [, authorize] = useAtom(authorizationAtom);
  const mainPath = `/${newPathname[0]}`;
  const { t } = useTranslation("common");

  async function onClickLogout() {
    await socialLoginSignOut({ redirect: false });
    mutate(undefined, {
      onSuccess: () => {
        Cookies.remove(AUTH_TOKEN);
        authorize(false);
        router.push("/");
      },
    });
  }

  return (
    <nav className="flex  px-2 py-2 flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
      {accountMenu.map((item) => {
        const menuPathname = item.slug.split("/").slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link key={item.slug} href={item.slug}>
            <a
              className={
                mainPath === menuPath
                  ? "bg-yellowSps font-bold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "

                  : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
              }
            >
              {item.icon}
              <span className="ps-2">{t(`${item.name}`)}</span>
            </a>
          </Link>
        );
      })}
      <button
        className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
        onClick={onClickLogout}
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span className="ps-2">{t("text-logout")}</span>
      </button>
    </nav>
  );
}
