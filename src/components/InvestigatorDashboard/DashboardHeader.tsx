import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Bell, 
  ShieldCheck, 
  FilePlus, 
  AlertTriangle, 
  FileCode, 
  History, 
  Home,
  CheckCircle2,
  Clock,
  HeartPulse,
  Crown,
  Activity,
  LogOut
} from 'lucide-react';
import { ClinicalStudy, UserRole, SystemAlert, UserAccount } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface DashboardHeaderProps {
  studies: ClinicalStudy[];
  currentStudy: ClinicalStudy;
  onSelectStudy: (studyId: string) => void;
  currentUser: UserAccount;
  activeDashboard: 'investigator' | 'ethics' | 'pv' | 'leadership';
  onSwitchDashboard: (dashboard: 'investigator' | 'ethics' | 'pv' | 'leadership') => void;
  onOpenAuth: () => void;
  alerts: SystemAlert[];
  onOpenAlerts: () => void;
  onOpenLogDeviation: () => void;
  onOpenLogAeSae: () => void;
  onOpenCdiscModal: () => void;
  onOpenAuditModal: () => void;
  onBackToLanding: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  studies,
  currentStudy,
  onSelectStudy,
  currentUser,
  activeDashboard,
  onSwitchDashboard,
  onOpenAuth,
  alerts,
  onOpenAlerts,
  onOpenLogDeviation,
  onOpenLogAeSae,
  onOpenCdiscModal,
  onOpenAuditModal,
  onBackToLanding
}) => {
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;
  const hasCriticalAlert = alerts.some(a => a.severity === 'critical' && !a.isRead);

  const dashboards = [
    { id: 'investigator' as const, label: 'Investigator CTMS', icon: <Activity size={14} />, roleMatch: 'Principal Investigator' },
    { id: 'ethics' as const, label: 'Ethics Committee (IEC)', icon: <ShieldCheck size={14} />, roleMatch: 'Institutional Ethics Committee' },
    { id: 'pv' as const, label: 'Pharmacovigilance (NPvCC)', icon: <HeartPulse size={14} />, roleMatch: 'Pharmacovigilance (NPvCC / DSMB)' },
    { id: 'leadership' as const, label: 'Leadership Portfolio', icon: <Crown size={14} />, roleMatch: 'Institutional Leadership (Director / Dean)' }
  ];

  return (
    <div className="dashboard-header" style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8e2',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
    }}>
      {/* Top Protocol Identifier Strip - Clean Luminous Institutional Banner */}
      <div className="dashboard-header__meta" style={{
        background: '#f4f8f5',
        borderBottom: '1px solid #e2ece4',
        padding: '6px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.74rem',
        color: '#2d4a36'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: '#047857',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.68rem',
              letterSpacing: '0.04em'
            }}>
              AIIA APEX CTMS
            </span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>
              Protocol ID: {currentStudy.protocolNumber}
            </span>
          </div>

          <span style={{ color: '#cbd5e1' }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={13} style={{ color: '#047857' }} />
            <span style={{ color: '#334155' }}>CTRI: <strong style={{ color: '#0f172a' }}>{currentStudy.ctriNumber}</strong> ({currentStudy.ctriRegistrationType})</span>
          </div>

          <span style={{ color: '#cbd5e1' }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={13} style={{ color: '#b45309' }} />
            <span style={{ color: '#334155' }}>IEC Clearance: <strong style={{ color: '#0f172a' }}>{currentStudy.iecRegistrationNumber.split(' ')[0]}</strong></span>
          </div>
        </div>

        {/* Dashboard Role Switcher Pills */}
        <div className="dashboard-role-switcher" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {dashboards.map(d => {
            const isActive = activeDashboard === d.id;
            return (
              <button
                key={d.id}
                onClick={() => {
                  soundManager.playClick();
                  onSwitchDashboard(d.id);
                }}
                style={{
                  background: isActive ? '#ffffff' : 'transparent',
                  border: isActive ? '1px solid #a7f3d0' : '1px solid transparent',
                  color: isActive ? '#047857' : '#475569',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {d.icon}
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Action Header */}
      <div className="dashboard-header__main" style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Study Selector & Portal Return */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToLanding();
            }}
            title="Return to Public Overview"
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}
          >
            <Home size={15} />
            <span>Public Site</span>
          </button>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Active Clinical Trial
            </div>
            <select
              value={currentStudy.id}
              onChange={(e) => onSelectStudy(e.target.value)}
              className="clean-input"
              style={{
                padding: '6px 12px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                minWidth: '320px',
                color: '#0f172a'
              }}
            >
              {studies.map(study => (
                <option key={study.id} value={study.id}>
                  {study.id} - {study.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Current User Profile Card */}
        <div style={{
          background: '#f8faf8',
          border: '1px solid #e2ece4',
          borderRadius: '10px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#047857'
          }}>
            {currentUser.avatarInitials}
          </div>

          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#047857', fontWeight: 600 }}>
              {currentUser.role}
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAuth();
            }}
            title="Switch User Role or Sign In"
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5cb',
              borderRadius: '6px',
              padding: '4px 8px',
              color: '#475569',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '4px',
              transition: 'all 0.15s ease'
            }}
          >
            Switch
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Urgent SAE Button */}
          <button
            onClick={() => {
              soundManager.playAlert();
              onOpenLogAeSae();
            }}
            className="badge-crimson"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem',
              cursor: 'pointer',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(220, 38, 38, 0.15)'
            }}
          >
            <span className="pulse-dot-red"></span>
            <span>Report AE / SAE</span>
          </button>

          {/* Log Deviation */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenLogDeviation();
            }}
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}
          >
            <FilePlus size={15} style={{ color: '#b45309' }} />
            <span>Log Deviation</span>
          </button>

          {/* CDISC / FHIR Export */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCdiscModal();
            }}
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}
          >
            <FileCode size={15} style={{ color: '#0284c7' }} />
            <span>CDISC / FHIR</span>
          </button>

          {/* ALCOA+ Audit Trail */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAuditModal();
            }}
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}
          >
            <History size={15} style={{ color: '#047857' }} />
            <span>Audit Trail</span>
          </button>

          {/* Alert Notification Bell */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAlerts();
            }}
            style={{
              position: 'relative',
              background: hasCriticalAlert ? '#fef2f2' : '#ffffff',
              border: hasCriticalAlert ? '1px solid #fecaca' : '1px solid #e2e8e2',
              borderRadius: '8px',
              padding: '8px 14px',
              color: hasCriticalAlert ? '#dc2626' : '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={16} />
            <span>Alerts</span>
            {unreadAlertsCount > 0 && (
              <span style={{
                background: hasCriticalAlert ? '#ef4444' : '#f59e0b',
                color: '#fff',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {unreadAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
