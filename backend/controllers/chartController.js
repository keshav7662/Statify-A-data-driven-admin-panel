import Revenue from "../models/Revenue.js";
import Customer from "../models/PlatformUser.js";

export const getDashboardData = async (req, res) => {
  const { type, year } = req.query || {};
  const selectedYear = year || new Date().getFullYear();

  try {
    // Using $facet to fetch total revenue, total customers, and subscriber counts in one query
    const [aggregationResults] = await Customer.aggregate([
      {
        $facet: {
          totalCustomers: [{ $count: "total" }],
          subscribers: [{ $match: { isSubscriber: true } }, { $count: "total" }],
        },
      },
    ]);

    const totalCustomers = aggregationResults.totalCustomers[0]?.total || 0;
    const subscribersCount = aggregationResults.subscribers[0]?.total || 0;
    const nonSubscribersCount = totalCustomers - subscribersCount;

    const subscriberDistribution = [
      { label: "subscriber", percentage: totalCustomers > 0 ? (subscribersCount / totalCustomers) * 100 : 0 },
      { label: "non-subscriber", percentage: totalCustomers > 0 ? (nonSubscribersCount / totalCustomers) * 100 : 0 },
    ];

    // Fetch total revenue
    const [totalRevenueResult] = await Revenue.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$revenue" } } },
    ]);
    const totalRevenue = totalRevenueResult?.totalRevenue || 0;

    let revenueData = [];
    let customerData = [];

    // Define match condition for yearly data
    const yearMatch = {
      $match: {
        date: { $gte: new Date(`${selectedYear}-01-01`), $lte: new Date(`${selectedYear}-12-31`) },
      },
    };

    const groupBy = {
      daily: {
        id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
        label: "date",
      },
      monthly: {
        id: { $month: "$date" },
        label: "month",
      },
      quarterly: {
        id: { $ceil: { $divide: [{ $month: "$date" }, 3] } },
        label: "quarter",
      },
      yearly: {
        id: { $year: "$date" },
        label: "year",
      },
    }[type];

    if (!groupBy) {
      return res.status(400).json({ message: "Invalid type specified" });
    }

    // Use $facet to fetch revenue and customer data in parallel
    const [dashboardData] = await Revenue.aggregate([
      {
        $facet: {
          revenueData: [
            ...(type !== "yearly" ? [yearMatch] : []),
            { $group: { _id: groupBy.id, revenue: { $sum: "$revenue" } } },
            { $sort: { "_id": 1 } },
          ],
          customerData: [
            ...(type !== "yearly" ? [yearMatch] : []),
            { $group: { _id: groupBy.id, count: { $sum: 1 } } },
            { $sort: { "_id": 1 } },
          ],
        },
      },
    ]);

    // Map data appropriately for each type
    if (type === "monthly") {
      revenueData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        revenue: dashboardData.revenueData.find(d => d._id === i + 1)?.revenue || 0,
      }));
      customerData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        count: dashboardData.customerData.find(d => d._id === i + 1)?.count || 0,
      }));
    } else if (type === "quarterly") {
      revenueData = Array.from({ length: 4 }, (_, i) => ({
        quarter: `Q${i + 1}`,
        revenue: dashboardData.revenueData.find(d => d._id === i + 1)?.revenue || 0,
      }));
      customerData = Array.from({ length: 4 }, (_, i) => ({
        quarter: `Q${i + 1}`,
        count: dashboardData.customerData.find(d => d._id === i + 1)?.count || 0,
      }));
    } else {
      revenueData = dashboardData.revenueData.map(d => ({ [groupBy.label]: d._id, revenue: d.revenue }));
      customerData = dashboardData.customerData.map(d => ({ [groupBy.label]: d._id, count: d.count }));
    }

    res.json({
      totalRevenue,
      totalCustomers,
      revenueData,
      customerData,
      subscriberDistribution,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
