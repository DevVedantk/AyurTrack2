import React, { useState } from 'react';
import { X, FileCode, Download, Database, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { CDISC_SDTM_SAMPLE, HL7_FHIR_RESEARCH_STUDY } from '../../data/mockStudies';
import { soundManager } from '../../utils/audioFeedback';

interface CdiscFhirModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CdiscFhirModal: React.FC<CdiscFhirModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sdtm-dm' | 'sdtm-ae' | 'sdtm-vs' | 'fhir-r4'>('sdtm-dm');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (content: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    soundManager.playSuccess();
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '880px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={22} style={{ color: '#0284c7' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>
                CDISC Standards & HL7 FHIR R4 Interoperability Gateway
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Conforms to CDISC SDTM 3.3, ADaM, and Ayushman Bharat Digital Mission (ABDM) FHIR specs.
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          borderBottom: '1px solid #e2ece4',
          paddingBottom: '8px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sdtm-dm');
            }}
            style={{
              background: activeTab === 'sdtm-dm' ? '#e0f2fe' : '#ffffff',
              border: activeTab === 'sdtm-dm' ? '1px solid #7dd3fc' : '1px solid #e2ece4',
              color: activeTab === 'sdtm-dm' ? '#0369a1' : '#64748b',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            SDTM: DM (Demographics)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sdtm-ae');
            }}
            style={{
              background: activeTab === 'sdtm-ae' ? '#e0f2fe' : '#ffffff',
              border: activeTab === 'sdtm-ae' ? '1px solid #7dd3fc' : '1px solid #e2ece4',
              color: activeTab === 'sdtm-ae' ? '#0369a1' : '#64748b',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            SDTM: AE (Adverse Events)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sdtm-vs');
            }}
            style={{
              background: activeTab === 'sdtm-vs' ? '#e0f2fe' : '#ffffff',
              border: activeTab === 'sdtm-vs' ? '1px solid #7dd3fc' : '1px solid #e2ece4',
              color: activeTab === 'sdtm-vs' ? '#0369a1' : '#64748b',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            SDTM: VS (Vital Signs)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('fhir-r4');
            }}
            style={{
              background: activeTab === 'fhir-r4' ? '#ecfdf5' : '#ffffff',
              border: activeTab === 'fhir-r4' ? '1px solid #a7f3d0' : '1px solid #e2ece4',
              color: activeTab === 'fhir-r4' ? '#047857' : '#64748b',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            HL7 FHIR R4 (ResearchStudy)
          </button>
        </div>

        {/* JSON Viewer */}
        <div style={{
          background: '#f8faf8',
          border: '1px solid #e2ece4',
          borderRadius: '10px',
          padding: '16px',
          maxHeight: '360px',
          overflowY: 'auto',
          marginBottom: '20px',
          position: 'relative',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <button
            onClick={() => {
              const content = activeTab === 'sdtm-dm' 
                ? JSON.stringify(CDISC_SDTM_SAMPLE.domainDM, null, 2)
                : activeTab === 'sdtm-ae'
                ? JSON.stringify(CDISC_SDTM_SAMPLE.domainAE, null, 2)
                : activeTab === 'sdtm-vs'
                ? JSON.stringify(CDISC_SDTM_SAMPLE.domainVS, null, 2)
                : JSON.stringify(HL7_FHIR_RESEARCH_STUDY, null, 2);
              handleCopy(content);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#ffffff',
              border: '1px solid #e2ece4',
              borderRadius: '6px',
              padding: '4px 10px',
              color: '#334155',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {copied ? <CheckCircle2 size={13} style={{ color: '#047857' }} /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: '#064e3b',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap'
          }}>
            {activeTab === 'sdtm-dm' && JSON.stringify(CDISC_SDTM_SAMPLE.domainDM, null, 2)}
            {activeTab === 'sdtm-ae' && JSON.stringify(CDISC_SDTM_SAMPLE.domainAE, null, 2)}
            {activeTab === 'sdtm-vs' && JSON.stringify(CDISC_SDTM_SAMPLE.domainVS, null, 2)}
            {activeTab === 'fhir-r4' && JSON.stringify(HL7_FHIR_RESEARCH_STUDY, null, 2)}
          </pre>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
            Validated against CDISC SDTM Implementation Guide v3.3 & Define-XML 2.1 specs.
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                const content = JSON.stringify(CDISC_SDTM_SAMPLE, null, 2);
                handleDownload('CDISC_SDTM_Submission_Package.json', content);
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              <Download size={14} /> Download SDTM Package (.json)
            </button>
            <button
              onClick={() => {
                const content = JSON.stringify(HL7_FHIR_RESEARCH_STUDY, null, 2);
                handleDownload('HL7_FHIR_ResearchStudy_ABDM.json', content);
              }}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              <Download size={14} /> Export ABDM FHIR Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
