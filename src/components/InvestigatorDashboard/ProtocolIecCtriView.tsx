import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  AlertCircle,
  FileCheck2,
  GitCommit,
  User,
  Building,
  Leaf,
  Pill
} from 'lucide-react';
import { ClinicalStudy } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface ProtocolIecCtriViewProps {
  study: ClinicalStudy;
  onNavigateTab: (tabId: string) => void;
}

export const ProtocolIecCtriView: React.FC<ProtocolIecCtriViewProps> = ({ study, onNavigateTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: Protocol Synopsis & Identity */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="glass-pill">{study.phase}</span>
              <span className="badge-gold">{study.studyType}</span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Protocol Ref: <strong style={{ color: '#0f172a' }}>{study.protocolNumber}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '8px', maxWidth: '1000px', lineHeight: 1.35, fontWeight: 800 }}>
              {study.title}
            </h2>
            <div style={{ fontSize: '0.86rem', color: '#047857', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <span>Indication: <strong>{study.indication}</strong></span>
              <span>•</span>
              <span style={{ color: '#475569' }}>Design: <strong>{study.designDetails}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                soundManager.playSuccess();
                alert(`Downloading Clinical Protocol PDF (v2.3) for ${study.protocolNumber}. Contains full schedule of assessments, CDASH eCRF templates, and statistical analysis plan.`);
              }}
              className="btn-secondary" 
              style={{ fontSize: '0.82rem', padding: '9px 16px' }}
            >
              <Download size={15} /> Download Protocol PDF (v2.3)
            </button>
          </div>
        </div>

        {/* Investigational Product & Comparator Specs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          background: '#f8faf8',
          border: '1px solid #e2ece4',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              Investigational Ayurvedic Product (Arm A)
            </div>
            <div style={{ fontSize: '0.94rem', color: '#047857', fontWeight: 700 }}>
              <Leaf size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />{study.investigationalProduct}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              Comparator Arm (Arm B)
            </div>
            <div style={{ fontSize: '0.94rem', color: '#b45309', fontWeight: 700 }}>
              <Pill size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />{study.comparatorArm}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: IEC Approval & CTRI Prospective Registration */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Module 1: Institutional Ethics Committee (IEC) Oversight */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: '#047857' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                Institutional Ethics Committee (IEC)
              </h3>
            </div>
            <span className="glass-pill">
              ✓ Approved & Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
              <span style={{ color: '#64748b' }}>Ethics Clearance Ref:</span>
              <span style={{ color: '#0f172a', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{study.iecRegistrationNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
              <span style={{ color: '#64748b' }}>Clearance Date:</span>
              <span style={{ color: '#0f172a' }}>{study.iecApprovalDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
              <span style={{ color: '#64748b' }}>Annual Renewal Deadline:</span>
              <span style={{ color: '#b45309', fontWeight: 700 }}>{study.iecAnnualRenewalDue} ({study.iecDaysUntilRenewal} days remaining)</span>
            </div>
          </div>

          {/* Renewal Countdown Progress */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#64748b', marginBottom: '6px' }}>
              <span>Renewal Horizon (12-Month Cycle)</span>
              <span style={{ color: '#047857', fontWeight: 700 }}>181 Days Remaining</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#f1f5f1', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #059669, #10b981)' }} />
            </div>
          </div>

          {/* ICMR Ethical Guidelines Compliance Checklist */}
          <div style={{
            background: '#f8faf8',
            border: '1px solid #e2ece4',
            borderRadius: '10px',
            padding: '16px'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              ICMR Ethical Guidelines Compliance Audit
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <CheckCircle2 size={15} style={{ color: '#047857' }} /> Informed Consent Form in 3 languages (English, Hindi, Gujarati)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <CheckCircle2 size={15} style={{ color: '#047857' }} /> Vulnerable Population Safeguards & Assent provisions verified
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <CheckCircle2 size={15} style={{ color: '#047857' }} /> ASU Formulation Pre-clinical Safety & Heavy Metal Dossier Cleared
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <CheckCircle2 size={15} style={{ color: '#047857' }} /> Trial Insurance & Medical Management Liability Active
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: CTRI Prospective Registration */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe2 size={20} style={{ color: '#b45309' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                Clinical Trials Registry – India (CTRI)
              </h3>
            </div>
            <span className="badge-gold">
              ✓ Prospectively Registered
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
              <span style={{ color: '#64748b' }}>Mandatory CTRI Number:</span>
              <span style={{ color: '#0f172a', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{study.ctriNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
              <span style={{ color: '#64748b' }}>Registration Timestamp:</span>
              <span style={{ color: '#047857', fontWeight: 600 }}>{study.ctriRegistrationDate} (Prior to FPI)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
              <span style={{ color: '#64748b' }}>Statutory 6-Month Update Due:</span>
              <span style={{ color: study.ctriDaysUntilUpdate <= 15 ? '#dc2626' : '#047857', fontWeight: 700 }}>
                {study.ctriNext6MonthUpdateDue} ({study.ctriDaysUntilUpdate} days remaining)
              </span>
            </div>
          </div>

          {/* Alert Callout for Semi-Annual Regulatory Renewal */}
          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', fontWeight: 800, fontSize: '0.84rem', marginBottom: '4px' }}>
              <AlertCircle size={16} />
              <span>Mandatory 6-Month Status Renewal Approaching</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
              Per CTRI compliance guidelines, recruitment velocity, subject accrual counts, and safety summaries must be updated every 6 months.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                soundManager.playSuccess();
                alert(`CTRI Live Synchronizer: Verified prospective record ${study.ctriNumber}. All recruitment metrics synchronized with public portal.`);
              }}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.84rem', padding: '9px 18px' }}
            >
              <ExternalLink size={15} /> Synchronize CTRI Snapshot
            </button>
          </div>
        </div>
      </div>

      {/* Study Milestones & Timelines */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
              Study Milestones & Timeline Progression
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              End-to-end lifecycle from protocol scientific clearance to final CTRI clinical study report (CSR) upload.
            </p>
          </div>
          <span className="glass-pill">
            Phase: Active Enrolment (Milestone 6/9)
          </span>
        </div>

        {/* Milestones Flow */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {study.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';
            return (
              <div 
                key={milestone.id}
                style={{
                  background: isCompleted ? '#f8fdf9' : isInProgress ? '#fffdf7' : '#ffffff',
                  border: isCompleted ? '1px solid #a7f3d0' : isInProgress ? '1px solid #fde68a' : '1px solid #e2ece4',
                  borderRadius: '10px',
                  padding: '16px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: isCompleted ? '#ecfdf5' : isInProgress ? '#fef3c7' : '#f1f5f9',
                    color: isCompleted ? '#047857' : isInProgress ? '#b45309' : '#64748b'
                  }}>
                    {milestone.status}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    Target: {milestone.targetDate}
                  </span>
                </div>

                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  {idx + 1}. {milestone.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.45 }}>
                  {milestone.description}
                </div>
                {milestone.actualDate && (
                  <div style={{ fontSize: '0.74rem', color: '#047857', marginTop: '8px', fontWeight: 700 }}>
                    ✓ Achieved on {milestone.actualDate}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
