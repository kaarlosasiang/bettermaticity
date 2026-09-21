import { useState, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Thermometer, Calendar, Clock } from 'lucide-react';
import { Container } from '@/components/primitives';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Legacy .info-bar: navy #00184d strip, tiny text, right-aligned, yellow icons.
// Live USD->PHP (open.er-api.com), Mati weather (open-meteo), PHT clock.
export default function InfoBar() {
  const [rate, setRate] = useState('1 USD = ₱ --');
  const [temp, setTemp] = useState('--°C');
  const [dateStr, setDateStr] = useState('--- --');
  const [yearStr, setYearStr] = useState('----');
  const [timeStr, setTimeStr] = useState('--:-- --');

  const updateClock = useCallback(() => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    setDateStr(`${MONTHS[now.getMonth()]} ${now.getDate()}`);
    setYearStr(`${now.getFullYear()}`);
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    setTimeStr(`${h}:${m < 10 ? '0' + m : m} ${ampm}`);
  }, []);

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates?.PHP) setRate(`1 USD = ₱ ${data.rates.PHP.toFixed(2)}`);
      })
      .catch(() => {});

    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=6.9497&longitude=126.2094&current_weather=true'
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.current_weather?.temperature != null) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="bg-[#00184d] text-[0.625rem] font-normal tracking-[0.01em] text-white lg:text-[0.6875rem]"
      role="complementary"
      aria-label="Real-time information"
    >
      <Container>
        <div
          className="flex flex-nowrap items-center justify-center gap-2 overflow-x-auto py-1.5 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-end lg:gap-6 [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
          aria-atomic="false"
        >
          <span className="inline-flex shrink-0 items-center gap-1.5" aria-label="Exchange rates">
            <ArrowLeftRight className="size-3 text-[#ff0]" aria-hidden="true" />
            {rate}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5" aria-label="Current weather in Mati">
            <Thermometer className="size-3 text-[#ff0]" aria-hidden="true" />
            Mati {temp}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5" aria-label="Philippine date and time">
            <Calendar className="size-3 text-[#ff0]" aria-hidden="true" />
            <span>
              {dateStr}
              <span className="hidden lg:inline">, {yearStr}</span>
            </span>
            <span aria-hidden="true">•</span>
            <Clock className="size-3 text-[#ff0]" aria-hidden="true" />
            <span>
              {timeStr}
              <span className="hidden lg:inline">&nbsp;PHT</span>
            </span>
          </span>
        </div>
      </Container>
    </div>
  );
}
