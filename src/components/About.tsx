import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, TrendingUp, Globe } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "29,500+",
      label: "Businesses Supported"
    },
    {
      icon: <Building className="h-8 w-8" />,
      number: "15,900+",
      label: "Wealth Management Firms"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      number: "100%",
      label: "Client Satisfaction"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "Global",
      label: "Market Reach"
    }
  ];

  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Fidelity</span>
          </h2>
          <p className="text-xl text-muted-foreground">Our Company</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm border-crypto-gold/20">
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-crypto-gold mb-4">Who We Serve</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We help investors feel confident in their most important financial goals, manage employee benefit programs that help more than 29,500 businesses support their employees' total well-being, and support more than 15,900 wealth management firms and institutions with innovative investment and technology solutions to grow their businesses.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-crypto-gold mb-4">Our Innovation</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We continue to challenge the status quo and harness innovation to move faster and create value for our customers and clients, developing new products and services to stay ahead of their distinct and evolving financial needs.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-crypto-gold mb-4">Our Strength</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our diverse businesses and independence give us insight into the entire market and the stability and scale needed to think and act for the long term as we deliver value to our customers and clients.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-card/50 backdrop-blur-sm border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300">
                <div className="text-crypto-gold mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-crypto-gold mb-2">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;