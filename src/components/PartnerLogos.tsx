import React from 'react';
import { motion } from 'motion/react';

const PARTNERS = [
  {
    name: "RCBS",
    category: "B2C",
    src: "/rcbs-logo-vector-2022 1.svg?v=2",
    className: "h-[13.5px] sm:h-[13.5px] md:h-[16px] lg:h-[16px] xl:h-[20px] w-auto",
  },
  {
    name: "Sun Express",
    category: "AI, B2C, B2B",
    src: "/g11859.svg?v=2",
    className: "h-[19px] sm:h-[20px] md:h-[23.5px] lg:h-[23.5px] xl:h-[27px] w-auto",
  },
  {
    name: "Aktana",
    category: "SaaS, B2C/B2B",
    src: "/aktana logo.svg?v=2",
    className: "h-[12px] sm:h-[11.5px] md:h-[14.5px] lg:h-[14.5px] xl:h-[18px] w-auto",
  },
  {
    name: "Mercer",
    category: "B2B",
    src: "/Mercer.svg?v=2",
    className: "h-[12px] sm:h-[11.5px] md:h-[14.5px] lg:h-[14.5px] xl:h-[18px] w-auto",
  },
  {
    name: "TAG",
    category: "B2C",
    src: "/Tag_Logo.svg?v=2",
    className: "h-[15px] sm:h-[14.5px] md:h-[18px] lg:h-[18px] xl:h-[21.5px] w-auto",
  },
  {
    name: "Quest",
    category: "SaaS, B2B",
    src: "/quest logo 1.svg?v=2",
    className: "h-[15px] sm:h-[14.5px] md:h-[18px] lg:h-[18px] xl:h-[21.5px] w-auto",
  },
  {
    name: "Bushnell",
    category: "B2C, B2B",
    src: "/Frame.svg?v=2",
    className: "h-[13.5px] sm:h-[13.5px] md:h-[16px] lg:h-[16px] xl:h-[20px] w-auto",
  },
];

export default function PartnerLogos() {
  return (
    <section className="pt-[120px] md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-0 bg-transparent relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container-custom"
      >
        <div className="flex items-center gap-6 mb-6 w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap font-sans"
          >
            selected partners
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
            className="h-[1px] bg-white/[0.12] flex-grow"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 w-full">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="w-full h-[88px] sm:h-auto sm:aspect-square md:aspect-square rounded-2xl relative overflow-hidden cursor-default select-none flex flex-col group bg-[#d9d9d9]/[0.03] border border-white/[0.05] hover:border-white/[0.14] transition-all duration-300 hover:bg-[#d9d9d9]/[0.06]"
            >
              <div className="w-full h-full bg-transparent flex items-center justify-center p-3 sm:p-4 relative overflow-hidden transition-colors duration-500 z-10">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className={`${partner.className} transform scale-100 sm:scale-[0.85] md:scale-100 brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-500 relative z-10`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-white/50 group-hover:text-white/80 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 pointer-events-none whitespace-nowrap">
                {partner.category}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
