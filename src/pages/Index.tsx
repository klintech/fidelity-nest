import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InvestmentPlans from "@/components/InvestmentPlans";
import Certificate from "@/components/Certificate";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <InvestmentPlans />
      <Certificate />
    </div>
  );
};

export default Index;
