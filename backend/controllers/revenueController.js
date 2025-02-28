import Revenue from "../models/Revenue.js"

export const getRevenueByTimePeriod = async (req, res) => {
  const { type, year } = req.query || {};
  try {
    let data = [];

    switch (type) {
      case 'daily':

        data = await Revenue.aggregate([
          {
            $limit: 7,
          },
          {
            $group: {
              _id: {
                date: {
                  $dateToString: { format: '%Y-%m-%d', date: '$date' },
                },
              },
              revenue: { $sum: '$revenue' },
            },
          },
          {
            $sort: { "_id.date": 1 },
          },
        ]);

        data = data.map((d) => ({
          date: d._id.date,
          revenue: d.revenue,
        }));
        break;

      case 'monthly':
        const selectedYear = year || new Date().getFullYear();
        data = await Revenue.aggregate([
          {
            $match: {
              date: {
                $gte: new Date(`${selectedYear}-01-01`),
                $lte: new Date(`${selectedYear}-12-31`),
              },
            },
          },
          {
            $group: {
              _id: { $month: '$date' },
              revenue: { $sum: '$revenue' },
            },
          },
        ]);
        data = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString('default', { month: 'short' }),
          revenue: data.find((d) => d._id === i + 1)?.revenue || 0,
        }));
        break;

      case 'quarterly':
        const selectedQuarterYear = year || new Date().getFullYear();
        data = await Revenue.aggregate([
          {
            $match: {
              date: {
                $gte: new Date(`${selectedQuarterYear}-01-01`),
                $lte: new Date(`${selectedQuarterYear}-12-31`),
              },
            },
          },
          {
            $project: {
              quarter: {
                $switch: {
                  branches: [
                    { case: { $lte: [{ $month: '$date' }, 3] }, then: 'Q1' },
                    { case: { $lte: [{ $month: '$date' }, 6] }, then: 'Q2' },
                    { case: { $lte: [{ $month: '$date' }, 9] }, then: 'Q3' },
                  ],
                  default: 'Q4',
                },
              },
              revenue: 1,
            },
          },
          {
            $group: {
              _id: '$quarter',
              revenue: { $sum: '$revenue' },
            },
          },
        ]);
        data = ['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => ({
          quarter,
          revenue: data.find((q) => q._id === quarter)?.revenue || 0,
        }));
        break;

      case 'yearly':
        data = await Revenue.aggregate([
          {
            $group: {
              _id: { $year: '$date' },
              revenue: { $sum: '$revenue' },
            },
          },
        ]);
        data = data.map((d) => ({
          year: d._id,
          revenue: d.revenue,
        }));
        break;
    }

    res.json({ type, data });
  } catch (error) {
    (error)
    res.status(500).json({ message: error.message });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Revenue.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
        },
      },
    ]);

    const total = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

    res.json({ totalRevenue: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenueBySource = async (req, res) => {
  try {
    const result = await Revenue.aggregate([
      {
        $group: {
          _id: "$source",
          revenue: { $sum: "$revenue" },
        },
      },
      {
        $project: {
          source: "$_id",
          revenue: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ revenueBySource: result });
  } catch (error) {
    (error);
    res.status(500).json({ message: error.message });
  }
};