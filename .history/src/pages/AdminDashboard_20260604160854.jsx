import React, { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Users,
  BookOpen,
  ClipboardList,
  ArrowLeftRight,
  CreditCard,
  Award,
  Star,
  IndianRupee,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");

        console.log("ADMIN DATA:", res.data);
        
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Admin Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
    },
    {
      title: "Skills",
      value: stats.totalSkills,
      icon: BookOpen,
    },
    {
      title: "Requests",
      value: stats.totalRequests,
      icon: ClipboardList,
    },
    {
      title: "Transactions",
      value: stats.totalTransactions,
      icon: ArrowLeftRight,
    },
    {
      title: "Payments",
      value: stats.totalPayments,
      icon: CreditCard,
    },
    {
      title: "Certificates",
      value: stats.certificatesIssued,
      icon: Award,
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: IndianRupee,
    },
    {
      title: "Reviews",
      value: stats.totalReviews,
      icon: Star,
    },
    {
      title: "Avg Rating",
      value: `${stats.averageRating} ⭐`,
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pt-24">
      <h1 className="text-4xl font-bold text-teal-400 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
          key={card.title}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-teal-500 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-400 text-sm">
              {card.title}
            </h2>
        
            <card.icon
              size={22}
              className="text-teal-400"
            />
          </div>
        
          <p className="text-4xl font-bold text-white">
            {card.value}
          </p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;