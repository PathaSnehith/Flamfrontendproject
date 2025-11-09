'use client';

import React, { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { useDataContext } from '@/components/providers/DataProvider';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { ScatterPlot } from '@/components/charts/ScatterPlot';
import { Heatmap } from '@/components/charts/Heatmap';
import { FilterPanel } from '@/components/controls/FilterPanel';
import { TimeRangeSelector } from '@/components/controls/TimeRangeSelector';
import { DataTable } from '@/components/ui/DataTable';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { useResize } from '@/hooks/useResize';
import { generateNewDataPoint } from '@/lib/dataGenerator';
import { filterData, aggregateData } from '@/lib/dataGenerator';
import { AGGREGATION_PERIODS } from '@/lib/types';

export default function DashboardClient() {
  const {
    data: rawData,
    filters,
    timeRange,
    aggregationPeriod,
    addDataPoint,
  } = useDataContext();

  const [isStreaming, setIsStreaming] = useState(true);
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'scatter' | 'heatmap'>('line');
  const [isPending, startTransition] = useTransition();
  const { metrics, recordFrame } = usePerformanceMonitor(true);
  const { ref: chartContainerRef, width: chartWidth, height: chartHeight } = useResize<HTMLDivElement>();

  // Process data with filters and aggregation
  const processedData = useMemo(() => {
    let processed = rawData;

    if (filters || timeRange) {
      processed = filterData(processed, {
        categories: filters?.categories,
        minValue: filters?.minValue,
        maxValue: filters?.maxValue,
        timeRange: timeRange ? { start: timeRange.start, end: timeRange.end } : undefined,
      });
    }

    if (aggregationPeriod > 0) {
      processed = aggregateData(processed, aggregationPeriod);
    }

    return processed;
  }, [rawData, filters, timeRange, aggregationPeriod]);

  // Real-time data streaming
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newPoint = generateNewDataPoint();
      startTransition(() => {
        addDataPoint(newPoint);
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [isStreaming, addDataPoint]);

  const handleToggleStream = useCallback(() => {
    setIsStreaming((prev) => !prev);
  }, []);

  const handleChartChange = useCallback((chart: 'line' | 'bar' | 'scatter' | 'heatmap') => {
    setSelectedChart(chart);
  }, []);

  // Render callback for performance tracking
  const handleRender = useCallback((renderTime: number) => {
    recordFrame(renderTime);
  }, [recordFrame]);

  // Add animation style on client side only
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .dashboard-container {
        animation: gradientShift 15s ease infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)',
        backgroundSize: '400% 400%',
      }}
      suppressHydrationWarning
    >
      <div
        style={{
          maxWidth: '1700px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <header
          style={{
            marginBottom: '28px',
            padding: '28px 32px',
            background: 'linear-gradient(145deg, rgba(255, 107, 53, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 107, 53, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #0ea5e9 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1px',
                textShadow: '0 0 30px rgba(255, 107, 53, 0.5)',
              }}
            >
              Analytics Control Center
            </h1>
            <p style={{ color: '#a5b4fc', fontSize: '15px', margin: 0, fontWeight: '500' }}>
              Advanced real-time monitoring system with high-performance data rendering
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={handleToggleStream}
              style={{
                padding: '12px 24px',
                background: isStreaming
                  ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                  : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '700',
                boxShadow: isStreaming
                  ? '0 4px 12px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 4px 12px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = isStreaming
                  ? '0 6px 16px rgba(249, 115, 22, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 6px 16px rgba(6, 182, 212, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = isStreaming
                  ? '0 4px 12px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 4px 12px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#fff',
                  display: isStreaming ? 'block' : 'none',
                  animation: isStreaming ? 'pulse 1.5s infinite' : 'none',
                  boxShadow: isStreaming ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
                }}
              />
              {isStreaming ? 'Pause' : 'Resume'}
            </button>
            <div
              style={{
                padding: '12px 22px',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                borderRadius: '10px',
                border: '2px solid rgba(14, 165, 233, 0.4)',
                fontSize: '15px',
                fontWeight: '700',
                color: '#67e8f9',
                boxShadow: '0 2px 8px rgba(14, 165, 233, 0.2)',
              }}
            >
              {processedData.length.toLocaleString()} entries
            </div>
          </div>
        </header>

        {/* Performance Monitor */}
        <div style={{ marginBottom: '24px' }}>
          <PerformanceMonitor metrics={metrics} />
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <FilterPanel />
          <TimeRangeSelector />
        </div>

        {/* Chart Selector */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            padding: '20px',
            background: 'linear-gradient(145deg, rgba(14, 165, 233, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
            borderRadius: '14px',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            border: '2px solid rgba(14, 165, 233, 0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {(['line', 'bar', 'scatter', 'heatmap'] as const).map((chart) => (
            <button
              key={chart}
              onClick={() => handleChartChange(chart)}
              style={{
                padding: '12px 24px',
                background: selectedChart === chart
                  ? 'linear-gradient(135deg, #ff6b35 0%, #f97316 100%)'
                  : 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                color: selectedChart === chart ? '#fff' : '#67e8f9',
                border: selectedChart === chart 
                  ? '2px solid rgba(255, 107, 53, 0.5)' 
                  : '2px solid rgba(14, 165, 233, 0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedChart === chart ? '700' : '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: selectedChart === chart
                  ? '0 4px 12px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 2px 6px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (selectedChart !== chart) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedChart !== chart) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
                }
              }}
            >
              {chart} View
            </button>
          ))}
        </div>

        {/* Charts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
            gap: '28px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(255, 107, 53, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 107, 53, 0.25)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #0ea5e9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: 0,
                  letterSpacing: '1px',
                }}
              >
                {selectedChart} Visualization
              </h2>
              {isStreaming && (
                <div
                  style={{
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#fff',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#fff',
                      display: 'block',
                      animation: 'pulse 1.5s infinite',
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
                    }}
                  />
                  Active
                </div>
              )}
            </div>
            <div
              ref={chartContainerRef}
              style={{
                width: '100%',
                height: '450px',
                minHeight: '450px',
                maxHeight: '450px',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 52, 96, 0.4) 100%)',
                borderRadius: '12px',
                border: '2px solid rgba(14, 165, 233, 0.3)',
                padding: '16px',
                overflow: 'hidden',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {selectedChart === 'line' && (
                <LineChart
                  data={processedData}
                  width={chartWidth || 800}
                  height={chartHeight || 400}
                  onRender={handleRender}
                />
              )}
              {selectedChart === 'bar' && (
                <BarChart
                  data={processedData}
                  width={chartWidth || 800}
                  height={chartHeight || 400}
                  onRender={handleRender}
                />
              )}
              {selectedChart === 'scatter' && (
                <ScatterPlot
                  data={processedData}
                  width={chartWidth || 800}
                  height={chartHeight || 400}
                  onRender={handleRender}
                />
              )}
              {selectedChart === 'heatmap' && (
                <Heatmap
                  data={processedData}
                  width={chartWidth || 800}
                  height={chartHeight || 400}
                  onRender={handleRender}
                />
              )}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(14, 165, 233, 0.25)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '800',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Data Records
          </h2>
          <DataTable height={400} />
        </div>
      </div>
    </div>
  );
}

