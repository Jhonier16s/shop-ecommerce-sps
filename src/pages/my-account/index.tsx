import Link from "@components/ui/link";
import { getLayout } from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@lib/routes";
import { useTranslation } from "next-i18next";
import useUser from "@framework/auth/use-user";
import {useLogoutMutation} from "@framework/auth/auth.query";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {authorizationAtom} from "@store/authorization-atom";
import {signOut as socialLoginSignOut} from "next-auth/client";
import Cookies from "js-cookie";
import {AUTH_TOKEN} from "@lib/constants";

export { getStaticProps } from "@framework/ssr/common";

export default function AccountPage() {
  const { t } = useTranslation("common");
  const { me } = useUser();
  const { mutate } = useLogoutMutation();
  const { pathname, ...router } = useRouter();
  const [, authorize] = useAtom(authorizationAtom);

  async function onClickLogout(e: any) {
    e.preventDefault();
    await socialLoginSignOut({ redirect: false });
    mutate(undefined, {
      onSuccess: () => {
        Cookies.remove(AUTH_TOKEN);
        authorize(false);
        router.push("/");
      },
    });
  }

  const currentUserIdentity = me?.name ?? me?.email;

  return (
    <AccountLayout>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-white mb-3 xl:mb-5">
        {t("text-dashboard")}
      </h2>
      <div className="text-sm leading-7 md:text-base md:leading-loose">
        <p className="capitalize">
          {t("text-hello")} <span className="font-bold">{currentUserIdentity}</span> (not{" "}
          <span className="font-bold">{currentUserIdentity}</span>?{" "}
          <button onClick={onClickLogout} className="font-bold underline cursor-pointer focus:outline-none">{t("text-logout")}</button>)
        </p>
        <br />
        {t("text-account-dashboard")}{" "}
        <Link
          href={ROUTES.ACCOUNT_ORDERS}
          className="text-gray-400 underline font-light hover:text-yellowSps"
        >
          {t("text-recent-orders")}
        </Link>
        , {t("text-manage-your")}{" "}
        <Link
          href={ROUTES.ACCOUNT_ADDRESS}
          className="text-gray-400 underline font-light hover:text-yellowSps"
        >
          {t("text-account-address")}
        </Link>{" "}
        {t("text-and")}{" "}
        <Link
          href={ROUTES.ACCOUNT_CONTACT_NUMBER}
          className="text-gray-400 underline font-light hover:text-yellowSps"
        >
          {t("text-contact-number")}
        </Link>{" "}
        {t("text-and")}{" "}
        <Link
          href={ROUTES.ACCOUNT_CHANGE_PASSWORD}
          className="text-gray-400 underline font-light hover:text-yellowSps"
        >
          {t("text-change-your-password")}
        </Link>
        .
      </div>
    </AccountLayout>
  );
}

AccountPage.authenticate = true;
AccountPage.getLayout = getLayout;
