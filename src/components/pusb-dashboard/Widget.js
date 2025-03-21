import Card from "../../components/shared/Card";

const Widget = (props) => {
  const { icon, title, subtitle } = props;

  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] shadow-xl border border-gray-100">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-[#F4F7FE] p-3 dark:bg-navy-700">
          <span className="flex items-center text-blue-600">{icon}</span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-900">{title}</p>
        <h4 className="text-xl font-bold text-gray-700">{subtitle}</h4>
      </div>
    </Card>
  );
};

export default Widget;
