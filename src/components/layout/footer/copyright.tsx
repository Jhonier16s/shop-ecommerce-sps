import Container from "@components/ui/container";

import { useTranslation } from "next-i18next";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  const { t } = useTranslation("footer");
  return (
    <div className="bg-purpleSps mt-0 pb-0 sm:pb-20 md:pb-0 mb-0 sm:mb-0">
      <Container className="bg-purpleSps flex flex-col-reverse md:flex-row text-center md:justify-between">
      {/*   <p className="text-body text-xs md:text-[13px] lg:text-sm leading-6">
          {t("text-copyright")} &copy; {year}&nbsp;
          <a
            className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </a>
          &nbsp; {t("text-all-rights-reserved")}
        </p> */}
        <p className="text-white">{year}</p>

        {payment && (
          <ul className="hidden md:flex  flex-wrap justify-center items-center space-s-4 xs:space-s-5 lg:space-s-7 mb-1 md:mb-0 mx-auto md:mx-0">
            {payment?.map((item) => (
              <li
                className="mb-2 md:mb-0 transition hover:opacity-80"
                key={`payment-list--key${item.id}`}
              >
                <a href={item.path ? item.path : "/#"} target="_blank">
                  <img
                    src={item.image}
                    alt={t(`${item.name}`)}
                    height={item.height}
                    width={item.width}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default Copyright;
