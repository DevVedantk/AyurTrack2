import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FilePlus, 
  ShieldAlert,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ClinicalStudy, ProtocolDeviation } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface VisitsDeviationsViewProps {
  study: ClinicalStudy;
  onOpenLogDeviation: () => void;
}

export const VisitsDeviationsView: React.FC<VisitsDeviationsViewProps> = ({
  study,
  onOpenLogDeviation
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: Visit Compliance Overview */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
              Subject Visit & Protocol Schedule Compliance
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Adherence to per-protocol visit windows (±2 calendar days) across all multi-centre study visits.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="glass-pill" style={{ fontSize: '0.86rem', padding: '6px 14px' }}>
              Overall Compliance: <strong style={{ color: '#047857' }}>{study.visitComplianceOverall}%</strong>
            </span>
          </div>
        </div>

        {/* Table of Visits */}
        <div style={{ overflowX: 'auto', border: '1px solid #e2ece4', borderRadius: '12px' }}>
          <table className="clean-table">
            <thead>
              <tr>
                <th>Visit Identifier</th>
                <th>Target Day</th>
                <th>Completed / Target</th>
                <th>Window Violations (±2d)</th>
                <th>Missed Visits</th>
                <th>Compliance %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {study.visits.map((v, idx) => (
                <tr key={idx}>
                  <td style={{ color: '#0f172a', fontWeight: 700 }}>
                    {v.visitName}
                  </td>
                  <td style={{ color: '#475569', fontFamily: 'var(--font-mono)' }}>
                    Day {v.plannedDay > 0 ? `+${v.plannedDay}` : v.plannedDay}
                  </td>
                  <td style={{ color: '#0f172a' }}>
                    <strong>{v.completedCount}</strong> / {v.targetCount}
                  </td>
                  <td>
                    <span style={{
                      color: v.windowViolationCount > 0 ? '#b45309' : '#047857',
                      fontWeight: v.windowViolationCount > 0 ? 700 : 500,
                      background: v.windowViolationCount > 0 ? '#fffbeb' : '#ecfdf5',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.74rem'
                    }}>
                      {v.windowViolationCount} violations
                    </span>
                  </td>
                  <td>
                    <span style={{
                      color: v.missedCount > 0 ? '#dc2626' : '#64748b',
                      fontWeight: v.missedCount > 0 ? 700 : 500
                    }}>
                      {v.missedCount} missed
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: '#e2ece4', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${v.complianceRate}%`, height: '100%', background: v.complianceRate > 95 ? '#059669' : '#b45309' }} />
                      </div>
                      <span style={{ color: '#0f172a', fontWeight: 700 }}>{v.complianceRate}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: v.complianceRate >= 96 ? '#ecfdf5' : '#fffbeb',
                      color: v.complianceRate >= 96 ? '#047857' : '#b45309'
                    }}>
                      {v.complianceRate >= 96 ? 'Optimal' : 'Review Window'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Protocol Deviations Management Ledger */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} style={{ color: '#b45309' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
                Protocol Deviations Registry & CAPA Tracking
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
              GCP-ASU requires all major protocol deviations to be reported to the Institutional Ethics Committee (IEC) within 7 working days.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenLogDeviation();
            }}
            className="btn-primary"
            style={{ fontSize: '0.84rem', padding: '9px 18px' }}
          >
            <FilePlus size={15} /> Log New Deviation
          </button>
        </div>

        {/* Deviations List in Clean Light Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {study.protocolDeviations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: '#64748b', background: '#f8faf8', borderRadius: '10px' }}>
              No protocol deviations logged for this trial.
            </div>
          ) : (
            study.protocolDeviations.map(dev => (
              <div 
                key={dev.id}
                style={{
                  background: '#ffffff',
                  border: dev.deviationType === 'Major' ? '1px solid #fecaca' : '1px solid #fde68a',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={dev.deviationType === 'Major' ? 'badge-crimson' : 'badge-gold'}>
                      {dev.deviationType} Deviation
                    </span>
                    <span style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 800 }}>
                      {dev.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Subject: <strong style={{ color: '#047857' }}>{dev.subjectId}</strong> ({dev.siteId})
                    </span>
                    <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                      {dev.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
                    <span style={{ color: '#64748b' }}>Identified: {dev.dateIdentified}</span>
                    <span style={{ color: '#047857', fontWeight: 700 }}>
                      ✓ Reported to IEC within 7 Days
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', color: '#334155', marginBottom: '14px', lineHeight: 1.55 }}>
                  {dev.description}
                </div>

                {/* Root Cause & CAPA */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px',
                  background: '#f8faf8',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '0.8rem'
                }}>
                  <div>
                    <span style={{ color: '#b45309', fontWeight: 700 }}>Root Cause Analysis (RCA):</span>
                    <div style={{ color: '#475569', marginTop: '2px' }}>{dev.rootCause}</div>
                  </div>
                  <div>
                    <span style={{ color: '#047857', fontWeight: 700 }}>Corrective Action:</span>
                    <div style={{ color: '#475569', marginTop: '2px' }}>{dev.correctiveAction}</div>
                  </div>
                  <div>
                    <span style={{ color: '#0284c7', fontWeight: 700 }}>Preventive Action (CAPA):</span>
                    <div style={{ color: '#475569', marginTop: '2px' }}>{dev.preventiveAction}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.76rem' }}>
                  <span style={{ color: '#64748b' }}>
                    Status: <strong style={{ color: dev.status.includes('Closed') ? '#047857' : '#b45309' }}>{dev.status}</strong>
                  </span>
                  <span style={{ color: '#94a3b8' }}>
                    IEC Regulatory Audit Timestamp: 2026-09-22 14:10 IST
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
