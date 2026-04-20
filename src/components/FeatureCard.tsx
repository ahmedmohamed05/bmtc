import React from "react";

interface FeatureCardProps {
  img: string;
  title: string;
  desc: string;
  hue: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ img, title, desc, hue }) => {
  return (
    <div className="flex flex-col gap-[0.8rem] transition-transform duration-300 hover:[-translate-y:5px]">
      <div
        className="relative aspect-[1.4] overflow-hidden rounded-xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: `hsl(${hue} 70% 35%)` }}
      >
        <img
          src={img}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,100,170,0.92)] via-[rgba(1,140,200,0.3)] to-transparent" />
        <p className="absolute right-[1.2rem] bottom-[1.2rem] left-[1.2rem] text-right text-[clamp(1.1rem,2.5vw,1.5rem)] font-extrabold leading-tight text-white">
          {title}
        </p>
      </div>
      <p className="text-text-muted pr-2 text-[0.88rem] leading-[1.8]">
        {desc}
      </p>
    </div>
  );
};

export default FeatureCard;
