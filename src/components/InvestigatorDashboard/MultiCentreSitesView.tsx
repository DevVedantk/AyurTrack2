import React from 'react';
import { 
  Building2, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle2, 
  FileCheck, 
  Package, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { ClinicalStudy, SiteInfo } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface MultiCentreSitesViewProps {
  study: ClinicalStudy;
}

export const MultiCentreSitesView: React.FC<MultiCentreSitesViewProps> = ({ study }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
              Multi-Centre Site Activation & Trial Site Telemetry
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Distributed scientific oversight across national participating Ayurveda research institutions.
            </p>
          </div>
          <span className="glass-pill">
            {study.sites.length} Active Participating Centres
          </span>
        </div>

        {/* Sites Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '22px'
        }}>
          {study.sites.map(site => {
            const enrolmentPct = Math.round((site.actualEnrolled / site.targetEnrolment) * 100);
            return (
              <div 
                key={site.siteId}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#a7f3d0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(4, 120, 87, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2ece4';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: '#ecfdf5',
                          color: '#047857',
                          border: '1px solid #a7f3d0'
                        }}>
                          {site.siteId}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <MapPin size={13} /> {site.city}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.35, fontWeight: 800 }}>
                        {site.siteName}
                      </h4>
                    </div>
                    <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                      {site.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '18px' }}>
                    Principal Investigator: <strong style={{ color: '#0f172a' }}>{site.piName}</strong>
                  </div>

                  {/* Enrolment Bar */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>Enrolment Progress</span>
                      <span style={{ color: '#047857', fontWeight: 700 }}>
                        {site.actualEnrolled} / {site.targetEnrolment} pts ({enrolmentPct}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: '#f1f5f1', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${enrolmentPct}%`, height: '100%', background: 'linear-gradient(90deg, #059669, #10b981)' }} />
                    </div>
                  </div>

                  {/* ISF & Monitoring Dates */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    fontSize: '0.78rem',
                    background: '#f8faf8',
                    border: '1px solid #e2ece4',
                    padding: '14px',
                    borderRadius: '10px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <div style={{ color: '#64748b' }}>ISF Completeness:</div>
                      <div style={{ color: '#b45309', fontWeight: 800 }}>{site.isfCompleteness}% Audited</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Open EDC Queries:</div>
                      <div style={{ color: site.openQueries > 0 ? '#dc2626' : '#047857', fontWeight: 800 }}>
                        {site.openQueries} Queries
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Last Monitor Visit:</div>
                      <div style={{ color: '#0f172a', fontWeight: 600 }}>{site.lastMonitoringVisit}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Next Monitor Visit:</div>
                      <div style={{ color: '#047857', fontWeight: 700 }}>{site.nextMonitoringVisit}</div>
                    </div>
                  </div>
                </div>

                {/* Drug Accountability */}
                <div style={{
                  borderTop: '1px solid #f1f5f1',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.76rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                    <Package size={15} style={{ color: '#b45309' }} />
                    <span>Batch: <strong style={{ color: '#0f172a' }}>{site.drugBatchLot}</strong></span>
                  </div>
                  <div style={{ color: '#047857', fontWeight: 700 }}>
                    {site.drugVialsRemaining} Kits Remaining
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
