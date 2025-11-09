'use client';

import React, { memo } from 'react';
import { PerformanceMetrics } from '@/lib/types';

interface PerformanceMonitorProps {
  metrics: PerformanceMetrics;
}

function PerformanceMonitorComponent({ metrics }: PerformanceMonitorProps) {
  const fpsColor = metrics.fps >= 55 ? '#10b981' : metrics.fps >= 30 ? '#f59e0b' : '#ef4444';
  const memoryColor = metrics.memoryUsage < 50 ? '#10b981' : metrics.memoryUsage < 100 ? '#f59e0b' : '#ef4444';

  return (
    <div
      style={{
        padding: '28px',
        background: 'linear-gradient(145deg, rgba(255, 107, 53, 0.12) 0%, rgba(14, 165, 233, 0.12) 100%)',
        borderRadius: '16px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '14px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: '2px solid rgba(255, 107, 53, 0.25)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '4px',
            height: '24px',
            background: 'linear-gradient(180deg, #ff6b35 0%, #0ea5e9 100%)',
            borderRadius: '3px',
            marginRight: '14px',
            boxShadow: '0 0 8px rgba(255, 107, 53, 0.5)',
          }}
        />
        <h3 style={{ 
          margin: 0, 
          fontSize: '20px', 
          fontWeight: '800', 
          letterSpacing: '1px',
          background: 'linear-gradient(135deg, #ff6b35 0%, #0ea5e9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textTransform: 'uppercase',
        }}>
          System Metrics
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ color: '#67e8f9', fontSize: '12px', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            FPS
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: fpsColor, lineHeight: '1.2', textShadow: `0 0 10px ${fpsColor}40` }}>
            {metrics.fps.toFixed(1)}
          </div>
          <div style={{ fontSize: '12px', color: '#a5b4fc', marginTop: '6px', fontWeight: '500' }}>
            Target: 60fps
          </div>
        </div>
        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ color: '#67e8f9', fontSize: '12px', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Memory
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: memoryColor, lineHeight: '1.2', textShadow: `0 0 10px ${memoryColor}40` }}>
            {metrics.memoryUsage.toFixed(1)} <span style={{ fontSize: '18px', fontWeight: '600' }}>MB</span>
          </div>
          <div style={{ fontSize: '12px', color: '#a5b4fc', marginTop: '6px', fontWeight: '500' }}>
            Heap usage
          </div>
        </div>
        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ color: '#67e8f9', fontSize: '12px', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Render Time
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#fff', lineHeight: '1.2' }}>
            {metrics.renderTime.toFixed(2)} <span style={{ fontSize: '16px', fontWeight: '600' }}>ms</span>
          </div>
          <div style={{ fontSize: '12px', color: '#a5b4fc', marginTop: '6px', fontWeight: '500' }}>
            Per frame
          </div>
        </div>
        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ color: '#67e8f9', fontSize: '12px', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Frames
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#fff', lineHeight: '1.2' }}>
            {metrics.frameCount.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#a5b4fc', marginTop: '6px', fontWeight: '500' }}>
            Total rendered
          </div>
        </div>
      </div>
    </div>
  );
}

export const PerformanceMonitor = memo(PerformanceMonitorComponent);

