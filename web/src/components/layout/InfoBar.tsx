import { useState, useEffect, useSyncExternalStore } from 'react';
import { ArrowLeftRight, Thermometer, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Container } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitch } from './LanguageSwitch';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Philippine time as one "Mon D|YYYY|h:mm AM" string. A string snapshot only changes once
// a minute, so the clock re-renders then and not on every tick. The server snapshot is
// the placeholder, which keeps the prerendered HTML and hydration identical.
const PLACEHOLDER = '--- --|----|--:-- --';
function manilaStamp(): string {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
  const h = now.getHours();
  const m = now.getMinutes();
  const time = `${h % 12 || 12}:${m < 10 ? '0' + m : m} ${h >= 12 ? 'PM' : 'AM'}`;
  return `${MONTHS[now.getMonth()]} ${now.getDate()}|${now.getFullYear()}|${time}`;
}
function subscribeClock(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// Thin white utility row between the hotline strip and the header (BetterSanFernando
// pattern): place + BetterGov link on the left, live figures and (desktop) the language
// toggle on the right.
// Live USD->PHP (open.er-api.com), Mati weather (open-meteo), PHT clock.
export default function InfoBar() {
  const { t } = useLanguage();
  const [rate, setRate] = useState('1 USD = ₱ --');
  const [temp, setTemp] = useState('--°C');
  const [dateStr, yearStr, timeStr] = useSyncExternalStore(
    subscribeClock,
    manilaStamp,
    () => PLACEHOLDER
  ).split('|');

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

  const icon = 'size-3 text-royal';
  return (
    <div
      className="border-b border-line bg-white text-[0.6875rem] text-ink-muted lg:text-xs"
      role="complementary"
      aria-label="Real-time information"
    >
      <Container>
        <div className="flex flex-nowrap items-center justify-center gap-4 overflow-x-auto py-2.5 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-between [&::-webkit-scrollbar]:hidden">
          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className={icon} aria-hidden="true" />
              {t('nav-drawer-place')}
            </span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <a
              href="https://bettergov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-royal hover:underline"
            >
              BetterGov Philippines <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          </div>
          <div
            className="flex shrink-0 items-center gap-3 font-mono lg:gap-5"
            aria-live="polite"
            aria-atomic="false"
          >
            <span className="inline-flex shrink-0 items-center gap-1.5" aria-label="Exchange rates">
              <ArrowLeftRight className={icon} aria-hidden="true" />
              {rate}
            </span>
            <span
              className="inline-flex shrink-0 items-center gap-1.5"
              aria-label="Current weather in Mati"
            >
              <Thermometer className={icon} aria-hidden="true" />
              Mati {temp}
            </span>
            <span
              className="inline-flex shrink-0 items-center gap-1.5"
              aria-label="Philippine date and time"
            >
              <Calendar className={icon} aria-hidden="true" />
              <span>
                {dateStr}
                <span className="hidden lg:inline">, {yearStr}</span>
              </span>
              <span aria-hidden="true">•</span>
              <Clock className={icon} aria-hidden="true" />
              <span>
                {timeStr}
                <span className="hidden lg:inline">&nbsp;PHT</span>
              </span>
            </span>
            <LanguageSwitch className="hidden xl:flex" />
          </div>
        </div>
      </Container>
    </div>
  );
}
