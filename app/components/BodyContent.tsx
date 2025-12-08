"use client";
import Image from "next/image";
import { HomeDataType, SocialLinkType } from "./types/types";
import SocialLink from "./SocialLink";
import { useCallback } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

interface ContentType {
  homeData: HomeDataType | null;
  socialLinks: SocialLinkType[];
}

const downloadPDF = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await fetch(
      "https://res.cloudinary.com/dmnzrw08u/raw/upload/v1/media/raw/CARDENAS_CALCINA_CV_2022-2_gsupqh.pdf"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching PDF:", error);
    throw error;
  }
};

const BodyContent = ({ homeData, socialLinks }: ContentType) => {
  // console.log('HOMEDATA ' + JSON.stringify(homeData)); // Commented out to reduce noise
  const userImage = homeData?.userImage || "";
  const { t } = useLanguage();

  const handleViewAndDownload = useCallback(() => {
    if (homeData?.cvFile) {
      window.open(homeData.cvFile, "_blank");
    }

    downloadPDF().then((blob) => {
      saveAs(blob, "Elvin_Cardenas_Calcina_CV.pdf");
    });
  }, [homeData?.cvFile]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-[calc(100vh-8rem)] flex items-center py-12 md:py-20"
    >
      <div className="grid grid-cols-1 gap-6 w-full lg:grid-cols-12 md:gap-8">
        {/* Main Hero Content - Takes up 7 columns on large screens */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col justify-center space-y-8 lg:col-span-7"
        >
          {/* Badge */}
          <div className="inline-flex gap-2 items-center px-4 py-2 bg-gradient-to-r rounded-full border from-brand-green/10 to-brand-medium/10 dark:from-brand-green/20 dark:to-brand-medium/20 border-brand-green/20 dark:border-brand-green/40 w-fit">
            <div className="w-2 h-2 rounded-full animate-pulse bg-brand-green dark:bg-brand-green" />
            <span className="text-sm font-medium text-brand-green dark:text-brand-green">
              {homeData?.welcomeTitle}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poiret font-bold !text-gray-900 dark:!text-white leading-tight">
            {homeData?.welcomeNote}
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
            {homeData?.welcomeDescription}
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // onClick={handleViewAndDownload}
            className="flex relative gap-3 justify-center items-center px-8 py-4 font-semibold text-white bg-gradient-to-r rounded-2xl shadow-lg transition-all duration-300 group from-brand-green to-brand-medium shadow-brand-green/30 hover:shadow-brand-green/50 w-fit"
          >
            <span className="relative z-10">{t.common.downloadCV}</span>
            <Download className="relative z-10 w-5 h-5 transition-transform group-hover:translate-y-1" />
          </motion.button>
        </motion.div>

        {/* Right Side - Bento Grid */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-5 md:gap-6">
          {/* Profile Image Card - Spans 2 columns */}
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden relative col-span-2 h-80 bg-gradient-to-br rounded-3xl border shadow-xl md:h-96 from-brand-green/20 to-brand-medium/20 border-brand-green/20 group"
          >
            <div className="absolute inset-0">
              <Image
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt="profile"
                src={userImage}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-black/50" />
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            variants={fadeInUp}
            className="col-span-2 p-6 rounded-3xl border shadow-lg backdrop-blur-xl bg-white/50 dark:bg-white/5 border-gray-200/50 dark:border-white/10"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-1 h-8 bg-gradient-to-b rounded-full from-brand-green to-brand-medium" />
                <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                  {t.common.connect}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks?.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl border shadow-md transition-all dark:from-gray-800 dark:to-gray-900 hover:shadow-xl border-gray-200/50 dark:border-gray-700/50"
                  >
                    <SocialLink item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BodyContent;
