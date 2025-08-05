import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import cryptoHeroBg from "@/assets/crypto-hero-bg.jpg";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/16625370269", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cryptoHeroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
          <span className="gradient-text">Welcome to Fidelity</span>
          <br />
          <span className="text-foreground">Crypto Investments</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Your trusted partner in cryptocurrency investments. Start building your financial future with our proven investment strategies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300">
            <TrendingUp className="h-12 w-12 text-crypto-gold mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">High Returns</h3>
            <p className="text-muted-foreground">Up to 100% returns in 24 hours</p>
          </Card>
          
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300">
            <Shield className="h-12 w-12 text-crypto-gold mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
            <p className="text-muted-foreground">Bank-level security for your investments</p>
          </Card>
          
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300">
            <Zap className="h-12 w-12 text-crypto-gold mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Withdrawal</h3>
            <p className="text-muted-foreground">No fees, instant processing</p>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="gold" className="animate-glow">
            Get Started <ArrowRight className="ml-2" />
          </Button>
          <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick}>
            WhatsApp Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;