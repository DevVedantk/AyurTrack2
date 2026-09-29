import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Users, 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  HelpCircle,
  Building2,
  TrendingUp,
  Activity
} from 'lucide-react';
import { ClinicalStudy } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface DashboardKpiGridProps {
  study: ClinicalStudy;
  onNavigateTab: (tabId: string) => void;
}

export const DashboardKpiGrid: React.FC<DashboardKpiGridProps> = ({ study, onNavigateTab }) => {
  const enrolmentPct = Math.round((study.currentEnrolled / study.targetEnrollment) * 100);
  const openQueriesCount = study.dataQueries.filter(q => q.status === 'Open').length;
  const activeSae = study.aeSaeList.find(e => e.isSae);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginBottom: '28px'
    }}>
      {/* KPI 1: Protocol & IEC Approval */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('overview');
        }}
        style={{
          borderLeft: '3px solid #047857'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            Protocol & IEC Clearance
          </span>
          <ShieldCheck size={16} style={{ color: '#047857' }} />
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
          {study.protocolVersion.split(' ')[0]} {study.protocolVersion.split(' ')[1]}
        </div>
        <div style={{ fontSize: '0.76rem', color: '#047857', fontWeight: 700 }}>
          ✓ IEC Approval Active
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
          Renewal Due: <strong style={{ color: '#b45309' }}>{study.iecDaysUntilRenewal} days</strong>
        </div>
      </div>

      {/* KPI 2: Prospective CTRI Registration */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('overview');
        }}
        style={{
          borderLeft: '3px solid #b45309'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            CTRI Registration
          </span>
          <Globe2 size={16} style={{ color: '#b45309' }} />
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
          {study.ctriNumber.replace('CTRI/', '')}
        </div>
        <div style={{ fontSize: '0.76rem', color: '#047857', fontWeight: 700 }}>
          ✓ Registered Prospectively
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
          6-Mo Update: <strong style={{ color: study.ctriDaysUntilUpdate <= 15 ? '#dc2626' : '#047857' }}>{study.ctriDaysUntilUpdate} days</strong>
        </div>
      </div>

      {/* KPI 3: Enrolment Progress */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('recruitment');
        }}
        style={{
          borderLeft: '3px solid #047857'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            Enrolment Velocity
          </span>
          <Users size={16} style={{ color: '#047857' }} />
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          {study.currentEnrolled} / {study.targetEnrollment} <span style={{ fontSize: '0.86rem', color: '#047857', fontWeight: 700 }}>({enrolmentPct}%)</span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          background: '#f1f5f1',
          borderRadius: '4px',
          margin: '8px 0',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${enrolmentPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #059669, #10b981)',
            borderRadius: '4px'
          }} />
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
          Screened: <strong>{study.totalScreened}</strong> | Dropout: <strong>{study.dropoutRatePercent}%</strong>
        </div>
      </div>

      {/* KPI 4: Randomization Balance */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('recruitment');
        }}
        style={{
          borderLeft: '3px solid #0284c7'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            Randomization Arms
          </span>
          <GitBranch size={16} style={{ color: '#0284c7' }} />
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          <span style={{ color: '#047857' }}>{study.randomizedActiveArm} Active</span> : <span style={{ color: '#0284c7' }}>{study.randomizedComparatorArm} Placebo</span>
        </div>
        <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 700, marginTop: '4px' }}>
          1:1 Block Permuted • Balanced
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
          Stratified by Age & Prakriti
        </div>
      </div>

      {/* KPI 5: Visit & Protocol Compliance */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('compliance');
        }}
        style={{
          borderLeft: '3px solid #047857'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            Visit Compliance
          </span>
          <Activity size={16} style={{ color: '#047857' }} />
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#047857' }}>
          {study.visitComplianceOverall}%
        </div>
        <div style={{ fontSize: '0.76rem', color: '#334155', fontWeight: 600 }}>
          Window Adherence: ±2 Days
        </div>
        <div style={{ fontSize: '0.72rem', color: '#b45309', marginTop: '6px' }}>
          Deviations: <strong>{study.protocolDeviations.length} Logged</strong> (CAPA tracked)
        </div>
      </div>

      {/* KPI 6: NPvCC 24h SAE Regulatory Clock */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('safety');
        }}
        style={{
          borderLeft: activeSae ? '3px solid #dc2626' : '3px solid #047857',
          background: activeSae ? '#fff8f8' : '#ffffff'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: activeSae ? '#dc2626' : '#64748b', fontWeight: 700 }}>
            NPvCC Safety Sentinel
          </span>
          <Clock size={16} style={{ color: activeSae ? '#dc2626' : '#047857' }} />
        </div>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          color: activeSae ? '#dc2626' : '#047857',
          fontFamily: 'var(--font-mono)'
        }}>
          {activeSae ? '01h : 58m : 42s' : '0 SAEs Pending'}
        </div>
        <div style={{ fontSize: '0.76rem', color: activeSae ? '#991b1b' : '#047857', fontWeight: 700 }}>
          {activeSae ? '24h Regulatory Clock Active' : 'No Critical Safety Signals'}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
          Total AEs: <strong>{study.aeSaeList.length}</strong> (MedDRA/WHO Coded)
        </div>
      </div>

      {/* KPI 7: Data Queries & ALCOA+ */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('queries');
        }}
        style={{
          borderLeft: '3px solid #0284c7'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            EDC Queries & ALCOA+
          </span>
          <HelpCircle size={16} style={{ color: '#0284c7' }} />
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          {openQueriesCount} Open <span style={{ fontSize: '0.82rem', color: '#64748b' }}>/ {study.dataQueries.length} total</span>
        </div>
        <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 700 }}>
          ALCOA+ Score: {study.alcoaScore.overall}%
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
          Avg Aging: <strong>2.1 Days</strong> (0 &gt; 7d)
        </div>
      </div>

      {/* KPI 8: Multi-Centre Site Activation */}
      <div 
        className="kpi-card"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('sites');
        }}
        style={{
          borderLeft: '3px solid #b45309'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
            Site Activation
          </span>
          <Building2 size={16} style={{ color: '#b45309' }} />
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          {study.sites.length} / {study.sites.length} Active
        </div>
        <div style={{ fontSize: '0.76rem', color: '#b45309', fontWeight: 700 }}>
          Apex: AIIA New Delhi
        </div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
          ISF Completeness: <strong>96.8%</strong>
        </div>
      </div>
    </div>
  );
};
