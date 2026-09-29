import React, { useState } from 'react';
import { X, ShieldAlert, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { AeSaeRecord, SiteInfo } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface LogAeSaeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: SiteInfo[];
  onSubmitAeSae: (record: AeSaeRecord) => void;
}

export const LogAeSaeModal: React.FC<LogAeSaeModalProps> = ({
  isOpen,
  onClose,
  sites,
  onSubmitAeSae
}) => {
  const [subjectId, setSubjectId] = useState('AIIA-01-073');
  const [siteId, setSiteId] = useState('SITE-01');
  const [term, setTerm] = useState('');
  const [isSae, setIsSae] = useState(false);
  const [severity, setSeverity] = useState<AeSaeRecord['severity']>('Moderate');
  const [meddraSoc, setMeddraSoc] = useState('Gastrointestinal disorders');
  const [meddraPt, setMeddraPt] = useState('Abdominal pain (10000081)');
  const [saeCriteria, setSaeCriteria] = useState<AeSaeRecord['saeCriteria']>('Hospitalization');
  const [whoUmcCausality, setWhoUmcCausality] = useState<AeSaeRecord['whoUmcCausality']>('Possible');
  const [naranjoScore, setNaranjoScore] = useState<number>(4);
  const [concomitantMeds, setConcomitantMeds] = useState('Metformin 500mg BD');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) {
      alert('Please specify the clinical adverse event term.');
      return;
    }

    soundManager.playSuccess();
    const newRecord: AeSaeRecord = {
      id: isSae ? `SAE-2026-${Math.floor(100 + Math.random() * 900)}` : `AE-2026-${Math.floor(100 + Math.random() * 900)}`,
      subjectId,
      siteId,
      eventType: isSae ? 'Serious Adverse Event (SAE)' : 'Adverse Event (AE)',
      term: term.trim(),
      meddraSoc,
      meddraPt,
      severity,
      onsetDate: new Date().toISOString(),
      dateReported: new Date().toISOString().split('T')[0],
      isSae,
      saeCriteria: isSae ? saeCriteria : undefined,
      reportedToIecWithin24h: true,
      reportedToCdscoWithin24h: isSae,
      hoursElapsedSinceOnset: 0,
      regulatoryClockHoursLeft: isSae ? 24 : 0,
      whoUmcCausality,
      naranjoScore,
      concomitantMedicationWhodrug: concomitantMeds || 'None reported',
      dsmbReviewStatus: isSae ? 'Pending Review' : 'Signal Evaluated - No Action',
      outcome: 'Recovering'
    };

    onSubmitAeSae(newRecord);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={22} style={{ color: isSae ? '#dc2626' : '#d97706' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>
              NPvCC Adverse Event & Safety Reporting Form
            </h3>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SAE Toggle Box */}
          <div style={{
            background: isSae ? '#fff1f2' : '#f8faf8',
            border: isSae ? '1px solid #fecdd3' : '1px solid #e2ece4',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isSae ? '#991b1b' : '#0f172a' }}>
                Is this a Serious Adverse Event (SAE)?
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Triggers mandatory 24-hr regulatory reporting clock to CDSCO & Institutional Ethics Committee.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsSae(false);
                }}
                style={{
                  background: !isSae ? '#ecfdf5' : '#ffffff',
                  border: !isSae ? '1px solid #a7f3d0' : '1px solid #e2ece4',
                  color: !isSae ? '#047857' : '#64748b',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                No (Standard AE)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playAlert();
                  setIsSae(true);
                }}
                style={{
                  background: isSae ? '#ef4444' : '#ffffff',
                  border: isSae ? '1px solid #dc2626' : '1px solid #e2ece4',
                  color: isSae ? '#ffffff' : '#64748b',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                Yes (SAE Urgent)
              </button>
            </div>
          </div>

          {/* Row 1: Subject ID & Site */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                Subject ID
              </label>
              <input
                type="text"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                Reporting Site
              </label>
              <select
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                {sites.map(s => (
                  <option key={s.siteId} value={s.siteId}>
                    {s.siteId} - {s.siteName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Term & Severity */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                Adverse Reaction Term (Verbatim Clinical Text)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. Acute gastric burning after ingestion, urticaria, dizziness..."
                required
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Life-Threatening">Life-Threatening</option>
              </select>
            </div>
          </div>

          {/* If SAE: Show SAE Criteria */}
          {isSae && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#b91c1c', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                SAE Qualification Criteria
              </label>
              <select
                value={saeCriteria}
                onChange={(e) => setSaeCriteria(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#fff1f2',
                  border: '1px solid #fecdd3',
                  borderRadius: '8px',
                  color: '#991b1b',
                  fontWeight: 600,
                  padding: '9px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <option value="Hospitalization">In-patient Hospitalization or Prolongation</option>
                <option value="Life Threatening">Immediate Life Threatening Threat</option>
                <option value="Disability">Persistent or Significant Disability/Incapacity</option>
                <option value="Congenital Anomaly">Congenital Anomaly / Birth Defect</option>
                <option value="Death">Death</option>
              </select>
            </div>
          )}

          {/* MedDRA SOC & PT Coding */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                MedDRA 27.0 System Organ Class (SOC)
              </label>
              <select
                value={meddraSoc}
                onChange={(e) => setMeddraSoc(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <option value="Gastrointestinal disorders">Gastrointestinal disorders</option>
                <option value="Infections and infestations">Infections and infestations</option>
                <option value="Hepatobiliary disorders">Hepatobiliary disorders</option>
                <option value="Skin and subcutaneous tissue disorders">Skin and subcutaneous tissue disorders</option>
                <option value="Nervous system disorders">Nervous system disorders</option>
                <option value="General disorders and administration site conditions">General disorders</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                MedDRA Preferred Term (PT)
              </label>
              <input
                type="text"
                value={meddraPt}
                onChange={(e) => setMeddraPt(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>

          {/* WHO-UMC Causality & Naranjo Algorithm */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                ASU WHO-UMC Causality Assessment
              </label>
              <select
                value={whoUmcCausality}
                onChange={(e) => setWhoUmcCausality(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <option value="Certain">Certain (Re-challenge positive, plausible time)</option>
                <option value="Probable">Probable (Reasonable time relationship, unlikely other causes)</option>
                <option value="Possible">Possible (Reasonable time, but could be explained by concurrent disease)</option>
                <option value="Unlikely">Unlikely (Improbable temporal relationship)</option>
                <option value="Conditional">Conditional / Unclassified</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>
                Naranjo Probability Algorithm Score (0-13)
              </label>
              <input
                type="number"
                min="0"
                max="13"
                value={naranjoScore}
                onChange={(e) => setNaranjoScore(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2ece4',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '9px 12px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>

          {/* Regulatory Warning Banner */}
          {isSae && (
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.75rem',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500
            }}>
              <Clock size={16} style={{ color: '#dc2626' }} />
              <span>Mandatory compliance: Upon submission, a 24-hr countdown will initiate for Form 11 expedited notification to CDSCO and IEC.</span>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={isSae ? 'btn-primary' : 'btn-gold'}
              style={{
                fontSize: '0.82rem',
                padding: '8px 20px',
                background: isSae ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' : undefined
              }}
            >
              {isSae ? 'Transmit SAE & Start 24h Clock' : 'Log Adverse Event Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
