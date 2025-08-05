import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Diamond, Star, Trophy } from "lucide-react";

const InvestmentPlans = () => {
  const plans = [
    {
      name: "DELUXE PLAN",
      icon: <Star className="h-8 w-8" />,
      return: "10%",
      duration: "2 hours",
      minInvest: "$30",
      maxInvest: "UNLIMITED",
      referral: "5%",
      gradient: "from-blue-600 to-purple-600",
      features: ["Instant withdrawal", "No fees", "24/7 support"]
    },
    {
      name: "EXCLUSIVE PLAN",
      icon: <Crown className="h-8 w-8" />,
      return: "20%",
      duration: "3 hours",
      minInvest: "$100",
      maxInvest: "UNLIMITED",
      referral: "8%",
      gradient: "from-purple-600 to-pink-600",
      features: ["Priority support", "Instant withdrawal", "No fees"],
      popular: true
    },
    {
      name: "VUL INSURANCE PLAN",
      icon: <Diamond className="h-8 w-8" />,
      return: "30%",
      duration: "5 hours",
      minInvest: "$200",
      maxInvest: "UNLIMITED",
      referral: "10%",
      gradient: "from-pink-600 to-red-600",
      features: ["Balance reinvesting", "Instant withdrawal", "Premium support"]
    },
    {
      name: "PREMIUM GOLD PLAN",
      icon: <Trophy className="h-8 w-8" />,
      return: "100%",
      duration: "24 hours",
      minInvest: "$500",
      maxInvest: "UNLIMITED",
      referral: "12%",
      gradient: "from-yellow-500 to-orange-500",
      features: ["Maximum returns", "VIP support", "Priority processing"],
      premium: true
    }
  ];

  return (
    <section id="plans" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Investment Plans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully crafted investment plans designed to maximize your returns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-crypto-gold border-crypto-gold' : 'border-border hover:border-crypto-gold/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-crypto-gold text-crypto-dark">
                  Most Popular
                </Badge>
              )}
              {plan.premium && (
                <Badge className="absolute top-4 right-4 bg-gradient-gold text-crypto-dark">
                  Premium
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`bg-gradient-to-r ${plan.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-crypto-gold mb-2">
                    {plan.return}
                  </div>
                  <p className="text-muted-foreground">After {plan.duration}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Invest:</span>
                    <span className="font-semibold">{plan.minInvest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Invest:</span>
                    <span className="font-semibold">{plan.maxInvest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Referral:</span>
                    <span className="font-semibold text-crypto-gold">{plan.referral}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-crypto-gold" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular || plan.premium ? "gold" : "crypto"}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            💲 <strong>Payment Methods:</strong> BNB & TRX
          </p>
          <p className="text-crypto-gold font-semibold">
            You can take part of the action by investing with us and have us monitor your trade for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;