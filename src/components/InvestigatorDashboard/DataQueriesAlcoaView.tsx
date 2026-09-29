import React, { useState } from 'react';
import { 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  FileCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { ClinicalStudy, DataQuery } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface DataQueriesAlcoaViewProps {
  study: ClinicalStudy;
  onUpdateQueries: (updatedQueries: DataQuery[]) => void;
}

export const DataQueriesAlcoaView: React.FC<DataQueriesAlcoaViewProps> = ({
  study,
  onUpdateQueries
}) => {
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendResponse = (queryId: string) => {
    const text = replyTextMap[queryId];
    if (!text || !text.trim()) return;

    soundManager.playSuccess();
    const updated = study.dataQueries.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          status: 'Answered' as const,
          responseHistory: [
            ...(q.responseHistory || []),
            {
              respondedBy: 'Investigator / Coordinator Response',
              date: new Date().toISOString().split('T')[0],
              text: text.trim()
            }
          ]
        };
      }
      return q;
    });

    onUpdateQueries(updated);
    setReplyTextMap(prev => ({ ...prev, [queryId]: '' }));
    setActiveReplyId(null);
  };

  const handleCloseQuery = (queryId: string) => {
    soundManager.playSuccess();
    const updated = study.dataQueries.map(q => {
      if (q.id === queryId) {
        return { ...q, status: 'Closed' as const };
      }
      return q;
    });
    onUpdateQueries(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: ALCOA+ Clinical Data Integrity Index */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={22} style={{ color: '#047857' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
                ALCOA+ Data Integrity & Quality Index
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
              Strict adherence to GCP-ASU & 21 CFR Part 11: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="glass-pill" style={{ fontSize: '0.9rem', padding: '6px 16px' }}>
              Composite Quality: <strong style={{ color: '#047857' }}>{study.alcoaScore.overall}%</strong>
            </span>
          </div>
        </div>

        {/* 9 Dimensions Breakdown Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px'
        }}>
          {[
            { label: 'Attributable', score: study.alcoaScore.attributable, desc: 'Verified user ID & role signature' },
            { label: 'Legible', score: study.alcoaScore.legible, desc: 'Readable eCRF audit records' },
            { label: 'Contemporaneous', score: study.alcoaScore.contemporaneous, desc: 'Timestamped at event occurrence' },
            { label: 'Original', score: study.alcoaScore.original, desc: 'Primary source documentation linked' },
            { label: 'Accurate', score: study.alcoaScore.accurate, desc: 'Zero unverified data overrides' },
            { label: 'Complete', score: study.alcoaScore.complete, desc: 'No missing mandatory CDASH fields' },
            { label: 'Consistent', score: study.alcoaScore.consistent, desc: 'Cross-form visit chronological flow' },
            { label: 'Enduring', score: study.alcoaScore.enduring, desc: 'WORM immutable cloud repository' },
            { label: 'Available', score: study.alcoaScore.available, desc: 'Instant regulatory inspector export' },
          ].map((dim, idx) => (
            <div key={idx} style={{
              background: '#f8faf8',
              border: '1px solid #e2ece4',
              borderRadius: '10px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>{dim.label}</span>
                <span style={{ color: '#047857', fontWeight: 800 }}>{dim.score}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: '#e2ece4', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${dim.score}%`, height: '100%', background: '#059669' }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '8px' }}>
                {dim.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDC Data Queries Management Ledger */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={20} style={{ color: '#0284c7' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
                EDC Data Queries & Query Aging Tracker
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
              Monitor and resolve automated CDASH validation discrepancies and clinical data monitor queries.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="glass-pill" style={{ fontSize: '0.76rem' }}>
              Avg Resolution: 2.1 Days
            </span>
          </div>
        </div>

        {/* Queries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {study.dataQueries.map(q => {
            const isOpen = q.status === 'Open';
            const isAnswered = q.status === 'Answered';
            return (
              <div
                key={q.id}
                style={{
                  background: '#ffffff',
                  border: isOpen ? '1px solid #bae6fd' : '1px solid #e2ece4',
                  borderRadius: '14px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: isOpen ? '#f0f9ff' : isAnswered ? '#fffbeb' : '#ecfdf5',
                      color: isOpen ? '#0284c7' : isAnswered ? '#b45309' : '#047857',
                      border: `1px solid ${isOpen ? '#bae6fd' : isAnswered ? '#fde68a' : '#a7f3d0'}`
                    }}>
                      {q.status}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                      {q.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Subject: <strong style={{ color: '#047857' }}>{q.subjectId}</strong> ({q.siteId})
                    </span>
                    <span style={{ fontSize: '0.76rem', color: '#475569' }}>
                      Form: <strong>{q.formName}</strong> [{q.fieldName}]
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.76rem' }}>
                    <span style={{ color: '#64748b' }}>Raised: {q.dateRaised}</span>
                    <span style={{ color: q.agingDays > 5 ? '#dc2626' : '#b45309', fontWeight: 700 }}>
                      Aging: {q.agingDays} days
                    </span>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.88rem',
                  color: '#334155',
                  marginBottom: '14px',
                  lineHeight: 1.55,
                  background: '#f8faf8',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #e2ece4'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                    Raised by: {q.raisedBy}
                  </div>
                  {q.queryText}
                </div>

                {/* Response History */}
                {q.responseHistory && q.responseHistory.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', paddingLeft: '16px', borderLeft: '3px solid #047857' }}>
                    {q.responseHistory.map((resp, rIdx) => (
                      <div key={rIdx} style={{ fontSize: '0.82rem', color: '#065f46' }}>
                        <span style={{ fontWeight: 700 }}>{resp.respondedBy} ({resp.date}): </span>
                        {resp.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  {activeReplyId === q.id ? (
                    <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter investigator clarification or amendment rationale..."
                        value={replyTextMap[q.id] || ''}
                        onChange={(e) => setReplyTextMap(prev => ({ ...prev, [q.id]: e.target.value }))}
                        className="clean-input"
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={() => handleSendResponse(q.id)}
                        className="btn-primary"
                        style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                      >
                        <Send size={13} /> Submit Response
                      </button>
                      <button
                        onClick={() => setActiveReplyId(null)}
                        className="btn-secondary"
                        style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {q.status !== 'Closed' && (
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActiveReplyId(q.id);
                          }}
                          className="btn-secondary"
                          style={{ fontSize: '0.78rem', padding: '7px 14px' }}
                        >
                          <MessageSquare size={14} /> Respond to Query
                        </button>
                      )}
                      {q.status === 'Answered' && (
                        <button
                          onClick={() => handleCloseQuery(q.id)}
                          className="btn-primary"
                          style={{ fontSize: '0.78rem', padding: '7px 14px' }}
                        >
                          <CheckCircle2 size={14} /> Verify & Close Query
                        </button>
                      )}
                    </div>
                  )}

                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    CDASH eCRF Domain: TS / DM / LB
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
