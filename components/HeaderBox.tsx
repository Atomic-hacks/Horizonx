import { ChevronRight } from "lucide-react";

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box m-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-red-500">&nbsp;{user}</span>
        )}
      </h1>
      <div className=" flex justify-between items-center border-t border-neutral-500">
        <p className="text-xs w-60">{subtext}</p>
        <ChevronRight className="inline h-12 text-gray-400" />
      </div>
    </div>
  );
};

export default HeaderBox;
