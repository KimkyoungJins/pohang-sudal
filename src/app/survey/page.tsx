import SurveyForm from "@/components/SurveyForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Me Choose a Tour - Pohang Sudal",
  description:
    "Not sure which Pohang tour is right for you? Take our quick survey and get personalized tour recommendations based on your interests and travel style.",
};

export default function SurveyPage() {
  return (
    <div className="pt-24 pb-20 bg-sky-pale/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
            Personalized
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
            Help Me Choose
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Answer a few quick questions and we&apos;ll recommend the perfect
            Pohang tour for you.
          </p>
        </div>
        <SurveyForm />
      </div>
    </div>
  );
}
