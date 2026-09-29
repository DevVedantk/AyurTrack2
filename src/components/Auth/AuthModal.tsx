import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Lock, 
  Mail, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  UserPlus, 
  LogIn,
  Sparkles,
  Stethoscope,
  Activity,
  HeartPulse,
  Crown,
  Leaf
} from 'lucide-react';
import { UserAccount, UserRole } from '../../types/clinical';
import { DEFAULT_USERS } from '../../data/mockStudies';
import { soundManager } from '../../utils/audioFeedback';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (user: UserAccount, targetDashboard: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In State
  const [email, setEmail] = useState('rajesh.sharma@aiia.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  
  // Sign Up State
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('Principal Investigator');
  const [department, setDepartment] = useState('Kayachikitsa');
  const [institution, setInstitution] = useState('All India Institute of Ayurveda, New Delhi');

  if (!isOpen) return null;

  const handleRoleQuickLogin = (user: UserAccount) => {
    soundManager.playSuccess();
    let target = 'investigator';
    if (user.role === 'Institutional Ethics Committee') {
      target = 'ethics';
    } else if (user.role === 'Pharmacovigilance (NPvCC / DSMB)') {
      target = 'pv';
    } else if (user.role === 'Institutional Leadership (Director / Dean)') {
      target = 'leadership';
    } else {
      target = 'investigator';
    }

    onAuthenticate(user, target);
    onClose();
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    // Match with demo user or fallback
    const matchedUser = DEFAULT_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || DEFAULT_USERS[0];
    let target = 'investigator';
    if (matchedUser.role === 'Institutional Ethics Committee') {
      target = 'ethics';
    } else if (matchedUser.role === 'Pharmacovigilance (NPvCC / DSMB)') {
      target = 'pv';
    } else if (matchedUser.role === 'Institutional Leadership (Director / Dean)') {
      target = 'leadership';
    }
    onAuthenticate(matchedUser, target);
    onClose();
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signupEmail.trim()) {
      alert('Please fill in your name and email address.');
      return;
    }
    soundManager.playSuccess();
    const newUser: UserAccount = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      title: `${signupRole} • ${department}`,
      email: signupEmail.trim(),
      role: signupRole,
      department: department.trim() || 'Ayurveda Research Faculty',
      institution: institution.trim() || 'All India Institute of Ayurveda',
      avatarInitials: name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    };

    let target = 'investigator';
    if (signupRole === 'Institutional Ethics Committee') {
      target = 'ethics';
    } else if (signupRole === 'Pharmacovigilance (NPvCC / DSMB)') {
      target = 'pv';
    } else if (signupRole === 'Institutional Leadership (Director / Dean)') {
      target = 'leadership';
    }

    onAuthenticate(newUser, target);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '800px',
          background: '#ffffff',
          border: '1px solid #e2ece4',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.15)'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              <Leaf size={22} strokeWidth={1.8} color="#477460" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800 }}>
                AyurTrack CTMS Access Portal
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                All India Institute of Ayurveda • Role-Based Authentication & Gateway
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '6px',
              padding: '6px',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Role-Login Selector */}
        <div style={{
          background: '#f8faf8',
          border: '1px solid #e2ece4',
          borderRadius: '14px',
          padding: '18px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            fontSize: '0.76rem',
            color: '#047857',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} style={{ color: '#b45309' }} />
              Quick One-Click Demo Role Login (Instant Dashboard Routing)
            </span>
            <span style={{ color: '#64748b', fontSize: '0.72rem' }}>Select Role:</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px'
          }}>
            {DEFAULT_USERS.map(user => {
              let badgeColor = '#047857';
              let badgeBg = '#ecfdf5';
              let badgeBorder = '#a7f3d0';
              let roleIcon = <Activity size={15} />;
              let destLabel = 'Investigator Dashboard';
              
              if (user.role === 'Institutional Ethics Committee') {
                badgeColor = '#0284c7';
                badgeBg = '#f0f9ff';
                badgeBorder = '#bae6fd';
                roleIcon = <ShieldCheck size={15} />;
                destLabel = 'Ethics Committee Dashboard';
              } else if (user.role === 'Pharmacovigilance (NPvCC / DSMB)') {
                badgeColor = '#dc2626';
                badgeBg = '#fef2f2';
                badgeBorder = '#fecaca';
                roleIcon = <HeartPulse size={15} />;
                destLabel = 'NPvCC Safety Dashboard';
              } else if (user.role === 'Institutional Leadership (Director / Dean)') {
                badgeColor = '#b45309';
                badgeBg = '#fffbeb';
                badgeBorder = '#fde68a';
                roleIcon = <Crown size={15} />;
                destLabel = 'Leadership Dashboard';
              }

              return (
                <button
                  key={user.id}
                  onClick={() => handleRoleQuickLogin(user)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2ece4',
                    borderRadius: '12px',
                    padding: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '6px',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = badgeBorder;
                    e.currentTarget.style.background = badgeBg;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2ece4';
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.02)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: badgeBg,
                        border: `1px solid ${badgeBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: badgeColor
                      }}>
                        {user.avatarInitials}
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                        {user.name}
                      </span>
                    </div>
                    <span style={{ color: badgeColor }}>{roleIcon}</span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {user.title.split('•')[0]}
                  </div>

                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px'
                  }}>
                    <span>→ Access {destLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #e2ece4',
          marginBottom: '20px',
          paddingBottom: '8px'
        }}>
          <button
            onClick={() => {
              soundManager.playClick();
              setTab('signin');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: tab === 'signin' ? '#ecfdf5' : 'transparent',
              border: tab === 'signin' ? '1px solid #a7f3d0' : '1px solid transparent',
              color: tab === 'signin' ? '#047857' : '#64748b',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <LogIn size={15} /> Sign In
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setTab('signup');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: tab === 'signup' ? '#ecfdf5' : 'transparent',
              border: tab === 'signup' ? '1px solid #a7f3d0' : '1px solid transparent',
              color: tab === 'signup' ? '#047857' : '#64748b',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <UserPlus size={15} /> Register New Account
          </button>
        </div>

        {/* Tab 1: Sign In Form */}
        {tab === 'signin' && (
          <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                Institutional Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rajesh.sharma@aiia.gov.in"
                  required
                  className="clean-input"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                Password (21 CFR Part 11 Authenticated)
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your clinical password"
                  required
                  className="clean-input"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '0.76rem', color: '#047857', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <ShieldCheck size={16} /> CERT-In Cloud MFA Protected
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.88rem' }}
              >
                Sign In to Respective Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Sign Up Form with Role Assignment */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Full Name & Designation
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Harish Chandra, MD"
                  required
                  className="clean-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Select Institutional Role
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="clean-input"
                  style={{ fontWeight: 700, color: '#047857' }}
                >
                  <option value="Principal Investigator">Principal Investigator (PI Dashboard)</option>
                  <option value="Study Coordinator">Study Coordinator (PI/SC Dashboard)</option>
                  <option value="Institutional Ethics Committee">Institutional Ethics Committee (IEC Dashboard)</option>
                  <option value="Pharmacovigilance (NPvCC / DSMB)">Pharmacovigilance (NPvCC / DSMB Dashboard)</option>
                  <option value="Institutional Leadership (Director / Dean)">Institutional Leadership (Director Dashboard)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Institutional Email (.gov.in or .ac.in)
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@aiia.gov.in"
                  required
                  className="clean-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Password
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create secure password"
                  required
                  className="clean-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Department / Unit
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Kayachikitsa, Dravyaguna, Shalya"
                  className="clean-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Affiliated Institution
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="All India Institute of Ayurveda"
                  className="clean-input"
                />
              </div>
            </div>

            {/* DPDP Act 2023 Consent Checkbox */}
            <div style={{
              background: '#f8faf8',
              border: '1px solid #e2ece4',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '0.76rem',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={18} style={{ color: '#047857' }} />
              <span>DPDP Act 2023 Notice: Clinical trial data access is governed by strict role-based access control and immutable ALCOA+ audit trails.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.88rem' }}
              >
                Create Account & Launch Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
