  // Example wallet addresses
  const bnbAddress = "0x41b4ce47e7a5add32e537882b8c28045b950bac2";
  const trxAddress = "TJrSgRtkCU4zCTYXpeaQEGmFtjLCKSTigE";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawStatus("Processing...");
    try {
      await addDoc(collection(db, "withdrawals"), {
        userId: user?.uid,
        amount: Number(withdrawAmount),
        address: withdrawAddress,
        status: "processing",
        createdAt: new Date()
      });
      setWithdrawStatus("Processing");
      setWithdrawAmount("");
      setWithdrawAddress("");
    } catch (err) {
      setWithdrawStatus("Error. Try again.");
    }
  };
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collection, onSnapshot, query, where, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // ...existing code...
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState("");
  // Reinvest state
  const plans = [
    { name: "DELUXE PLAN", min: 30 },
    { name: "EXCLUSIVE PLAN", min: 100 },
    { name: "VUL INSURANCE PLAN", min: 200 },
    { name: "PREMIUM GOLD PLAN", min: 500 }
  ];
  const [selectedPlan, setSelectedPlan] = useState(plans[0].name);
  const [reinvestAmount, setReinvestAmount] = useState("");
  const [reinvestStatus, setReinvestStatus] = useState("");
  const handleReinvest = async (e: React.FormEvent) => {
    e.preventDefault();
    setReinvestStatus("Processing...");
    const plan = plans.find(p => p.name === selectedPlan);
    if (!plan) {
      setReinvestStatus("Invalid plan");
      return;
    }
    if (plan.min && Number(reinvestAmount) < plan.min) {
      setReinvestStatus(`Minimum for this plan is $${plan.min}`);
      return;
    }
    if (Number(reinvestAmount) > balance) {
      setReinvestStatus("Insufficient balance");
      return;
    }
    try {
      await addDoc(collection(db, "deposits"), {
        userId: user?.uid,
        amount: Number(reinvestAmount),
        plan: selectedPlan,
        status: "processing",
        createdAt: new Date(),
        reinvest: true
      });
      setReinvestStatus("Reinvest request submitted!");
      setReinvestAmount("");
    } catch (err) {
      setReinvestStatus("Error. Try again.");
    }
  };

  // ...existing code...
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-hero px-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Balance Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-crypto-gold mb-2">${balance}</div>
          </CardContent>
        </Card>

        {/* Wallet Addresses Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Wallet Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">BNB:</span>
              <span className="font-mono text-xs">{bnbAddress}</span>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(bnbAddress)}>Copy</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">TRX:</span>
              <span className="font-mono text-xs">{trxAddress}</span>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(trxAddress)}>Copy</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deposit/Withdraw/History Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Deposit History */}
        <Card>
          <CardHeader>
            <CardTitle>Deposit History</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d: any) => (
                  <tr key={d.id}>
                    <td>{d.amount}</td>
                    <td>{d.status}</td>
                    <td>{d.createdAt?.toDate?.().toLocaleString?.() || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w: any) => (
                  <tr key={w.id}>
                    <td>{w.amount}</td>
                    <td>{w.status}</td>
                    <td>{w.createdAt?.toDate?.().toLocaleString?.() || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Reinvest Section */}
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-card/50 p-6 rounded-lg shadow-lg border border-crypto-gold/20">
          <h2 className="text-2xl font-bold mb-4 text-crypto-gold">Reinvest from Balance</h2>
          <form onSubmit={handleReinvest} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Select Plan</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedPlan}
                onChange={e => setSelectedPlan(e.target.value)}
              >
                {plans.map(plan => (
                  <option key={plan.name} value={plan.name}>{plan.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Amount (USD)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={reinvestAmount}
                onChange={e => setReinvestAmount(e.target.value)}
                required
                min={plans.find(p => p.name === selectedPlan)?.min ?? 1}
                {...(balance > 0 ? { max: balance } : {})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-crypto-gold text-white py-2 rounded font-bold hover:bg-yellow-600 transition"
            >
              Reinvest
            </button>
          </form>
          {reinvestStatus && (
            <div className="mt-3 text-center text-muted-foreground">{reinvestStatus}</div>
          )}
        </div>
      </div>

      {/* Withdraw Section */}
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-card/50 p-6 rounded-lg shadow-lg border border-crypto-gold/20">
          <h2 className="text-2xl font-bold mb-4 text-crypto-gold">Withdraw Funds</h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Amount (USD)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                required
                min="1"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Wallet Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={withdrawAddress}
                onChange={e => setWithdrawAddress(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-crypto-gold text-white py-2 rounded font-bold hover:bg-yellow-600 transition"
            >
              Withdraw
            </button>
          </form>
          {withdrawStatus && (
            <div className="mt-3 text-center text-muted-foreground">{withdrawStatus}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;