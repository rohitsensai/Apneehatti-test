"use client";
const FooterSection = ({ icon, title, subtitle }) => {
  return (
    <div className="flex gap-x-5 items-center bg-white justify-center shadow-lg border">
      {icon}
      <div className="text-sm text-gray-700">
        <h5 className="uppercase underline font-medium">{title}</h5>
        <h5>{subtitle}</h5>
      </div>
    </div>
  );
};

export default FooterSection;
