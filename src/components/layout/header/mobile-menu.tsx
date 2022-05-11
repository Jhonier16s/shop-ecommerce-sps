import { useState } from "react";
import Link from "@components/ui/link";
import Scrollbar from "@components/common/scrollbar";
import { IoIosArrowDown } from "react-icons/io";

import { useUI } from "@contexts/ui.context";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { useMenuQuery } from "@framework/menu/menu.query";
import { useSettings } from "@contexts/settings.context";
import { getIcon } from "@lib/get-icon";
import socialIcons from "@components/icons/social-icon";
import { Social } from "@framework/types";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@lib/routes";

export default function MobileMenu() {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { data, isLoading: loading } = useMenuQuery();
  const settings = useSettings();

  const socials = settings?.contactDetails?.socials;

  const { closeSidebar } = useUI();
  const { t } = useTranslation("menu");
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      let index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = "",
  }: any) =>
    data.label && (
      <li className={`mb-0.5 ${className}`}>
        <div className="flex items-center justify-between">
          <Link
            href={data.path}
            className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out"
          >
            <span className="block w-full" onClick={closeSidebar}>
              {t(`${data.label}`)}
            </span>
          </Link>
          {hasSubMenu && (
            <div
              className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-white ${
                  activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className=" text-white pt-0.5">
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={dept > 1 && "ps-4"}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col bg-blackSps justify-between w-full h-full">
        <div className="w-full bg-blackSps  flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
          <Link href={ROUTES.HOME}>
            <div>
              <h3 className="font-semibold text-lg text-white">CryptoCommerce</h3>
            </div>
          </Link>
          <button
            className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-yellowSps mt-1 md:mt-0.5" />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow mb-auto">
          <div className="flex flex-col py-7 px-0 lg:px-2 bg-blackSps text-white">
            {!loading && !isEmpty(data?.menu) && (
              <ul className="mobileMenu">
                {data?.mobileMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index} 
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </Scrollbar>

        <div className="flex items-center justify-center bg-blackSps  px-7 flex-shrink-0 space-s-1">
          {socials?.map((social: Social, index: number) => (
            <a
              href={social?.url ?? "#!"}
              className={`text-white p-5  first:-ms-4 transition duration-300 ease-in hover:opacity-100`}
              target="_blank"
              key={index}
            >
              {getIcon({
                iconList: socialIcons,
                iconName: social?.icon,
              })}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
