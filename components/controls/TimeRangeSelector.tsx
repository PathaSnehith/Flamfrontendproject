'use client';

import React, { useState, useCallback, memo } from 'react';
import { TimeRange, AGGREGATION_PERIODS } from '@/lib/types';
import { useDataContext } from '../providers/DataProvider';

function TimeRangeSelectorComponent() {
  const { timeRange, setTimeRange, aggregationPeriod, setAggregationPeriod } = useDataContext();
  const [localRange, setLocalRange] = useState<TimeRange | null>(timeRange);

  const handleApply = useCallback(() => {
    setTimeRange(localRange);
  }, [localRange, setTimeRange]);

  const handlePreset = useCallback((minutes: number) => {
    const now = Date.now();
    const range: TimeRange = {
      start: now - minutes * 60 * 1000,
      end: now,
    };
    setLocalRange(range);
    setTimeRange(range);
  }, [setTimeRange]);

  const handleClear = useCallback(() => {
    setLocalRange(null);
    setTimeRange(null);
  }, [setTimeRange]);

  return (
    <div
      className="time-range-selector"
      style={{
        padding: '24px',
        background: 'linear-gradient(145deg, rgba(14, 165, 233, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
        borderRadius: '14px',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        border: '2px solid rgba(14, 165, 233, 0.25)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '4px',
            height: '20px',
            background: 'linear-gradient(180deg, #ff6b35 0%, #0ea5e9 100%)',
            borderRadius: '3px',
            marginRight: '12px',
            boxShadow: '0 0 6px rgba(255, 107, 53, 0.5)',
          }}
        />
        <h3 style={{ 
          margin: 0, 
          fontSize: '18px', 
          fontWeight: '800', 
          background: 'linear-gradient(135deg, #ff6b35 0%, #0ea5e9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Time Range
        </h3>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Quick Presets
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            onClick={() => handlePreset(5)}
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '2px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: '#67e8f9',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Last 5 min
          </button>
          <button
            onClick={() => handlePreset(15)}
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '2px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: '#67e8f9',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Last 15 min
          </button>
          <button
            onClick={() => handlePreset(60)}
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '2px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: '#67e8f9',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Last 1 hour
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Custom Range
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="datetime-local"
            value={
              localRange?.start
                ? new Date(localRange.start).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setLocalRange((prev) => ({
                ...prev,
                start: e.target.value ? new Date(e.target.value).getTime() : Date.now(),
                end: prev?.end || Date.now(),
              }))
            }
            style={{
              padding: '10px 14px',
              border: '2px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '8px',
              fontSize: '13px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
              color: '#fff',
              transition: 'all 0.3s ease',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#0ea5e9';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14, 165, 233, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <span style={{ color: '#67e8f9', fontSize: '14px', fontWeight: '600' }}>to</span>
          <input
            type="datetime-local"
            value={
              localRange?.end
                ? new Date(localRange.end).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setLocalRange((prev) => ({
                ...prev,
                end: e.target.value ? new Date(e.target.value).getTime() : Date.now(),
                start: prev?.start || Date.now(),
              }))
            }
            style={{
              padding: '10px 14px',
              border: '2px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '8px',
              fontSize: '13px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
              color: '#fff',
              transition: 'all 0.3s ease',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#0ea5e9';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14, 165, 233, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Aggregation Period
        </label>
        <select
          value={aggregationPeriod}
          onChange={(e) => setAggregationPeriod(Number(e.target.value))}
          style={{
            padding: '10px 14px',
            border: '2px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '8px',
            width: '100%',
            fontSize: '13px',
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
            color: '#fff',
            transition: 'all 0.3s ease',
            fontWeight: '500',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#0ea5e9';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)';
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(14, 165, 233, 0.2)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <option value="0">No Aggregation</option>
          {AGGREGATION_PERIODS.map((period) => (
            <option key={period.milliseconds} value={period.milliseconds}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button
          onClick={handleApply}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #ff6b35 0%, #f97316 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '700',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
            color: '#67e8f9',
            border: '2px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)';
            e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
            e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export const TimeRangeSelector = memo(TimeRangeSelectorComponent);

