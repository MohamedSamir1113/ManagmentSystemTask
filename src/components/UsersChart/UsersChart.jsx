import { useUser } from "../../contexts/UserContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import styles from "./UsersChart.module.css";

const UsersChart = () => {
  const { users } = useUser();

  // Transform users into chart-friendly data
  // Example: count how many users per age group
  const ageGroups = [
    { name: "18-25", min: 18, max: 25 },
    { name: "26-35", min: 26, max: 35 },
    { name: "36-50", min: 36, max: 50 },
    { name: "51+", min: 51, max: 100 },
  ];

  const chartData = ageGroups.map((group) => ({
    name: group.name,
    count: users.filter(
      (u) => u.age >= group.min && u.age <= group.max
    ).length,
  }));

  return (
    <div className={styles.chartCard}>
      <h5 className="mb-3">👥 Users by Age Group</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#FEAF00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersChart;
