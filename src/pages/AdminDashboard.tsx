import { useEffect, useState } from "react";
import { collection, doc, updateDoc, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUser, FaMoneyBillWave, FaCheckCircle, FaUsers } from "react-icons/fa";

// Helper to check if current user is admin (replace with your own logic)
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.isAdmin;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
      return;
    }
    // Listen for users
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    // Listen for deposits
    const unsubDeposits = onSnapshot(collection(db, "deposits"), (snapshot) => {
      setDeposits(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubUsers();
      unsubDeposits();
    };
  }, [navigate]);

  const confirmDeposit = async (deposit: any) => {
    // Mark deposit as confirmed
    await updateDoc(doc(db, "deposits", deposit.id), { status: "confirmed" });
    // Update user balance
    const userRef = doc(db, "users", deposit.userId);
    const user = users.find((u: any) => u.id === deposit.userId);
    const newBalance = (user?.balance || 0) + deposit.amount;
    await updateDoc(userRef, { balance: newBalance });
  };

  // Add funds state
  const [addAmount, setAddAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [addStatus, setAddStatus] = useState("");
  
  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !addAmount) return;
    try {
      await addDoc(collection(db, "deposits"), {
        userId: selectedUser,
        amount: Number(addAmount),
        status: "confirmed",
        createdAt: new Date(),
        adminAdded: true
      });
      const userRef = doc(db, "users", selectedUser);
      const user = users.find((u) => u.id === selectedUser);
      const newBalance = (user?.balance || 0) + Number(addAmount);
      await updateDoc(userRef, { balance: newBalance });
      setAddStatus("Funds added!");
      setAddAmount("");
      setSelectedUser("");
    } catch (err) {
      setAddStatus("Error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-hero px-4 py-8">
      <Card className="w-full max-w-3xl mb-8">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Funds to User */}
          <div className="mb-8">
            <h2 className="font-bold mb-2">Add Funds to User</h2>
            <form onSubmit={handleAddFunds} className="flex flex-col md:flex-row gap-2 items-center">
              <select
                className="p-2 border rounded"
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.email}</option>
                ))}
              </select>
              <input
                type="number"
                className="p-2 border rounded bg-white text-black focus:bg-yellow-50 focus:border-crypto-gold"
                placeholder="Amount"
                value={addAmount}
                onChange={e => setAddAmount(e.target.value)}
                min="1"
                required
              />
              <Button type="submit" className="bg-crypto-gold text-white">Add Funds</Button>
            </form>
            {addStatus && <div className="text-muted-foreground mt-2">{addStatus}</div>}
          </div>
          <h2 className="font-bold mb-2">Users</h2>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.balance || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="font-bold mb-2">Pending Deposits</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Amount</th>
                <th>Coin</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deposits.filter((d: any) => d.status !== "confirmed").map((deposit: any) => (
                <tr key={deposit.id}>
                  <td>{users.find((u: any) => u.id === deposit.userId)?.email || deposit.userId}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.coin || '-'}</td>
                  <td>{deposit.status}</td>
                  <td>
                    <Button onClick={() => confirmDeposit(deposit)} disabled={deposit.status === "confirmed"}>
                      Confirm
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminDashboard;
