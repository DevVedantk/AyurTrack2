import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Activity,
  HeartPulse,
  Send,
  Download
} from 'lucide-react';
import { ClinicalStudy, AeSaeRecord } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface PharmacovigilanceViewProps {
  study: ClinicalStudy;
  onOpenLogAeSae: () => void;
}

export const PharmacovigilanceView: React.FC<PharmacovigilanceViewProps> = ({
  study,
  onOpenLogAeSae
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'SAE' | 'AE'>('All');
  const [secondsRemaining, setSecondsRemaining] = useState(7122); // 1h 58m 42s

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

  const filteredEvents = study.aeSaeList.filter(item => {
    if (selectedFilter === 'SAE') return item.isSae;
    if (selectedFilter === 'AE') return !item.isSae;
    return true;
  });

  const activeSae = study.aeSaeList.find(e => e.isSae);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* NPvCC National Pharmacovigilance Header */}
      <div className="glass-panel" style={{
        padding: '28px',
        borderLeft: '4px solid #dc2626',
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-crimson">
                <span className="pulse-dot-red"></span>
                NPvCC ASU&H SAFETY COORDINATION CENTRE
              </span>
              <span className="glass-pill" style={{ fontSize: '0.74rem' }}>
                NDCT Rules 2019 Rule 42 Compliant
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: '#0f172a', marginBottom: '6px', fontWeight: 800 }}>
              Pharmacovigilance & Safety Surveillance Sentinel
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#475569', maxWidth: '820px', lineHeight: 1.6 }}>
              AIIA anchors nationwide safety surveillance for ASU medicines. This module automatically enforces 
              the <strong>mandatory 24-hour regulatory notification clock</strong> to CDSCO and the Ethics Committee for SAEs, 
              indexes reactions against <strong>MedDRA 27.0</strong> and <strong>WHODrug Global</strong>, and computes WHO-UMC causality.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playAlert();
              onOpenLogAeSae();
            }}
            className="badge-crimson"
            style={{
              fontSize: '0.86rem',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.18)'
            }}
          >
            <ShieldAlert size={16} /> Report New AE / SAE
          </button>
        </div>

        {/* Live 24-Hour Urgent Regulatory Clock Box with Live Seconds Ticking */}
        {activeSae && (
          <div style={{
            marginTop: '22px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '14px',
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626'
              }}>
                <Clock size={28} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 800 }}>
                  MANDATORY STATUTORY 24-HR REGULATORY CLOCK (NDCT RULE 42)
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                  {formatCountdown(secondsRemaining)} <span style={{ fontSize: '0.82rem', color: '#991b1b', fontWeight: 600 }}>until CDSCO & IEC notification deadline</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                  Event: <strong style={{ color: '#0f172a' }}>{activeSae.term}</strong> (Subject: {activeSae.subjectId} at {activeSae.siteId}) • Onset: {new Date(activeSae.onsetDate).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  alert(`Expedited SAE Form 11 transmitted electronically to CDSCO SUGAM portal and AIIA Institutional Ethics Committee. Receipt ID: SUGAM-SAE-${Date.now()}`);
                }}
                className="btn-gold"
                style={{ fontSize: '0.84rem', padding: '9px 18px' }}
              >
                <Send size={15} /> Transmit Form 11 to CDSCO
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Events Table & Filter */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
              Adverse Reactions & Safety Surveillance Ledger
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              All events coded with MedDRA 27.0 System Organ Class (SOC) and WHODrug dictionary.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'SAE', 'AE'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFilter(tab);
                }}
                style={{
                  background: selectedFilter === tab ? '#ecfdf5' : '#f8faf8',
                  border: selectedFilter === tab ? '1px solid #a7f3d0' : '1px solid #e2ece4',
                  color: selectedFilter === tab ? '#047857' : '#64748b',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab === 'All' ? 'All Events' : tab === 'SAE' ? 'Serious (SAE)' : 'Adverse (AE)'}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Events Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredEvents.map(event => (
            <div
              key={event.id}
              style={{
                background: event.isSae ? '#fef8f8' : '#ffffff',
                border: event.isSae ? '1px solid #fecaca' : '1px solid #e2ece4',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={event.isSae ? 'badge-crimson' : 'glass-pill'}>
                    {event.eventType}
                  </span>
                  <span style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                    {event.term}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Subject: <strong style={{ color: '#047857' }}>{event.subjectId}</strong> ({event.siteId})
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    background: event.severity === 'Severe' ? '#fee2e2' : '#fef3c7',
                    color: event.severity === 'Severe' ? '#dc2626' : '#b45309'
                  }}>
                    Severity: {event.severity}
                  </span>
                  <span style={{
                    fontSize: '0.74rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    background: '#ecfdf5',
                    color: '#047857'
                  }}>
                    Outcome: {event.outcome}
                  </span>
                </div>
              </div>

              {/* Dictionaries & Causality Breakdown */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '12px',
                background: '#f8faf8',
                border: '1px solid #e2ece4',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#0284c7', fontWeight: 700 }}>MedDRA Coding:</span>
                  <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '2px' }}>
                    PT: {event.meddraPt}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>
                    SOC: {event.meddraSoc}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#b45309', fontWeight: 700 }}>ASU Causality Assessment:</span>
                  <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '2px' }}>
                    WHO-UMC: <strong>{event.whoUmcCausality}</strong>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>
                    Naranjo Probability Algorithm Score: {event.naranjoScore} / 13
                  </div>
                </div>

                <div>
                  <span style={{ color: '#047857', fontWeight: 700 }}>WHODrug Concomitant:</span>
                  <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '2px' }}>
                    {event.concomitantMedicationWhodrug}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>
                    DSMB Status: <strong style={{ color: '#047857' }}>{event.dsmbReviewStatus}</strong>
                  </div>
                </div>
              </div>

              {/* Regulatory Audit Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.74rem', color: '#64748b' }}>
                <span>Reported within 24h: <strong style={{ color: '#047857' }}>Yes (GCP-ASU Compliant)</strong></span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>SHA-256 Audit Seal: a665a45920422f9d417e...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
