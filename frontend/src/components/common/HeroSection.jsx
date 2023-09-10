import React from "react";
import Header from "./HeroSection/Header";
import Panel from "./HeroSection/Panel";
import ImageSlider from "./HeroSection/ImageSlider";
import CardsSection from "./HeroSection/CardsSection";

const HeroSection = () => {
  return (
    <div>
      <Header />
      <Panel />
      <ImageSlider />
      <CardsSection />
    </div>
  );
};

export default HeroSection;
