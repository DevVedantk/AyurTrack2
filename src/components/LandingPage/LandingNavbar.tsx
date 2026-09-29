import React from 'react';
import { ShieldCheck, Activity, ArrowRight, UserCheck, Sparkles, Building2 } from 'lucide-react';

interface LandingNavbarProps {
  onLaunchDashboard: () => void;
  onOpenAuth: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onLaunchDashboard,
  onOpenAuth
}) => {
  return (
    <header className="landing-navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e8ede8',
      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
      transition: 'all 0.25s ease'
    }}>
      {/* Top Ministerial Notification Strip - Clean Light Botanical Style */}
      <div style={{
        background: '#f4f8f5',
        borderBottom: '1px solid #e2ece4',
        padding: '6px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.74rem',
        color: '#2d4a36'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            background: '#047857',
            color: '#ffffff',
            padding: '2px 7px',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '0.65rem',
            letterSpacing: '0.04em'
          }}>
            GOVT OF INDIA
          </span>
          <span style={{ fontWeight: 600, color: '#0f172a' }}>
            Ministry of Ayush • All India Institute of Ayurveda (AIIA)
          </span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: '#047857', fontWeight: 500 }}>
            National Pharmacovigilance Coordination Centre (NPvCC) for ASU&H
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 600 }}>
            <span className="pulse-dot"></span> CTRI Prospective Lock Active
          </span>
          <span style={{ color: '#64748b' }}>GCP-ASU & DPDP 2023 Compliant</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Brand */}
        <div 
          onClick={onLaunchDashboard}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 800,
            boxShadow: '0 2px 6px rgba(4, 120, 87, 0.25)'
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.025em'
              }}>
                Ayur<span style={{ color: '#047857' }}>Track</span>
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0'
              }}>
                CTMS & NPvCC
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
              All India Institute of Ayurveda Clinical Research OS
            </div>
          </div>
        </div>

        {/* Navigation links with smooth hover animations */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {[
            { href: '#overview', label: 'Portfolio Overview' },
            { href: '#features', label: 'CTMS Modules' },
            { href: '#npvcc-safety', label: 'NPvCC Safety Sentinel' },
            { href: '#interop', label: 'CDISC & FHIR R4' },
            { href: '#compliance', label: 'GCP-ASU / DPDP' }
          ].map(link => (
            <a 
              key={link.href}
              href={link.href} 
              style={{ 
                color: '#334155', 
                textDecoration: 'none', 
                fontSize: '0.86rem', 
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '6px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#047857';
                e.currentTarget.style.background = '#f4f8f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenAuth}
            className="btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem'
            }}
          >
            <UserCheck size={15} style={{ color: '#047857' }} />
            <span>Sign In / Demo Roles</span>
          </button>

          <button
            onClick={onLaunchDashboard}
            className="btn-primary"
            style={{
              padding: '8px 18px',
              fontSize: '0.84rem'
            }}
          >
            <Activity size={16} />
            <span>Enter CTMS Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
