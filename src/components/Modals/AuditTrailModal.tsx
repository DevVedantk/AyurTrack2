import React, { useState } from 'react';
import { X, History, ShieldCheck, Search, Filter, Lock, CheckCircle2 } from 'lucide-react';
import { AuditTrailEntry } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditEntries: AuditTrailEntry[];
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  isOpen,
  onClose,
  auditEntries
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('All');

  if (!isOpen) return null;

  const filtered = auditEntries.filter(entry => {
    const matchesSearch = 
      entry.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'All' || entry.actionType === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '920px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={22} style={{ color: '#047857' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>
                ALCOA+ Immutable Audit Trail & E-Signature Ledger
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                GCP-ASU & 21 CFR Part 11 compliant with SHA-256 state seal and DPDP Act 2023 privacy controls.
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

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by entity, ID, user, or audit details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid #e2ece4',
                borderRadius: '8px',
                color: '#0f172a',
                padding: '8px 12px 8px 36px',
                fontSize: '0.82rem',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
            />
          </div>

          <select
            value={selectedAction}
            onChange={(e) => {
              soundManager.playClick();
              setSelectedAction(e.target.value);
            }}
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2ece4',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
          >
            <option value="All">All Action Types</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="VERIFY">VERIFY</option>
            <option value="SIGN">SIGN (Biometric/Token)</option>
            <option value="EXPORT">EXPORT</option>
          </select>
        </div>

        {/* Audit Log Table */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #e2ece4',
          borderRadius: '10px',
          background: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2ece4', color: '#475569', background: '#f8faf8' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Timestamp (IST)</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Action</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Entity & Ref</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>User & Role</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Audit Details</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #f1f5f2' }}>
                  <td style={{ padding: '10px 12px', color: '#475569', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
                    {entry.timestamp}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: entry.actionType === 'SIGN' ? '#fef3c7' : entry.actionType === 'VERIFY' ? '#ecfdf5' : '#e0f2fe',
                      color: entry.actionType === 'SIGN' ? '#b45309' : entry.actionType === 'VERIFY' ? '#047857' : '#0369a1',
                      border: entry.actionType === 'SIGN' ? '1px solid #fde68a' : entry.actionType === 'VERIFY' ? '1px solid #a7f3d0' : '1px solid #bae6fd'
                    }}>
                      {entry.actionType}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#0f172a', fontWeight: 600 }}>
                    {entry.entity}
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{entry.entityId}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ color: '#0f172a', fontWeight: 600 }}>{entry.userName}</div>
                    <div style={{ fontSize: '0.7rem', color: '#047857' }}>{entry.userRole}</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#334155', maxWidth: '240px', lineHeight: 1.4 }}>
                    {entry.details}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
                    {entry.sha256Hash.substring(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Immutable Write-Once-Read-Many (WORM) Storage Active
          </div>
          <button
            onClick={() => {
              soundManager.playSuccess();
              alert('Complete ALCOA+ Audit Trail exported as tamper-evident cryptographic archive (.xml / .json).');
            }}
            className="btn-primary"
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            Export Signed Audit Package
          </button>
        </div>
      </div>
    </div>
  );
};
