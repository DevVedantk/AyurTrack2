import React from 'react';
import { 
  FileText, 
  Users, 
  Activity, 
  ShieldAlert, 
  HelpCircle, 
  Building2, 
  Flag
} from 'lucide-react';
import { soundManager } from '../../utils/audioFeedback';

export type DashboardTabId = 
  | 'overview' 
  | 'recruitment' 
  | 'compliance' 
  | 'safety' 
  | 'queries' 
  | 'sites' 
  | 'closeout';

interface DashboardTabsProps {
  activeTab: DashboardTabId;
  onChangeTab: (tabId: DashboardTabId) => void;
  openQueriesCount: number;
  openDeviationsCount: number;
  saeCount: number;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onChangeTab,
  openQueriesCount,
  openDeviationsCount,
  saeCount
}) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Protocol & Regulatory Governance',
      icon: <FileText size={16} />,
      badge: null
    },
    {
      id: 'recruitment',
      label: 'Screening & Randomization',
      icon: <Users size={16} />,
      badge: null
    },
    {
      id: 'compliance',
      label: 'Visits & Protocol Deviations',
      icon: <Activity size={16} />,
      badge: openDeviationsCount > 0 ? `${openDeviationsCount} Dev` : null,
      badgeBg: '#fef3c7',
      badgeColor: '#b45309'
    },
    {
      id: 'safety',
      label: 'Pharmacovigilance (NPvCC)',
      icon: <ShieldAlert size={16} />,
      badge: saeCount > 0 ? '24h Clock Active' : null,
      badgeBg: '#fee2e2',
      badgeColor: '#dc2626'
    },
    {
      id: 'queries',
      label: 'EDC Queries & ALCOA+',
      icon: <HelpCircle size={16} />,
      badge: openQueriesCount > 0 ? `${openQueriesCount} Open` : null,
      badgeBg: '#e0f2fe',
      badgeColor: '#0284c7'
    },
    {
      id: 'sites',
      label: 'Multi-Centre Sites',
      icon: <Building2 size={16} />,
      badge: null
    },
    {
      id: 'closeout',
      label: 'Study Close-Out',
      icon: <Flag size={16} />,
      badge: null
    }
  ];

  return (
    <div className="dashboard-module-nav" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      overflowX: 'auto',
      padding: '6px',
      marginBottom: '26px',
      background: '#f1f5f2',
      border: '1px solid #e2ece4',
      borderRadius: '12px'
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              soundManager.playClick();
              onChangeTab(tab.id as DashboardTabId);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '8px',
              border: isActive 
                ? '1px solid #a7f3d0' 
                : '1px solid transparent',
              background: isActive 
                ? '#ffffff' 
                : 'transparent',
              color: isActive ? '#047857' : '#475569',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.84rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              boxShadow: isActive ? '0 2px 8px rgba(4, 120, 87, 0.08)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.color = '#0f172a';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#475569';
              }
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span style={{
                background: tab.badgeBg || '#ecfdf5',
                color: tab.badgeColor || '#047857',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
