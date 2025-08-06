import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Listen for user balance
    const unsubUser = onSnapshot(collection(db, "users"), (snapshot) => {
      const u = snapshot.docs.find((doc) => doc.id === user.uid);
      if (u) setBalance(u.data().balance || 0);
    });
    // Listen for user's deposits
    const q = query(collection(db, "deposits"), where("userId", "==", user.uid));
    const unsubDeposits = onSnapshot(q, (snapshot) => {
      setDeposits(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    // Listen for user's withdrawals
    const wq = query(collection(db, "withdrawals"), where("userId", "==", user.uid));
    const unsubWithdrawals = onSnapshot(wq, (snapshot) => {
      setWithdrawals(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubUser();
      unsubDeposits();
      unsubWithdrawals();
    };
  }, [user, navigate]);

  // Example wallet addresses
  const bnbAddress = "0x41b4ce47e7a5add32e537882b8c28045b950bac2";
  const trxAddress = "TJrSgRtkCU4zCTYXpeaQEGmFtjLCKSTigE";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-hero px-4 py-8">
      {/* Wallet Addresses Card */}
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Wallet Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-semibold">BNB:</span> <span className="font-mono text-xs">{bnbAddress}</span>
              <Button size="sm" variant="outline" className="ml-2" onClick={() => copyToClipboard(bnbAddress)}>Copy</Button>
            </div>
            <div>
              <span className="font-semibold">TRX:</span> <span className="font-mono text-xs">{trxAddress}</span>
              <Button size="sm" variant="outline" className="ml-2" onClick={() => copyToClipboard(trxAddress)}>Copy</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* ...existing code... */}
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">${balance}</div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Deposit History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
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
  );
};

export default Dashboard;