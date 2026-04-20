import React from "react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkTo?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  linkText,
  linkTo,
  centered = false,
}) => {
  return (
    <div
      className={`flex ${centered ? "flex-col items-center text-center" : "flex-row items-baseline justify-between"} mb-6 flex-wrap gap-2`}
    >
      <div className={centered ? "" : "flex flex-col"}>
        <h2 className="text-blue text-[1.4rem] font-extrabold tracking-[0.5px] sm:text-[clamp(1.3rem,3vw,1.7rem)]">
          {title}
        </h2>
        <div
          className={`h-1 w-[50px] rounded-sm bg-gradient-to-r from-blue to-gold ${centered ? "mx-auto mt-3 mb-3 w-[60px]" : "mt-1.5"}`}
        />
        {subtitle && (
          <p className="text-text-muted text-[0.88rem]">{subtitle}</p>
        )}
      </div>
      {linkText && linkTo && (
        <Link to={linkTo} className="text-blue text-[0.82rem] font-semibold">
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
