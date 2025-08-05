import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Copy, 
  ExternalLink,
  LogOut,
  User
} from "lucide-react";

const Dashboard = () => {
  const [bnbAddress] = useState("bnb1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");
  const [trxAddress] = useState("TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE");
  
  const [userBalance] = useState({
    usd: 1250.00,
    btc: 0.045,
    eth: 0.875
  });

  const [deposits] = useState([
    { id: 1, amount: 500, currency: "USD", status: "completed", date: "2024-01-15", plan: "Premium Gold" },
    { id: 2, amount: 300, currency: "USD", status: "pending", date: "2024-01-16", plan: "Exclusive" },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const handleWhatsAppDeposit = (amount: string, currency: string) => {
    const message = `New deposit request: $${amount} ${currency}`;
    window.open(`https://wa.me/16625370269?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Investment Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-gold text-crypto-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                USD Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userBalance.usd.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-crypto">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                BTC Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBalance.btc} BTC</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-crypto-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                ETH Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBalance.eth} ETH</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposit">Make Deposit</TabsTrigger>
            <TabsTrigger value="history">Deposit History</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* BNB Deposit */}
              <Card className="border-crypto-gold/20">
                <CardHeader>
                  <CardTitle className="text-crypto-gold">BNB Deposit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>BNB Wallet Address</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={bnbAddress} readOnly className="font-mono text-xs" />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(bnbAddress)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input placeholder="Enter amount" type="number" />
                  </div>
                  <Button 
                    variant="gold" 
                    className="w-full"
                    onClick={() => handleWhatsAppDeposit("100", "BNB")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Confirm via WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* TRX Deposit */}
              <Card className="border-crypto-gold/20">
                <CardHeader>
                  <CardTitle className="text-crypto-gold">TRX Deposit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>TRX Wallet Address</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={trxAddress} readOnly className="font-mono text-xs" />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(trxAddress)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input placeholder="Enter amount" type="number" />
                  </div>
                  <Button 
                    variant="gold" 
                    className="w-full"
                    onClick={() => handleWhatsAppDeposit("100", "TRX")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Confirm via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Deposit History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deposits.map((deposit) => (
                    <div key={deposit.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-semibold">${deposit.amount} {deposit.currency}</div>
                        <div className="text-sm text-muted-foreground">{deposit.plan} Plan</div>
                        <div className="text-xs text-muted-foreground">{deposit.date}</div>
                      </div>
                      <Badge variant={deposit.status === "completed" ? "default" : "secondary"}>
                        {deposit.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input placeholder="Enter withdrawal amount" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Wallet Address</Label>
                    <Input placeholder="Enter your wallet address" />
                  </div>
                </div>
                <Button variant="gold" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Request Withdrawal
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  💯 Instant withdrawal • No fees • 24/7 processing
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;