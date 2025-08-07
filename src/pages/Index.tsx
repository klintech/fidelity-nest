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
      <div className="mt-8 flex justify-center">
        <div className="bg-white/80 rounded-lg shadow p-4 border border-gray-200 max-w-xl text-center">
          <h2 className="text-lg font-bold text-crypto-gold mb-2">Fidelity Investments Headquarters</h2>
          <p className="text-gray-700">Location: 245 Summer Street, Boston, Massachusetts</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
