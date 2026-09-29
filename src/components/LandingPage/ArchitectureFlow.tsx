import React from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Globe2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const steps = [
    {
      id: '01',
      icon: <Building2 size={22} style={{ color: '#047857' }} />,
      title: 'Ayush HIS & Multi-Centre EDC',
      subtitle: 'CDASH Bedside Capture',
      desc: 'eCRFs capturing Ayurvedic diagnostic metrics (Prakriti, Agni, Dhatu, Rogabala) alongside conventional clinical endpoints.',
      accent: '#047857',
      accentBg: '#ecfdf5',
      accentBorder: '#a7f3d0'
    },
    {
      id: '02',
      icon: <Cpu size={22} style={{ color: '#b45309' }} />,
      title: 'CTMS Protocol Governance',
      subtitle: 'Automated Rule Engine',
      desc: 'Real-time protocol window verification (±2 days), 1:1 stratified block randomization, and screening eligibility audits.',
      accent: '#b45309',
      accentBg: '#fffbeb',
      accentBorder: '#fde68a'
    },
    {
      id: '03',
      icon: <ShieldCheck size={22} style={{ color: '#dc2626' }} />,
      title: 'NPvCC Safety & MedDRA',
      subtitle: '24-Hour Urgent Sentinel',
      desc: 'Automated 24h SAE regulatory countdown clock, WHODrug ASU herb-drug interaction flags, and WHO-UMC causality algorithms.',
      accent: '#dc2626',
      accentBg: '#fef2f2',
      accentBorder: '#fecaca'
    },
    {
      id: '04',
      icon: <Lock size={22} style={{ color: '#0284c7' }} />,
      title: 'DPDP Vault & ALCOA+',
      subtitle: 'Immutable Cryptographic Log',
      desc: 'Attributable & contemporaneous audit logs sealed with SHA-256 state hashes, with consent withdrawal handling.',
      accent: '#0284c7',
      accentBg: '#f0f9ff',
      accentBorder: '#bae6fd'
    },
    {
      id: '05',
      icon: <Globe2 size={22} style={{ color: '#047857' }} />,
      title: 'CDISC SDTM & ABDM FHIR',
      subtitle: 'Global Regulatory Ready',
      desc: 'Automated transformation to SDTM (DM, AE, VS) and HL7 FHIR R4 ResearchStudy resource for national health exchange.',
      accent: '#047857',
      accentBg: '#ecfdf5',
      accentBorder: '#a7f3d0'
    }
  ];

  return (
    <section id="interop" style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '60px 24px 80px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="badge-cyan" style={{ marginBottom: '14px' }}>
          <span>From the first visit to final submission</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.025em',
          marginBottom: '14px'
        }}>
          Study records that move <span style={{ color: '#047857' }}>with the research</span>
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '1.05rem',
          maxWidth: '740px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Connect site records, safety oversight and structured data through each stage of the study.
        </p>
      </div>

      {/* Steps Flow Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '20px',
        position: 'relative'
      }}>
        {steps.map((step, idx) => (
          <div 
            key={step.id}
            className="glass-panel"
            style={{
              padding: '28px 22px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#ffffff',
              border: '1px solid #e2ece4'
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '18px'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: step.accentBg,
                  border: `1px solid ${step.accentBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                }}>
                  {step.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: step.accent,
                  opacity: 0.6
                }}>
                  {step.id}
                </span>
              </div>

              <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '4px', fontWeight: 800 }}>
                {step.title}
              </h4>
              <div style={{ fontSize: '0.78rem', color: step.accent, fontWeight: 700, marginBottom: '12px' }}>
                {step.subtitle}
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.55 }}>
                {step.desc}
              </p>
            </div>

            <div style={{
              marginTop: '22px',
              paddingTop: '14px',
              borderTop: '1px solid #f1f5f1',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              color: '#047857',
              fontWeight: 600
            }}>
              <CheckCircle2 size={14} /> ALCOA+ Audited Step
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
