'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HealthPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">{t('nav-home')}</Link>
          <span>/</span>
          <Link href="/services">{t('nav-services')}</Link>
          <span>/</span>
          <span aria-current="page">{t('health-page-title')}</span>
        </nav>
      </div>

      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge">
              <i className="bi bi-heart-pulse-fill"></i>
              <span>{t('health-page-badge')}</span>
            </span>
            <h1>{t('health-page-title')}</h1>
            <p className="page-header-desc">{t('health-page-desc')}</p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-hospital"></i>
                <span>{t('health-consultation')}</span>
              </h3>
              <p className="service-item-desc">{t('health-consultation-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> {t('label-free')}
                </span>
                <span>
                  <strong>{t('label-time')}</strong> {t('label-walk-in')}
                </span>
              </div>
            </div>

            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-shield-plus"></i>
                <span>{t('health-vaccination')}</span>
              </h3>
              <p className="service-item-desc">{t('health-vaccination-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> {t('label-free')}
                </span>
                <span>
                  <strong>{t('label-time')}</strong> {t('label-schedule-varies')}
                </span>
              </div>
            </div>

            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-heart"></i>
                <span>{t('health-maternal')}</span>
              </h3>
              <p className="service-item-desc">{t('health-maternal-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> {t('label-free')}
                </span>
                <span>
                  <strong>{t('label-time')}</strong> {t('label-by-appointment')}
                </span>
              </div>
            </div>

            <div className="service-item-card">
              <h3 className="service-item-title">
                <i className="bi bi-prescription2"></i>
                <span>{t('health-medicine')}</span>
              </h3>
              <p className="service-item-desc">{t('health-medicine-desc')}</p>
              <div className="service-item-meta">
                <span>
                  <strong>{t('label-fee')}</strong> {t('label-free-subsidy')}
                </span>
                <span>
                  <strong>{t('label-time')}</strong> {t('label-1-3-days')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Facilities Statistics */}
      <section className="section section-compact">
        <div className="container">
          <div className="health-stats-grid">
            <div className="health-stat-card">
              <span className="health-stat-num">54</span>
              <span className="health-stat-label">{t('health-stat-facilities')}</span>
            </div>
            <div className="health-stat-card">
              <span className="health-stat-num">2</span>
              <span className="health-stat-label">{t('health-stat-hospitals')}</span>
            </div>
            <div className="health-stat-card">
              <span className="health-stat-num">34</span>
              <span className="health-stat-label">{t('health-stat-bhs')}</span>
            </div>
            <div className="health-stat-card">
              <span className="health-stat-num">1</span>
              <span className="health-stat-label">{t('health-stat-mho')}</span>
            </div>
          </div>
          <p className="data-source">
            <i className="bi bi-info-circle"></i> {t('health-source-label')}{' '}
            <a
              href="https://nhfr.doh.gov.ph/VActivefacilitiesList"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOH National Health Facility Registry
            </a>{' '}
            {t('health-source-retrieved')}
          </p>
        </div>
      </section>

      {/* Hospitals Directory */}
      <section className="section section-compact">
        <div className="container">
          <h2 className="section-title">
            <i className="bi bi-hospital"></i>
            <span>{t('health-section-hospitals')}</span>
          </h2>
          <div className="health-facilities-grid">
            <div className="health-facility-card health-facility-card--hospital">
              <div className="health-facility-badge">{t('health-badge-government-hospital')}</div>
              <h3>{t('health-davao-oriental-provincial-medical-center')}</h3>
              <p className="health-facility-desc">{t('health-dopmc-desc')}</p>
              <div className="health-facility-meta">
                <span>
                  <i className="bi bi-geo-alt"></i> <span>{t('health-city-of-mati')}</span>
                </span>
              </div>
            </div>
            <div className="health-facility-card health-facility-card--hospital">
              <div className="health-facility-badge">{t('health-badge-private-hospital')}</div>
              <h3>{t('health-st-camillus-hospital-of-mati')}</h3>
              <p className="health-facility-desc">{t('health-st-camillus-desc')}</p>
              <div className="health-facility-meta">
                <span>
                  <i className="bi bi-geo-alt"></i> <span>{t('health-city-of-mati')}</span>
                </span>
              </div>
            </div>
          </div>
          <p className="data-source">
            <i className="bi bi-info-circle"></i> {t('health-source-label')}{' '}
            <a
              href="https://nhfr.doh.gov.ph/VActivefacilitiesList"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOH National Health Facility Registry
            </a>{' '}
            {t('health-source-retrieved')}
          </p>
        </div>
      </section>

      {/* City Health Office */}
      <section className="section section-compact bg-alt">
        <div className="container">
          <h2 className="section-title">
            <i className="bi bi-building"></i>
            <span>{t('health-section-mho')}</span>
          </h2>
          <div className="health-mho-card">
            <div className="health-mho-content">
              <h3>{t('health-mho-title')}</h3>
              <p>{t('health-mho-desc')}</p>
              <div className="health-mho-services">
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-lying-in')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-laboratory')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-immunization')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-prenatal')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-family-planning')}</span>
                </span>
                <span>
                  <i className="bi bi-check-circle"></i>
                  <span>{t('health-service-tb-dots')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barangay Health Stations */}
      <section className="section section-compact">
        <div className="container">
          <h2 className="section-title">
            <i className="bi bi-plus-circle"></i>
            <span>{t('health-section-bhs')}</span>
          </h2>
          <p className="section-subtitle">{t('health-bhs-subtitle')}</p>
          <div className="health-bhs-grid">
            <div className="health-bhs-item">
              <span>Badas BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Bobon BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Buso BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Cabuaya BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Culian BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Dahican A BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Dahican B BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Dahican C BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Danao BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Dawan BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Don Enrique Lopez BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Don Martin Marundan BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Don Salvador Lopez, Sr. BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Langka BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Lawigan BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Libudon BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Luban BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Macambol BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Mamali BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Matiao A BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Matiao B BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Mayo BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Poblacion 1 BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Poblacion 2 BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Poblacion 3 BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Poblacion 4 BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Poblacion 5 BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Poblacion 6 BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Sainz BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Sanghay BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Tagabakid BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Tagbinonga BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Taguibo BHS</span>
            </div>
            <div className="health-bhs-item">
              <span>Tamisan BHS</span>
            </div>
          </div>
          <p className="data-source">
            <i className="bi bi-info-circle"></i> {t('health-source-label')}{' '}
            <a
              href="https://nhfr.doh.gov.ph/VActivefacilitiesList"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOH National Health Facility Registry
            </a>{' '}
            {t('health-source-retrieved')}
          </p>
        </div>
      </section>

      {/* HIV Care Philippines CTA */}
      <section className="section hivcare-cta-section" aria-label="HIV Care Philippines facility directory">
        <div className="container">
          <div className="hivcare-cta-card">
            <span className="hivcare-cta-eyebrow">
              <i className="bi bi-shield-check" aria-hidden="true"></i>
              <span>{t('health-hivcare-cta-eyebrow')}</span>
            </span>
            <img
              src="/assets/images/logo/hivcareph-logo.svg"
              alt="HIV Care Philippines"
              className="hivcare-cta-logo"
              width={168}
              height={50}
              loading="lazy"
            />
            <h2 className="hivcare-cta-heading">{t('health-hivcare-cta-heading')}</h2>
            <p className="hivcare-cta-text">{t('health-hivcare-cta-desc')}</p>
            <div className="hivcare-cta-stats">
              <span className="hivcare-cta-stat">
                <i className="bi bi-hospital" aria-hidden="true"></i>
                <strong>338</strong>
                <span>{t('health-hivcare-cta-stat-facilities')}</span>
              </span>
              <span className="hivcare-cta-stat">
                <i className="bi bi-phone" aria-hidden="true"></i>
                <span>{t('health-hivcare-cta-stat-mobile')}</span>
              </span>
              <span className="hivcare-cta-stat">
                <i className="bi bi-patch-check-fill" aria-hidden="true"></i>
                <span>{t('health-hivcare-cta-stat-verified')}</span>
              </span>
            </div>
            <a
              href="https://hivcareph.org/"
              className="hivcare-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              <span>{t('health-hivcare-cta-btn')}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
