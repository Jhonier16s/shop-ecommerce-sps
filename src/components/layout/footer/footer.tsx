import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="md:mt-0 lg:mt-0 3xl:mt-0 pt-0 lg:pt-0 2xl:pt-0">
    <Widgets widgets={widgets} />
     <Copyright payment={payment} /> 
  </footer>
);

export default Footer;
