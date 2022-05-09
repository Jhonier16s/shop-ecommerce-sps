import Container from "@components/ui/container";
import WidgetLink from "@components/widgets/widget-link";
import WidgetSocial from "@components/widgets/widget-social";
import WidgetContact from "@components/widgets/widget-contact";

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  return (
    <Container>
      <div className="grid pt-0 mb-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-9 lg:gap-x-8 xl:gap-5  pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0 2xl:mb-0 3xl:-mb-0">
        <WidgetSocial />
        <WidgetContact />
        {widgets.map((widget, index) => (
          <WidgetLink data={widget} key={`widget-link-${index}`} />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
