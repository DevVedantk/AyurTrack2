import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Clock, 
  FileCode,
  TrendingUp,
  Building2,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Lock,
  HeartPulse
} from 'lucide-react';
import { soundManager } from '../../utils/audioFeedback';

interface HeroSectionProps {
  onLaunchDashboard: () => void;
  onOpenCdiscModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchDashboard,
  onOpenCdiscModal
}) => {
  // Live ticking countdown timer for 24h regulatory clock (NDCT Rule 42)
  const [secondsRemaining, setSecondsRemaining] = useState(7122); // 1h 58m 42s
  const [activeHudTab, setActiveHudTab] = useState<'rcts' | 'enrolment' | 'safety'>('rcts');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <section className="hero-section" style={{
      position: 'relative',
      padding: '70px 24px 80px',
      maxWidth: '1440px',
      margin: '0 auto',
      overflow: 'hidden'
    }}>
      {/* Ambient Organic Light Mesh */}
      <div className="ambient-glow-mesh">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '1060px', margin: '0 auto' }}>
        {/* Floating Institutional Eyebrow Tag */}
        <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
          <div className="glass-pill" style={{
            padding: '7px 18px',
            fontSize: '0.78rem',
            gap: '10px',
            background: '#ffffff',
            border: '1px solid #d1fae5',
            boxShadow: '0 2px 8px rgba(4, 120, 87, 0.08)'
          }}>
            <span className="pulse-dot"></span>
            <span style={{ fontWeight: 800, color: '#065f46', letterSpacing: '0.06em' }}>
              ALL INDIA INSTITUTE OF AYURVEDA · MINISTRY OF AYUSH
            </span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ color: '#334155', fontWeight: 600 }}>Clinical trials & safety</span>
          </div>
        </div>

        {/* Main Awwwards Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.12,
          marginBottom: '22px',
          color: '#0f172a'
        }}>
          Clinical Trial Management & Safety Surveillance for{' '}
          <span style={{
            background: 'linear-gradient(135deg, #047857 0%, #059669 50%, #0d9488 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Ayurvedic Medicine
          </span>
        </h1>

        {/* Subtitle with high-craft editorial spacing */}
        <p style={{
          fontSize: 'clamp(1.05rem, 1.7vw, 1.22rem)',
          color: '#475569',
          lineHeight: 1.65,
          maxWidth: '860px',
          margin: '0 auto 36px',
          fontWeight: 400
        }}>
          AIIA research teams can manage study approvals, participant enrolment, site activity and safety reporting in one connected workspace.
        </p>

        {/* Primary Call to Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '54px'
        }}>
          <button
            onClick={() => {
              soundManager.playSuccess();
              onLaunchDashboard();
            }}
            className="btn-primary"
            style={{
              padding: '13px 30px',
              fontSize: '0.96rem',
              borderRadius: '12px'
            }}
          >
            <Activity size={18} />
            <span>Launch Investigator CTMS</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCdiscModal();
            }}
            className="btn-secondary"
            style={{
              padding: '13px 24px',
              fontSize: '0.96rem',
              borderRadius: '12px'
            }}
          >
            <FileCode size={18} style={{ color: '#047857' }} />
            <span>CDISC SDTM & FHIR R4 Specs</span>
          </button>
        </div>

        {/* Live Clinical Portfolio Telemetry HUD (Awwwards Style Interactive Card) */}
        <div className="glass-panel" style={{
          padding: '24px 30px',
          borderRadius: '20px',
          background: '#ffffff',
          boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
          border: '1px solid #e2e8e2'
        }}>
          {/* Top HUD Selector Tabs */}
          <div className="hero-telemetry-grid" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f1f5f1',
            paddingBottom: '14px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '0.82rem', color: '#426b54', fontWeight: 700 }}>
                Study portfolio
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveHudTab('rcts');
                }}
                style={{
                  background: activeHudTab === 'rcts' ? '#ecfdf5' : '#f8faf8',
                  border: activeHudTab === 'rcts' ? '1px solid #a7f3d0' : '1px solid #e8ede8',
                  color: activeHudTab === 'rcts' ? '#047857' : '#64748b',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                RCT Portfolio
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveHudTab('enrolment');
                }}
                style={{
                  background: activeHudTab === 'enrolment' ? '#fffbeb' : '#f8faf8',
                  border: activeHudTab === 'enrolment' ? '1px solid #fde68a' : '1px solid #e8ede8',
                  color: activeHudTab === 'enrolment' ? '#b45309' : '#64748b',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Accrual Pacing
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveHudTab('safety');
                }}
                style={{
                  background: activeHudTab === 'safety' ? '#fef2f2' : '#f8faf8',
                  border: activeHudTab === 'safety' ? '1px solid #fecaca' : '1px solid #e8ede8',
                  color: activeHudTab === 'safety' ? '#dc2626' : '#64748b',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                24h SAE Sentinel
              </button>
            </div>
          </div>

          {/* 4 Interactive KPI Cards in clean light styling */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '20px',
            textAlign: 'left'
          }}>
            {/* Stat 1: Active RCTs */}
            <div 
              className="kpi-card"
              style={{
                borderLeft: '3px solid #047857',
                background: activeHudTab === 'rcts' ? '#f8fdf9' : '#ffffff'
              }}
              onClick={onLaunchDashboard}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Building2 size={15} style={{ color: '#047857' }} />
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
                  Active portfolio
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                3 <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 700 }}>Multi-Centre RCTs</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                Oncology, Diabetes & Neurology
              </div>
            </div>

            {/* Stat 2: Target Enrolment */}
            <div 
              className="kpi-card"
              style={{
                borderLeft: '3px solid #b45309',
                background: activeHudTab === 'enrolment' ? '#fffdf7' : '#ffffff'
              }}
              onClick={onLaunchDashboard}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <TrendingUp size={15} style={{ color: '#b45309' }} />
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
                  Recruitment Accrual
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                348 / 380 <span style={{ fontSize: '0.86rem', color: '#b45309', fontWeight: 700 }}>[91.5%]</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                Screening Funnel: 590 Screened
              </div>
            </div>

            {/* Stat 3: ALCOA+ Data Integrity */}
            <div 
              className="kpi-card"
              style={{ borderLeft: '3px solid #0284c7' }}
              onClick={onLaunchDashboard}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <ShieldCheck size={15} style={{ color: '#0284c7' }} />
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>
                  ALCOA+ Data Integrity
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#047857', lineHeight: 1.2 }}>
                99.2% <span style={{ fontSize: '0.86rem', color: '#475569', fontWeight: 600 }}>Audit Pass</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                SHA-256 State Hashing Sealed
              </div>
            </div>

            {/* Stat 4: NPvCC 24h SAE Sentinel with Live Ticking Seconds */}
            <div 
              className="kpi-card"
              style={{
                borderLeft: '3px solid #dc2626',
                background: activeHudTab === 'safety' ? '#fff7f7' : '#ffffff'
              }}
              onClick={onLaunchDashboard}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Clock size={15} style={{ color: '#dc2626' }} />
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#dc2626', fontWeight: 800, letterSpacing: '0.04em' }}>
                  NPvCC 24h SAE Sentinel
                </span>
              </div>
              <div style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#dc2626',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.2
              }}>
                {formatCountdown(secondsRemaining)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '4px' }}>
                SAE-2026-004 Form 11 Clock
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
