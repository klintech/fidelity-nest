import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Shield } from "lucide-react";
import certificateImage from "@/assets/certificate.jpg";

const Certificate = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/16625370269", "_blank");
  };

  return (
    <section id="certificate" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certificate & Documents</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our official certification and documentation
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <Card className="overflow-hidden border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300">
                <img 
                  src={certificateImage} 
                  alt="Fidelity Investments Certificate" 
                  className="w-full h-auto object-cover"
                />
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-crypto-gold/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-crypto-gold" />
                    Official Certification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our company is fully licensed and certified to provide cryptocurrency investment services. 
                    All our operations are compliant with international financial regulations.
                  </p>
                  <Button variant="crypto" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-crypto-gold/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-crypto-gold" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Access our comprehensive documentation including terms of service, 
                    privacy policy, and investment guidelines.
                  </p>
                  <Button variant="crypto" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Documents
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="p-8 bg-gradient-crypto border-crypto-gold/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Need Support?</h3>
              <p className="text-lg mb-6 text-muted-foreground">
                Our dedicated support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="whatsapp" size="lg" onClick={handleWhatsAppClick}>
                  WhatsApp Support: +1 (662) 537-0269
                </Button>
                <Button variant="outline" size="lg">
                  Email Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Certificate;