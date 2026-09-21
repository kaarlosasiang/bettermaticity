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

// Categorical chart palette — series-1 is the brand royal (#2b62ee) so charts match
// the site's navy/royal identity; the remaining hues stay CVD-separated (green/orange/
// red/violet). Contrast WARN on green/orange is relieved by direct labels + data tables.
export const CHART_COLORS = ['#2b62ee', '#06a77d', '#f77f00', '#e01b24', '#7c4dff'];

export const chartFont = {
  family: "'Inter Variable', sans-serif",
};
