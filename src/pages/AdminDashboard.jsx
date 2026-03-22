import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

const statusColors = {
  new_lead: "bg-blue-100 text-blue-800",
  collecting: "bg-yellow-100 text-yellow-800",
  warmed_up: "bg-orange-100 text-orange-800",
  hot: "bg-red-100 text-red-800",
  contacted: "bg-purple-100 text-purple-800",
  sent_to_hr: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await base44.entities.GroupRequest.list("-created_date");
        setRequests(data);
      } catch (err) {
        console.error("Error fetching group requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    // Refresh every 30 seconds
    const interval = setInterval(fetchRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Admin Dashboard - BoomBuy Group Requests
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Organization</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Count</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Initiator</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((req, i) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{req.orgName}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-bold text-lg">{req.currentCount}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{req.initiatorName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{req.initiatorPhone}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{req.initiatorEmail || "—"}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(req.created_date).toLocaleDateString("he-IL")}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(req.lastJoinedAt || req.created_date).toLocaleDateString("he-IL")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[req.status] || statusColors.new_lead}`}>
                        {req.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {requests.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                No group requests yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}