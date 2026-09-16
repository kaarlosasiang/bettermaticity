import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from 'chart.js';

// Register once (harmless on the server; charts themselves render client-only).
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

// Categorical chart palette — validated (light surface) via the dataviz skill's
// validator: passes lightness band, chroma, CVD separation, and normal-vision floor.
// Contrast WARN on green/orange is relieved by direct labels + legends + data tables.
export const CHART_COLORS = ['#2563eb', '#06a77d', '#f77f00', '#d62828', '#7c3aed'];

export const chartFont = {
  family: "'Inter Variable', sans-serif",
};
