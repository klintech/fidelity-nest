import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import fidelityLogo from "@/assets/fidelity-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success:", userCredential.user);
      alert("Logged in successfully!");




      // Immediate admin login shortcut
      let isAdmin = false;
      if (email === "admin@mail.com" && password === "admin@mail.com") {
        isAdmin = true;
        localStorage.setItem("user", JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          isAdmin: true
        }));
        navigate("/admin-dashboard");
        return;
      }
      // Fetch user profile from Firestore to get isAdmin
      const { getDoc, doc } = await import("firebase/firestore");
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().isAdmin) {
        isAdmin = true;
      }
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({
        uid: userId,
        email: userCredential.user.email,
        isAdmin
      }));

      navigate("/dashboard"); // Redirect after successful login
    } catch (error: any) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-lg border-crypto-gold/20">
        <CardHeader className="text-center">
          <img src={fidelityLogo} alt="Fidelity Investments" className="h-12 w-auto mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold gradient-text">Welcome Back</CardTitle>
          <p className="text-muted-foreground">Sign in to your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" variant="gold" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link 
              to="/forgot-password" 
              className="text-sm text-crypto-gold hover:underline"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-crypto-gold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
