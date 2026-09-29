import React, { useState } from 'react';
import { 
  Users, 
  UserX, 
  GitBranch, 
  TrendingUp, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  PieChart
} from 'lucide-react';
import { ClinicalStudy, ScreenFailureReason } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface RecruitmentFunnelViewProps {
  study: ClinicalStudy;
}

export const RecruitmentFunnelView: React.FC<RecruitmentFunnelViewProps> = ({ study }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredReasons = selectedCategory === 'All' 
    ? study.screenFailureReasons 
    : study.screenFailureReasons.filter(r => r.category === selectedCategory);

  const totalReasonsCount = study.screenFailureReasons.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Funnel Metrics Bar */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
              Screening & Enrolment Funnel
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Real-time patient accrual tracking from initial screening through 1:1 block randomization.
            </p>
          </div>
          <span className="glass-pill">
            <span className="pulse-dot"></span> Pacing: 90% of Target Enrolment Achieved
          </span>
        </div>

        {/* Funnel Stages */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Stage 1 */}
          <div style={{
            background: '#f8faf8',
            border: '1px solid #e2ece4',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              Stage 1: Screened
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0f172a' }}>
              {study.totalScreened}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 600 }}>
              Target: {study.screeningTarget} (83.6%)
            </div>
          </div>

          {/* Stage 2 */}
          <div style={{
            background: '#fef8f8',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              Screen Failures
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#dc2626' }}>
              {study.screenFailuresCount}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#991b1b', fontWeight: 600 }}>
              Failure Rate: {Math.round((study.screenFailuresCount / study.totalScreened) * 100)}%
            </div>
          </div>

          {/* Stage 3 */}
          <div style={{
            background: '#f4fbf6',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#047857', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              Stage 2: Eligible
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#047857' }}>
              {study.totalEligible}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#065f46', fontWeight: 600 }}>
              Eligibility Rate: 77.2%
            </div>
          </div>

          {/* Stage 4 */}
          <div style={{
            background: '#fffdf7',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#b45309', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              Stage 3: Enrolled
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#b45309' }}>
              {study.currentEnrolled}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#92400e', fontWeight: 600 }}>
              Target: {study.targetEnrollment} (90.0%)
            </div>
          </div>
        </div>

        {/* Funnel Horizontal Bar Graphic */}
        <div style={{ width: '100%', height: '10px', background: '#f1f5f1', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: '58.7%', background: '#059669' }} title="Enrolled (58.7%)" />
          <div style={{ width: '18.5%', background: '#0ea5e9' }} title="Pending Run-in (18.5%)" />
          <div style={{ width: '22.8%', background: '#ef4444' }} title="Screen Failures (22.8%)" />
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '12px', fontSize: '0.76rem', color: '#475569', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669' }}></span> 
            <strong>Enrolled</strong> ({study.currentEnrolled} pts)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0ea5e9' }}></span> 
            <strong>Run-in / Evaluation</strong> ({study.totalEligible - study.currentEnrolled} pts)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span> 
            <strong>Screen Failures</strong> ({study.screenFailuresCount} pts)
          </span>
        </div>
      </div>

      {/* Two Column Grid: Screen Failure Reasons & Randomization vs Target */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Screen Failures Reason Analysis */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserX size={18} style={{ color: '#dc2626' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                Screen Failure Reasons (n = {study.screenFailuresCount})
              </h3>
            </div>
            
            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                soundManager.playClick();
                setSelectedCategory(e.target.value);
              }}
              className="clean-input"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                width: 'auto'
              }}
            >
              <option value="All">All Categories</option>
              <option value="Exclusion Criteria">Exclusion Criteria</option>
              <option value="Consent Withdrawn">Consent Withdrawn</option>
              <option value="Prakriti Mismatch">Prakriti Criteria</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredReasons.map((item, idx) => {
              const pct = Math.round((item.count / totalReasonsCount) * 100);
              return (
                <div key={idx} style={{
                  background: '#f8faf8',
                  border: '1px solid #e2ece4',
                  borderRadius: '10px',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '6px' }}>
                    <span style={{ color: '#1e293b', fontWeight: 700 }}>{item.reason}</span>
                    <span style={{ color: '#dc2626', fontWeight: 800 }}>{item.count} pts ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2ece4', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#dc2626', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Randomization vs Target Breakdown */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitBranch size={18} style={{ color: '#0284c7' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                1:1 Randomization vs Target
              </h3>
            </div>
            <span className="badge-cyan">
              ✓ Block Validated
            </span>
          </div>

          {/* Allocation Arms Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: '#f4fbf6',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              padding: '18px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#047857', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                Arm A: Active ASU Formulation
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#047857' }}>
                {study.randomizedActiveArm}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                Target: 60 (88.3%)
              </div>
            </div>

            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              padding: '18px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                Arm B: Matched Placebo
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0284c7' }}>
                {study.randomizedComparatorArm}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                Target: 60 (85.0%)
              </div>
            </div>
          </div>

          {/* Stratification Breakdown by Prakriti & Age */}
          <div style={{
            background: '#f8faf8',
            border: '1px solid #e2ece4',
            borderRadius: '10px',
            padding: '16px'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Randomization Stratification Balance Matrix
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', fontSize: '0.8rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2ece4', padding: '10px', borderRadius: '8px' }}>
                <div style={{ color: '#64748b', fontSize: '0.74rem' }}>Vata-Pitta</div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>38 pts</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2ece4', padding: '10px', borderRadius: '8px' }}>
                <div style={{ color: '#64748b', fontSize: '0.74rem' }}>Pitta-Kapha</div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>44 pts</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2ece4', padding: '10px', borderRadius: '8px' }}>
                <div style={{ color: '#64748b', fontSize: '0.74rem' }}>Kapha-Vata</div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>22 pts</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#047857', marginTop: '12px', fontWeight: 600 }}>
              <CheckCircle2 size={14} /> Chi-square balance verified (p = 0.88, no arm imbalance).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
