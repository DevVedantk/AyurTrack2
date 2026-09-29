import React, { useState } from 'react';
import { 
  Flag, 
  CheckCircle2, 
  Circle, 
  FileCheck2, 
  Archive, 
  Database, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';
import { ClinicalStudy } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface CloseOutViewProps {
  study: ClinicalStudy;
}

export const CloseOutView: React.FC<CloseOutViewProps> = ({ study }) => {
  const [checklist, setChecklist] = useState({
    ...study.closeoutStatus
  });

  const toggleItem = (key: keyof typeof checklist) => {
    soundManager.playClick();
    if (key === 'overallReadiness') return;
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      const trueCount = [
        updated.tmfAudited,
        updated.ipReconciliationDone,
        updated.sampleBiobankArchived,
        updated.iecFinalReportSubmitted,
        updated.ctriResultsUploaded,
        updated.csrDrafted
      ].filter(Boolean).length;
      updated.overallReadiness = Math.round((trueCount / 6) * 100);
      return updated;
    });
  };

  const checklistItems = [
    { key: 'tmfAudited' as const, label: 'Trial Master File (TMF) Final Regulatory Audit', desc: 'All essential documents, CVs, GCP certificates, and monitor letters signed.' },
    { key: 'ipReconciliationDone' as const, label: 'Investigational Product (IP) Final Reconciliation & Destruction', desc: '100% accountable balance sheets for herbal extracts and matching placebos.' },
    { key: 'sampleBiobankArchived' as const, label: 'Bio-sample Repository Archival & Cold-Chain Certification', desc: 'Serum, plasma, and genomic aliquots transferred to AIIA Central Bio-repository.' },
    { key: 'iecFinalReportSubmitted' as const, label: 'IEC Final Study Completion & Safety Summary Report', desc: 'Formal closure notification submitted to Institutional Ethics Committee.' },
    { key: 'ctriResultsUploaded' as const, label: 'CTRI Public Registry Results & Primary Endpoint Upload', desc: 'Statutory publication of findings per Indian clinical trial norms.' },
    { key: 'csrDrafted' as const, label: 'Clinical Study Report (CSR) per CDISC & ICH E3 Standard', desc: 'Final statistical analysis package (ADaM) and CSR manuscript prepared.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flag size={22} style={{ color: '#047857' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
                Study Close-Out Governance & Readiness Index
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
              Comprehensive verification checklist required prior to database lock and final study de-registration.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Close-Out Readiness</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#047857' }}>
              {checklist.overallReadiness}%
            </div>
          </div>
        </div>

        {/* Readiness Bar */}
        <div style={{ width: '100%', height: '8px', background: '#f1f5f1', borderRadius: '4px', overflow: 'hidden', marginBottom: '28px' }}>
          <div style={{ width: `${checklist.overallReadiness}%`, height: '100%', background: 'linear-gradient(90deg, #059669, #10b981)', borderRadius: '4px' }} />
        </div>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {checklistItems.map(item => {
            const isDone = checklist[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleItem(item.key)}
                style={{
                  background: isDone ? '#f4fbf6' : '#ffffff',
                  border: isDone ? '1px solid #a7f3d0' : '1px solid #e2ece4',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.02)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDone ? '#6ee7b7' : '#cbd5cb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDone ? '#a7f3d0' : '#e2ece4';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ marginTop: '2px', color: isDone ? '#047857' : '#94a3b8' }}>
                  {isDone ? <CheckCircle2 size={22} style={{ color: '#047857' }} /> : <Circle size={22} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: isDone ? '#0f172a' : '#334155',
                    marginBottom: '4px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>

                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: isDone ? '#ecfdf5' : '#f1f5f9',
                  color: isDone ? '#047857' : '#64748b',
                  border: `1px solid ${isDone ? '#a7f3d0' : '#e2e8f0'}`
                }}>
                  {isDone ? 'Verified' : 'Pending Action'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Export Dossier CTA */}
        <div style={{
          marginTop: '26px',
          paddingTop: '20px',
          borderTop: '1px solid #e2ece4',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            All close-out records undergo immutable ALCOA+ hashing prior to permanent study archive.
          </div>
          <button
            onClick={() => {
              soundManager.playSuccess();
              alert(`Close-Out Dossier Package generated for ${study.protocolNumber}. Contains TMF index, IP destruction certificate, and CTRI final upload draft.`);
            }}
            className="btn-primary"
            style={{ fontSize: '0.84rem', padding: '9px 20px' }}
          >
            <Download size={15} /> Export Close-Out Dossier Package
          </button>
        </div>
      </div>
    </div>
  );
};
