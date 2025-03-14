import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const AdminDashboard = () => {
  const [connectedWallets, setConnectedWallets] = useState([]);
  const [connectWallets, setConnectWallets] = useState([]);
  const [activeTab, setActiveTab] = useState("connected");

  useEffect(() => {
    // Fetch connected wallets
    const unsubscribeConnected = onSnapshot(collection(db, "connect_wallet"), (snapshot) => {
      const walletsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setConnectedWallets(walletsData);
    });

    // Fetch connect wallets
    const unsubscribeConnect = onSnapshot(collection(db, "connectedWallets"), (snapshot) => {
      const walletsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setConnectWallets(walletsData);
    });

    return () => {
      unsubscribeConnected();
      unsubscribeConnect();
    };
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${
            activeTab === "connected" ? "bg-purple-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("connected")}
        >
          Connected Wallets
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${
            activeTab === "connect" ? "bg-purple-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("connect")}
        >
          Connect Wallets
        </button>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">User Email</th>
              <th className="py-2 px-4">Network</th>
              <th className="py-2 px-4">Wallet Address</th>
              <th className="py-2 px-4">Confirmed At</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "connected" &&
              connectedWallets.map((wallet) => (
                <tr key={wallet.id} className="border-b text-center">
                  <td className="py-2 px-4">{wallet.userId || "N/A"}</td>
                  <td className="py-2 px-4">{wallet.userEmail || "N/A"}</td>
                  <td className="py-2 px-4">{wallet.network}</td>
                  <td className="py-2 px-4 break-all">{wallet.walletAddress}</td>
                  <td className="py-2 px-4">
                    {wallet.confirmedAt ? new Date(wallet.confirmedAt.seconds * 1000).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}

            {activeTab === "connect" &&
              connectWallets.map((wallet) => (
                <tr key={wallet.id} className="border-b text-center">
                  <td className="py-2 px-4">{wallet.userId || "N/A"}</td>
                  <td className="py-2 px-4">{wallet.userEmail || "N/A"}</td>
                  <td className="py-2 px-4">{wallet.network}</td>
                  <td className="py-2 px-4 break-all">{wallet.walletAddress}</td>
                  <td className="py-2 px-4">
                    {wallet.confirmedAt ? new Date(wallet.confirmedAt.seconds * 1000).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* If no data available */}
      {activeTab === "connected" && connectedWallets.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No connected wallets found.</p>
      )}
      {activeTab === "connect" && connectWallets.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No connect wallets found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
