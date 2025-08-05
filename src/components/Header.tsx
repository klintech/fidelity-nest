import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import fidelityLogo from "@/assets/fidelity-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={fidelityLogo} alt="Fidelity Investments" className="h-8 w-auto" />
          <span className="text-xl font-bold gradient-text">Fidelity Investments</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="#plans" className="text-muted-foreground hover:text-foreground transition-colors">
            Investment Plans
          </Link>
          <Link to="#certificate" className="text-muted-foreground hover:text-foreground transition-colors">
            Certificate
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="gold" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;