import { ChevronRight } from "lucide-react";

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box !bg-blue-400 m-4 rounded-2xl border border-neutral-200 p-6 shadow-sm text-white">
      <h1 className="header-box-title !text-white">
        {title}
        {type === "greeting" && (
          <span className="text-red-500">&nbsp;{user}</span>
        )}
      </h1>
      <div className=" flex justify-between items-center border-t border-neutral-500">
        <p className="text-xs w-60">{subtext}</p>
        <ChevronRight className="inline h-12 text-neutral-100" />
      </div>
    </div>
  );
};

export default HeaderBox;
