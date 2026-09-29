import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Video, 
  Lock, 
  Download, 
  ExternalLink, 
  Calendar,
  FileCheck2,
  FileCode,
  Search,
  Eye,
  History,
  AlertCircle,
  FileQuestion
} from 'lucide-react';
import { ClinicalStudy, InformedConsentRecord, ProtocolDeviation, SystemAlert } from '../../types/clinical';
import { MOCK_CONSENT_RECORDS } from '../../data/mockStudies';
import { soundManager } from '../../utils/audioFeedback';

interface EthicsDashboardProps {
  studies: ClinicalStudy[];
  currentStudy: ClinicalStudy;
  onSelectStudy: (studyId: string) => void;
  onOpenAuditTrail: () => void;
  alerts: SystemAlert[];
}

export const EthicsDashboard: React.FC<EthicsDashboardProps> = ({
  studies,
  currentStudy,
  onSelectStudy,
  onOpenAuditTrail,
  alerts
}) => {
  const [activeEthicsTab, setActiveEthicsTab] = useState<'iec-status' | 'consent-mgmt' | 'deviations' | 'sae-oversight'>('iec-status');
  const [consentRecords, setConsentRecords] = useState<InformedConsentRecord[]>(MOCK_CONSENT_RECORDS);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  // Filtered consent records
  const filteredConsents = consentRecords.filter(c => {
    if (selectedLanguage !== 'All' && c.language !== selectedLanguage) return false;
    return true;
  });

  const activeSae = currentStudy.aeSaeList.find(e => e.isSae);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: IEC Authority Header - Clean Luminous Light Aesthetic */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: '#ffffff',
        borderLeft: '4px solid #047857'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="glass-pill">
                <ShieldCheck size={14} />
                INSTITUTIONAL ETHICS COMMITTEE (IEC-AIIA)
              </span>
              <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                CDSCO Registration: <strong style={{ color: '#0f172a' }}>ECR/124/Inst/DL/2013/RR-19</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '6px', fontWeight: 800 }}>
              Ethics Committee Oversight & Human Subject Protection
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#475569', maxWidth: '850px', lineHeight: 1.6 }}>
              Guiding ethical integrity across all Ayurvedic clinical trials per <strong>ICMR National Ethical Guidelines (2017/2024)</strong>, 
              <strong>GCP-ASU</strong>, and the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                soundManager.playSuccess();
                alert(`Exporting Ethics Committee Consolidated Clearance Dossier for ${currentStudy.protocolNumber}. Contains signed approval certificates, SAE expedited logs, and DPDP consent validation audit.`);
              }}
              className="btn-primary"
              style={{ fontSize: '0.84rem', padding: '9px 18px' }}
            >
              <Download size={14} /> Export IEC Clearance Dossier
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '22px',
          paddingTop: '20px',
          borderTop: '1px solid #f1f5f1'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Current IEC Status</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>✓ Approved & Active</div>
            <div style={{ fontSize: '0.72rem', color: '#475569' }}>Ref: {currentStudy.iecRegistrationNumber.split(' ')[0]}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Annual Renewal Horizon</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b45309' }}>{currentStudy.iecDaysUntilRenewal} Days</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Due Date: {currentStudy.iecAnnualRenewalDue}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>DPDP Informed Consents</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>
              {consentRecords.filter(c => c.dpdpConsentGranted).length} Validated
            </div>
            <div style={{ fontSize: '0.72rem', color: '#047857' }}>1 Withdrawn • Vaulted</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Expedited SAEs Reviewed</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: activeSae ? '#dc2626' : '#047857' }}>
              {activeSae ? '1 Urgent (24h Clock)' : '0 Pending'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#475569' }}>Form 11 Regulatory Compliance</div>
          </div>
        </div>
      </div>

      {/* IEC Module Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '6px',
        background: '#f1f5f2',
        border: '1px solid #e2ece4',
        borderRadius: '12px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'iec-status', label: 'IEC Approvals & Regulatory Milestones', icon: <FileCheck2 size={15} /> },
          { id: 'consent-mgmt', label: 'Informed-Consent Management (DPDP 2023)', icon: <Lock size={15} /> },
          { id: 'deviations', label: 'Protocol Deviations & CAPA (7-Day Rule)', icon: <AlertTriangle size={15} /> },
          { id: 'sae-oversight', label: 'Urgent AE/SAE & Compensation Oversight', icon: <Clock size={15} /> }
        ].map(tab => {
          const isActive = activeEthicsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveEthicsTab(tab.id as any);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '8px',
                border: isActive ? '1px solid #a7f3d0' : '1px solid transparent',
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#047857' : '#475569',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 2px 8px rgba(4, 120, 87, 0.08)' : 'none'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: IEC Approvals & Milestones --- */}
      {activeEthicsTab === 'iec-status' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
                  Institutional Ethics Committee Clearances & Statutory Registry
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Full Committee Review dossier tracking conforming to ICMR Ethical Guidelines and GCP-ASU.
                </p>
              </div>
              <span className="glass-pill">
                Meeting Quorum: 11/11 Members Present
              </span>
            </div>

            {/* Approval Table */}
            <div style={{ overflowX: 'auto', marginBottom: '22px', border: '1px solid #e2ece4', borderRadius: '12px' }}>
              <table className="clean-table">
                <thead>
                  <tr>
                    <th>Protocol ID</th>
                    <th>Study Title</th>
                    <th>IEC Clearance Ref</th>
                    <th>Approval Date</th>
                    <th>Annual Renewal Due</th>
                    <th>Risk Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studies.map((st) => (
                    <tr key={st.id} style={{
                      background: st.id === currentStudy.id ? '#f4fbf6' : 'transparent'
                    }}>
                      <td style={{ color: '#047857', fontWeight: 700 }}>
                        {st.id}
                      </td>
                      <td style={{ color: '#0f172a', maxWidth: '320px', lineHeight: 1.4, fontWeight: 600 }}>
                        {st.shortTitle}
                      </td>
                      <td style={{ color: '#475569', fontFamily: 'var(--font-mono)' }}>
                        {st.iecRegistrationNumber.split(' ')[0]}
                      </td>
                      <td style={{ color: '#475569' }}>
                        {st.iecApprovalDate}
                      </td>
                      <td>
                        <span style={{ color: '#b45309', fontWeight: 700 }}>
                          {st.iecAnnualRenewalDue} ({st.iecDaysUntilRenewal}d)
                        </span>
                      </td>
                      <td>
                        <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>
                          Moderate Risk (ASU)
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            onSelectStudy(st.id);
                          }}
                          style={{
                            background: st.id === currentStudy.id ? '#ecfdf5' : '#ffffff',
                            border: `1px solid ${st.id === currentStudy.id ? '#a7f3d0' : '#cbd5cb'}`,
                            borderRadius: '6px',
                            color: st.id === currentStudy.id ? '#047857' : '#475569',
                            padding: '4px 12px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {st.id === currentStudy.id ? 'Active Focus' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ICMR Ethics Committee Composition Check */}
            <div style={{
              background: '#f8faf8',
              border: '1px solid #e2ece4',
              borderRadius: '12px',
              padding: '18px'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Institutional Ethics Committee Mandated Composition (Per ICMR 2017 & NDCT 2019)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '0.8rem' }}>
                <div style={{ color: '#334155' }}>• <strong>Chairperson</strong>: Prof. Dr. K. V. Raghuram (External)</div>
                <div style={{ color: '#334155' }}>• <strong>Member Secretary</strong>: Dr. R. K. Yadav (Pharmacologist)</div>
                <div style={{ color: '#334155' }}>• <strong>Legal Expert</strong>: Adv. Sunita Mathur (High Court)</div>
                <div style={{ color: '#334155' }}>• <strong>Lay Person</strong>: Smt. Gayatri Devi (Community Rep)</div>
                <div style={{ color: '#334155' }}>• <strong>Social Scientist / Ethicist</strong>: Dr. Manju Rao</div>
                <div style={{ color: '#334155' }}>• <strong>Ayurveda Expert</strong>: Prof. Dr. A. K. Tripathi</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: Informed-Consent Management (DPDP 2023) --- */}
      {activeEthicsTab === 'consent-mgmt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
                  Informed-Consent Governance & DPDP Act 2023 Compliance Vault
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Tracking audio-visual (AV) recordings, multilingual translations, vulnerable subject assent, and consent withdrawals.
                </p>
              </div>

              {/* Language filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Filter Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="clean-input"
                  style={{ width: 'auto', padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  <option value="All">All Languages</option>
                  <option value="Hindi">Hindi (Official)</option>
                  <option value="English">English</option>
                  <option value="Gujarati">Gujarati</option>
                </select>
              </div>
            </div>

            {/* Consents Ledger */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredConsents.map(consent => {
                const isWithdrawn = consent.withdrawalStatus === 'Withdrawn';
                return (
                  <div
                    key={consent.id}
                    style={{
                      background: isWithdrawn ? '#fef8f8' : '#ffffff',
                      border: isWithdrawn ? '1px solid #fecaca' : '1px solid #e2ece4',
                      borderRadius: '12px',
                      padding: '18px',
                      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isWithdrawn ? '#fee2e2' : '#ecfdf5',
                          color: isWithdrawn ? '#dc2626' : '#047857',
                          border: `1px solid ${isWithdrawn ? '#fecaca' : '#a7f3d0'}`
                        }}>
                          {consent.withdrawalStatus === 'Active' ? '✓ Active Consent' : '⚠️ Consent Withdrawn'}
                        </span>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                          Subject: {consent.subjectId} ({consent.siteId})
                        </span>
                        <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                          {consent.version}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: '#b45309', fontWeight: 600 }}>
                          Language: {consent.language}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        Consent Date: <strong>{consent.consentDate}</strong>
                        {consent.withdrawalDate && (
                          <span style={{ color: '#dc2626', marginLeft: '8px', fontWeight: 700 }}>
                            (Withdrawn on {consent.withdrawalDate})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Safeguards Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '10px',
                      fontSize: '0.78rem',
                      background: '#f8faf8',
                      border: '1px solid #e2ece4',
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: consent.avRecordingDone ? '#047857' : '#64748b' }}>
                        <Video size={14} />
                        <span>AV Recording: <strong>{consent.avRecordingDone ? 'Archived in WORM Vault' : 'Exempt / Waived'}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: consent.impartialWitnessPresent ? '#0284c7' : '#64748b' }}>
                        <Users size={14} />
                        <span>Impartial Witness: <strong>{consent.impartialWitnessPresent ? 'Yes (Signatures Verified)' : 'Not Required'}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: consent.isVulnerablePopulation ? '#b45309' : '#047857' }}>
                        <AlertCircle size={14} />
                        <span>Vulnerable Subject: <strong>{consent.isVulnerablePopulation ? 'Yes (Additional Safeguards)' : 'No'}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857' }}>
                        <Lock size={14} />
                        <span>DPDP Act 2023 Notice: <strong>Verified & Signed</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: Protocol Deviations (7-Day Rule) --- */}
      {activeEthicsTab === 'deviations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
                  Ethics Committee Protocol Deviation & CAPA Oversight
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Statutory enforcement of GCP-ASU clause: Major protocol deviations must be reported to the IEC within 7 working days.
                </p>
              </div>
              <span className="glass-pill" style={{ color: '#047857' }}>
                ✓ 100% 7-Day Timeliness Compliance
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentStudy.protocolDeviations.map(dev => (
                <div
                  key={dev.id}
                  style={{
                    background: '#ffffff',
                    border: dev.deviationType === 'Major' ? '1px solid #fecaca' : '1px solid #fde68a',
                    borderRadius: '12px',
                    padding: '18px',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={dev.deviationType === 'Major' ? 'badge-crimson' : 'badge-gold'}>
                        {dev.deviationType}
                      </span>
                      <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{dev.id}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Subject: <strong>{dev.subjectId}</strong> ({dev.siteId})
                      </span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: '#047857', fontWeight: 700 }}>
                      ✓ Reported to IEC within 7 Days ({dev.iecReportedDate || 'On-time'})
                    </div>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '14px', lineHeight: 1.5 }}>
                    {dev.description}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '12px',
                    fontSize: '0.78rem',
                    background: '#f8faf8',
                    border: '1px solid #e2ece4',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <span style={{ color: '#b45309', fontWeight: 700 }}>RCA: </span>
                      <span style={{ color: '#475569' }}>{dev.rootCause}</span>
                    </div>
                    <div>
                      <span style={{ color: '#047857', fontWeight: 700 }}>CAPA: </span>
                      <span style={{ color: '#475569' }}>{dev.preventiveAction}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      IEC Committee Review Status: <strong style={{ color: '#047857' }}>{dev.status}</strong>
                    </span>

                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        alert(`IEC formal closure note stamped for ${dev.id}. Document archived with SHA-256 seal.`);
                      }}
                      className="btn-primary"
                      style={{ fontSize: '0.76rem', padding: '6px 14px' }}
                    >
                      IEC Endorse CAPA Closure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: Urgent AE/SAE Oversight --- */}
      {activeEthicsTab === 'sae-oversight' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
                  Institutional Ethics Committee Urgent SAE & Compensation Oversight
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Mandatory 24-hr expedited SAE transmission review and 30-day compensation liability assessment per NDCT Rules 2019.
                </p>
              </div>
              <span className="badge-crimson">
                <Clock size={14} /> 24h Regulatory Protocol
              </span>
            </div>

            {currentStudy.aeSaeList.filter(e => e.isSae).map(sae => (
              <div
                key={sae.id}
                style={{
                  background: '#fef8f8',
                  border: '1px solid #fecaca',
                  borderRadius: '14px',
                  padding: '22px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span className="badge-crimson">{sae.id}</span>
                      <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800 }}>{sae.term}</h4>
                      <span className="glass-pill" style={{ fontSize: '0.72rem' }}>Criteria: {sae.saeCriteria}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                      Subject: <strong style={{ color: '#0f172a' }}>{sae.subjectId}</strong> ({sae.siteId}) • Onset: {sae.onsetDate}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700 }}>STATUTORY 24H TRANSMISSION</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#047857' }}>✓ Transmitted within 24h</div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  background: '#ffffff',
                  border: '1px solid #fecaca',
                  padding: '16px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  marginBottom: '18px'
                }}>
                  <div>
                    <div style={{ color: '#64748b' }}>Investigator Causality Assessment:</div>
                    <div style={{ color: '#b45309', fontWeight: 700 }}>WHO-UMC: {sae.whoUmcCausality} (Naranjo: {sae.naranjoScore})</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b' }}>MedDRA System Organ Class:</div>
                    <div style={{ color: '#0f172a', fontWeight: 600 }}>{sae.meddraSoc} [{sae.meddraPt}]</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b' }}>Medical Management & Compensation:</div>
                    <div style={{ color: '#047857', fontWeight: 700 }}>Hospitalization coverage provided per NDCT</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={() => {
                      soundManager.playSuccess();
                      alert(`IEC Committee Opinion recorded: No study-halting signal. Continued multi-centre safety observation advised.`);
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.82rem', padding: '8px 18px' }}
                  >
                    Record IEC Expedited Safety Opinion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
