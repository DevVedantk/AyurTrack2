import React, { useState } from 'react';
import { 
  FileCheck2, 
  Activity, 
  ShieldAlert, 
  Database, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { soundManager } from '../../utils/audioFeedback';

interface FeaturesBentoProps {
  onLaunchDashboard: () => void;
  onOpenAuditModal: () => void;
  onOpenCdiscModal: () => void;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({
  onLaunchDashboard,
  onOpenAuditModal,
  onOpenCdiscModal
}) => {
  const [bentoTab, setBentoTab] = useState<'protocol' | 'recruitment' | 'compliance'>('protocol');

  return (
    <section id="features" style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '40px 24px 70px'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="glass-pill" style={{ marginBottom: '14px' }}>
          <Sparkles size={13} style={{ color: '#047857' }} />
          <span>One workspace for the full study lifecycle</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.025em',
          marginBottom: '14px'
        }}>
          A clearer view of{' '}
          <span style={{ color: '#047857' }}>every study</span>
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '1.05rem',
          maxWidth: '740px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          From approvals to close-out, keep study work, oversight and reporting together in one place.
        </p>
      </div>

      {/* Awwwards Asymmetric Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '24px'
      }}>
        {/* Bento Item 1: CTMS Investigator Dashboard (Col 8) */}
        <div 
          className="glass-panel" 
          style={{
            gridColumn: 'span 8',
            padding: '32px',
            position: 'relative',
            background: 'linear-gradient(180deg, #ffffff 0%, #fbfdfb 100%)',
            border: '1px solid #e2ece4',
            cursor: 'pointer'
          }}
          onClick={onLaunchDashboard}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div className="glass-pill">
              <Activity size={14} />
              <span>For investigators and coordinators</span>
            </div>
            <span style={{ fontSize: '0.82rem', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              Launch CTMS Portal <ArrowRight size={14} />
            </span>
          </div>

          <h3 style={{ fontSize: '1.55rem', marginBottom: '10px', color: '#0f172a', fontWeight: 800 }}>
            Follow trial progress from one workspace
          </h3>
          <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '22px', maxWidth: '680px' }}>
            Multi-study drilldown tracking screening funnels, randomized 1:1 arm balance, visit window adherence (±2 days), 
            protocol deviations with root cause analysis (CAPA), and EDC data queries with aging alerts.
          </p>

          {/* Interactive Mini-Tab Preview Bar inside Bento */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8e2',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', borderBottom: '1px solid #f1f5f1', paddingBottom: '10px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick();
                  setBentoTab('protocol');
                }}
                style={{
                  background: bentoTab === 'protocol' ? '#ecfdf5' : 'transparent',
                  border: bentoTab === 'protocol' ? '1px solid #a7f3d0' : '1px solid transparent',
                  color: bentoTab === 'protocol' ? '#047857' : '#64748b',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Protocol Governance
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick();
                  setBentoTab('recruitment');
                }}
                style={{
                  background: bentoTab === 'recruitment' ? '#fffbeb' : 'transparent',
                  border: bentoTab === 'recruitment' ? '1px solid #fde68a' : '1px solid transparent',
                  color: bentoTab === 'recruitment' ? '#b45309' : '#64748b',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Recruitment Velocity
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick();
                  setBentoTab('compliance');
                }}
                style={{
                  background: bentoTab === 'compliance' ? '#f0f9ff' : 'transparent',
                  border: bentoTab === 'compliance' ? '1px solid #bae6fd' : '1px solid transparent',
                  color: bentoTab === 'compliance' ? '#0284c7' : '#64748b',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Visit Adherence
              </button>
            </div>

            {/* Content switch */}
            {bentoTab === 'protocol' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Protocol Status</div>
                  <div style={{ color: '#047857', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>v2.3 Approved</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>IEC-AIIA Clearance Active</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Ethics Ref</div>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0', fontFamily: 'var(--font-mono)' }}>ECR/124/Inst</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Annual Renewal in 181d</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Quality Standard</div>
                  <div style={{ color: '#047857', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>GCP-ASU Compliant</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Ministry of Ayush (2013)</div>
                </div>
              </div>
            )}

            {bentoTab === 'recruitment' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Target Enrolment</div>
                  <div style={{ color: '#b45309', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>108 / 120 Enrolled</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>90.0% Accrual Milestone</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Screening Funnel</div>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>148 Pre-Screened</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>28 Screen Failures (18.9%)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Randomization Balance</div>
                  <div style={{ color: '#047857', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>53 Active : 51 Placebo</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>1:1 Block Permuted (Valid)</div>
                </div>
              </div>
            )}

            {bentoTab === 'compliance' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Visit Adherence</div>
                  <div style={{ color: '#0284c7', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>96.4% On-Time</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Window: ±2 Days Per Protocol</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Logged Deviations</div>
                  <div style={{ color: '#b45309', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>2 CAPA Active</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>100% 7-Day IEC Transmission</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>EDC Query Aging</div>
                  <div style={{ color: '#047857', fontWeight: 800, fontSize: '1.05rem', margin: '2px 0' }}>2.1 Days Avg</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Zero Queries Over 7 Days</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bento Item 2: NPvCC Pharmacovigilance Module (Col 4) */}
        <div 
          className="glass-panel" 
          style={{
            gridColumn: 'span 4',
            padding: '30px',
            border: '1px solid #fecaca',
            background: 'linear-gradient(180deg, #ffffff 0%, #fef8f8 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="badge-crimson">
                <span className="pulse-dot-red"></span> NPvCC ASU SAFETY SENTINEL
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px', color: '#0f172a', fontWeight: 800 }}>
              24h SAE Regulatory Clock
            </h3>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '20px' }}>
              Statutory compliance with <strong>NDCT Rules 2019 Rule 42</strong>. Automated 24-hr CDSCO & IEC notification countdown, 
              <strong>MedDRA 27.0 & WHODrug</strong> indexing, and WHO-UMC causality algorithms.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.06)'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#991b1b', fontWeight: 700, textTransform: 'uppercase' }}>
                URGENT SAE REPORT SENTINEL
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                01h : 58m : 42s
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Form 11 Regulatory Clock Active</div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626'
            }}>
              <Clock size={22} />
            </div>
          </div>
        </div>

        {/* Bento Item 3: Prospective CTRI Registration (Col 4) */}
        <div className="glass-panel" style={{
          gridColumn: 'span 4',
          padding: '28px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span className="badge-gold">CTRI.NIC.IN AUTOMATION</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f172a', fontWeight: 800 }}>
              Mandatory Prospective Registration
            </h3>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '16px' }}>
              Full enforcement of mandatory prospective registration before the first patient is screened. 
              Automated alerts for statutory 6-month status updates and recruitment snapshots.
            </p>
          </div>

          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#b45309',
            fontSize: '0.82rem',
            fontWeight: 700
          }}>
            <CheckCircle2 size={16} /> Prospective Registration Lock Enforced
          </div>
        </div>

        {/* Bento Item 4: CDISC & HL7 FHIR Interoperability (Col 4) */}
        <div 
          className="glass-panel" 
          style={{
            gridColumn: 'span 4',
            padding: '28px',
            cursor: 'pointer',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onClick={() => {
            soundManager.playClick();
            onOpenCdiscModal();
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span className="badge-cyan">CDISC & HL7 FHIR R4</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f172a', fontWeight: 800 }}>
              Submission-Ready Clinical Data
            </h3>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '16px' }}>
              Instant transformation from CDASH eCRFs to SDTM domains (DM, AE, VS) and ADaM datasets. 
              Native HL7 FHIR R4 ResearchStudy export linked to Ayushman Bharat Digital Mission (ABDM).
            </p>
          </div>

          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#0284c7',
            fontSize: '0.82rem',
            fontWeight: 700
          }}>
            <span>Inspect SDTM 3.3 & FHIR JSON</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Bento Item 5: ALCOA+ Immutable Audit Trail & DPDP (Col 4) */}
        <div 
          className="glass-panel" 
          style={{
            gridColumn: 'span 4',
            padding: '28px',
            cursor: 'pointer',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onClick={() => {
            soundManager.playClick();
            onOpenAuditModal();
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span className="glass-pill">ALCOA+ & DPDP ACT 2023</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f172a', fontWeight: 800 }}>
              Immutable Cryptographic Ledger
            </h3>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '16px' }}>
              Attributable, Legible, Contemporaneous, Original, and Accurate with SHA-256 digital seals. 
              DPDP-compliant informed consent withdrawal, data minimization, and role-based access.
            </p>
          </div>

          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#047857',
            fontSize: '0.82rem',
            fontWeight: 700
          }}>
            <span>Inspect Real-Time Audit Trail</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </section>
  );
};
