import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Users, 
  Award, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Download, 
  Filter, 
  Sparkles,
  PieChart,
  BarChart3,
  Sliders,
  Bell
} from 'lucide-react';
import { ClinicalStudy, SystemAlert } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface LeadershipDashboardProps {
  studies: ClinicalStudy[];
  onSelectStudy: (studyId: string) => void;
  alerts: SystemAlert[];
  onOpenAlertConfig: () => void;
  onOpenAuditTrail: () => void;
}

export const LeadershipDashboard: React.FC<LeadershipDashboardProps> = ({
  studies,
  onSelectStudy,
  alerts,
  onOpenAlertConfig,
  onOpenAuditTrail
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Aggregate metrics
  const totalTargetEnrolment = studies.reduce((acc, curr) => acc + curr.targetEnrollment, 0);
  const totalActualEnrolment = studies.reduce((acc, curr) => acc + curr.currentEnrolled, 0);
  const totalScreened = studies.reduce((acc, curr) => acc + curr.totalScreened, 0);
  const totalActiveSites = Array.from(new Set(studies.flatMap(s => s.sites.map(site => site.siteName)))).length;
  const portfolioAccrualPct = Math.round((totalActualEnrolment / totalTargetEnrolment) * 100);

  const departments = [
    { name: 'Kayachikitsa & Oncology', trials: 1, enrolled: 108, target: 120, lead: 'Prof. Dr. Rajesh Sharma' },
    { name: 'Diabetes Specialty & Dravyaguna', trials: 1, enrolled: 192, target: 200, lead: 'Prof. Dr. Tanuja Nesari' },
    { name: 'Panchakarma & Neuro-Ayurveda', trials: 1, enrolled: 48, target: 60, lead: 'Dr. Anand Kumar' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Leadership Executive Banner - Clean Light Dignified Styling */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: '#ffffff',
        borderLeft: '4px solid #b45309'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-gold">
                OFFICE OF THE DIRECTOR & INSTITUTIONAL LEADERSHIP
              </span>
              <span className="glass-pill" style={{ fontSize: '0.74rem' }}>
                All India Institute of Ayurveda (AIIA)
              </span>
            </div>
            <h2 style={{ fontSize: '1.55rem', color: '#0f172a', marginBottom: '6px', fontWeight: 800 }}>
              Institutional Clinical Research Portfolio & Governance Overview
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#475569', maxWidth: '880px', lineHeight: 1.6 }}>
              Executive intelligence summarizing AIIA's national multi-centre clinical research portfolio. 
              Real-time surveillance across <strong>recruitment velocity</strong>, <strong>statutory CTRI prospective compliance</strong>, 
              <strong>NPvCC safety signals</strong>, and <strong>ALCOA+ clinical data integrity</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAlertConfig();
              }}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '9px 16px' }}
            >
              <Sliders size={15} style={{ color: '#b45309' }} /> Configure Executive KPIs
            </button>

            <button
              onClick={() => {
                soundManager.playSuccess();
                alert('AIIA Annual Research Portfolio Executive Report (2026) generated. Contains multi-centre trial financials, CTRI registry verification, and NPvCC safety audit.');
              }}
              className="btn-gold"
              style={{ fontSize: '0.82rem', padding: '9px 18px' }}
            >
              <Download size={15} /> Export Annual Research Dossier
            </button>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #f1f5f1'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              Total Research Portfolio
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
              3 Flagship RCTs
            </div>
            <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 600 }}>Phase IIb & Phase III Superiority</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              National Patient Accrual
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#b45309' }}>
              {totalActualEnrolment} / {totalTargetEnrolment} <span style={{ fontSize: '0.88rem', color: '#047857' }}>({portfolioAccrualPct}%)</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#475569' }}>{totalScreened} Total Pre-Screened</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              Participating Sites Across India
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0284c7' }}>
              {totalActiveSites} National Centres
            </div>
            <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 600 }}>AIIA Delhi, ITRA, NIA, BHU, TMC</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              CTRI Prospective Compliance
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#047857' }}>
              100.0% Verified
            </div>
            <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 600 }}>Zero Retrospective Trials</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              Portfolio ALCOA+ Quality
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#047857' }}>
              99.2% Composite
            </div>
            <div style={{ fontSize: '0.74rem', color: '#475569' }}>SHA-256 State Hashing</div>
          </div>
        </div>
      </div>

      {/* Leadership Alert Sentinel Bar */}
      <div style={{
        background: '#fffdf7',
        border: '1px solid #fde68a',
        borderRadius: '14px',
        padding: '16px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        boxShadow: '0 2px 6px rgba(180, 83, 9, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={20} style={{ color: '#b45309' }} />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#92400e' }}>
              Active Executive Watch Items ({alerts.filter(a => !a.isRead).length} Items)
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569' }}>
              1 Site Enrolment Lag (NIA Jaipur -16%) • 1 Mandatory CTRI 6-Mo Update due in 15 days • 1 Expedited SAE initial transmission active.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenAlertConfig();
          }}
          className="btn-primary"
          style={{ fontSize: '0.8rem', padding: '7px 16px' }}
        >
          Review Executive Alert Details →
        </button>
      </div>

      {/* Two Column Grid: Studies Breakdown & Departmental Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '24px' }}>
        {/* Module 1: Portfolio Studies Drilldown */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
              Clinical Trial Status & Progression
            </h3>
            <span className="glass-pill">
              3 Ongoing Studies
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {studies.map(study => {
              const accrual = Math.round((study.currentEnrolled / study.targetEnrollment) * 100);
              return (
                <div
                  key={study.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2ece4',
                    borderRadius: '12px',
                    padding: '18px',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span className="badge-cyan" style={{ fontSize: '0.68rem' }}>{study.phase}</span>
                        <strong style={{ color: '#0f172a', fontSize: '0.94rem' }}>{study.id}</strong>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.35, fontWeight: 600 }}>
                        {study.shortTitle}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '3px' }}>
                        Lead PI: <strong style={{ color: '#0f172a' }}>{study.principalInvestigator}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: accrual >= 90 ? '#047857' : '#b45309' }}>
                        {study.currentEnrolled} / {study.targetEnrollment}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{accrual}% Accrued</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '6px', background: '#f1f5f1', borderRadius: '3px', overflow: 'hidden', margin: '10px 0' }}>
                    <div style={{ width: `${accrual}%`, height: '100%', background: accrual >= 90 ? '#059669' : '#d97706' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b' }}>
                    <span>CTRI: <strong style={{ color: '#0f172a' }}>{study.ctriNumber}</strong></span>
                    <span>ALCOA+ Score: <strong style={{ color: '#047857' }}>{study.alcoaScore.overall}%</strong></span>
                    <span>Sites: <strong>{study.sites.length} Active</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 2: Departmental Research Matrix */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
              Departmental Research Productivity
            </h3>
            <span className="badge-gold">
              AIIA Academic Council
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
            {departments.map((dept, idx) => {
              const pct = Math.round((dept.enrolled / dept.target) * 100);
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2ece4',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0f172a' }}>
                        {dept.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        Department Chair: {dept.lead}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#047857' }}>
                        {dept.enrolled} / {dept.target}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{pct}% Capacity</div>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '6px', background: '#f1f5f1', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#059669' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* National Interoperability Status */}
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            padding: '18px',
            fontSize: '0.8rem'
          }}>
            <div style={{ color: '#0284c7', fontWeight: 800, marginBottom: '6px', fontSize: '0.86rem' }}>
              Ayushman Bharat Digital Mission (ABDM) Integration Status
            </div>
            <p style={{ color: '#334155', lineHeight: 1.55, marginBottom: '10px' }}>
              All 3 trials are integrated with the ABDM Health Information Provider (HIP) gateway, allowing ABHA-linked 
              electronic consent and CDISC/FHIR R4 ResearchStudy exchange across all government institutes.
            </p>
            <div style={{ color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> National Digital Health Architecture Tier-1 Certified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
