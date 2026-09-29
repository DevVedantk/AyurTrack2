import React from 'react';
import { ShieldCheck, Award, Scale, Timer, Search, ChartNoAxesCombined, Globe2, LockKeyhole, FileCheck2 } from 'lucide-react';

export const ComplianceBanner: React.FC = () => {
  const compliances = [
    { title: 'GCP-ASU Guidelines', org: 'Ministry of Ayush (2013)', icon: FileCheck2 },
    { title: 'ICMR Ethical Guidelines', org: 'Biomedical & Health Research (2017/2024)', icon: Scale },
    { title: 'NDCT Rules 2019', org: 'CDSCO Rule 42 (SAE 24h Reporting)', icon: Timer },
    { title: 'CTRI Mandatory Prospective', org: 'Clinical Trials Registry - India', icon: Search },
    { title: 'CDISC Standards', org: 'CDASH, SDTM 3.3, ADaM, Define-XML', icon: ChartNoAxesCombined },
    { title: 'HL7 FHIR R4 & ABDM', org: 'National Digital Health Mission', icon: Globe2 },
    { title: 'DPDP Act 2023 & 2025 Rules', org: 'Personal Data Protection Compliance', icon: ShieldCheck },
    { title: 'ISO/IEC 27001 & CERT-In', org: 'National Data Residency Verified', icon: LockKeyhole }
  ];

  return (
    <section id="compliance" style={{
      background: '#f8faf8',
      borderTop: '1px solid #e8ede8',
      borderBottom: '1px solid #e8ede8',
      padding: '50px 24px',
      margin: '20px 0'
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '32px',
          fontSize: '0.82rem',
          color: '#047857',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          <ShieldCheck size={18} style={{ color: '#047857' }} />
          <span>STATUTORY REGULATORY & ETHICAL COMPLIANCE FRAMEWORK</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '18px'
        }}>
          {compliances.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2ece4',
                borderRadius: '14px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(15, 23, 42, 0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a7f3d0';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(4, 120, 87, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2ece4';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(15, 23, 42, 0.02)';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#f4f8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <item.icon size={21} strokeWidth={1.8} color="#477460" />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                  {item.org}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
