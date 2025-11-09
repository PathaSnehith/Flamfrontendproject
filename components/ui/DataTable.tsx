'use client';

import React, { useMemo, memo } from 'react';
import { DataPoint } from '@/lib/types';
import { useVirtualization } from '@/hooks/useVirtualization';
import { useDataContext } from '../providers/DataProvider';
import { filterData, aggregateData } from '@/lib/dataGenerator';

interface DataTableProps {
  height?: number;
}

function DataTableComponent({ height = 400 }: DataTableProps) {
  const { data, filters, timeRange, aggregationPeriod } = useDataContext();

  const processedData = useMemo(() => {
    let processed = data;

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
  }, [data, filters, timeRange, aggregationPeriod]);

  const { visibleItems, totalHeight, offsetY, handleScroll, containerRef } =
    useVirtualization(processedData, {
      itemHeight: 40,
      containerHeight: height,
    });

  return (
    <div
      style={{
        border: '2px solid rgba(14, 165, 233, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
        height,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 52, 96, 0.4) 100%)',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '12px',
              }}
            >
              <thead
                style={{
                  position: 'sticky',
                  top: 0,
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                  zIndex: 1,
                  borderBottom: '2px solid rgba(14, 165, 233, 0.4)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <tr>
                    <th
                      style={{
                        padding: '14px 18px',
                        textAlign: 'left',
                        fontWeight: '700',
                        borderRight: '2px solid rgba(14, 165, 233, 0.2)',
                        color: '#67e8f9',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      Timestamp
                    </th>
                    <th
                      style={{
                        padding: '14px 18px',
                        textAlign: 'left',
                        fontWeight: '700',
                        borderRight: '2px solid rgba(14, 165, 233, 0.2)',
                        color: '#67e8f9',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        padding: '14px 18px',
                        textAlign: 'right',
                        fontWeight: '700',
                        color: '#67e8f9',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      Value
                    </th>
                </tr>
              </thead>
              <tbody>
                {(visibleItems as DataPoint[]).map((point: DataPoint, index: number) => (
                  <tr
                    key={`${point.timestamp}-${index}`}
                    style={{
                      borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
                      height: 48,
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)' 
                        : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)';
                      e.currentTarget.style.borderLeft = '3px solid #ff6b35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 
                        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)' 
                        : 'transparent';
                      e.currentTarget.style.borderLeft = 'none';
                    }}
                  >
                    <td
                      style={{
                        padding: '12px 18px',
                        borderRight: '1px solid rgba(14, 165, 233, 0.15)',
                        color: '#e0f2fe',
                        fontSize: '13px',
                        fontWeight: '500',
                      }}
                    >
                      {new Date(point.timestamp).toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: '12px 18px',
                        borderRight: '1px solid rgba(14, 165, 233, 0.15)',
                        color: '#67e8f9',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      {point.category}
                    </td>
                    <td
                      style={{
                        padding: '12px 18px',
                        textAlign: 'right',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '700',
                      }}
                    >
                      {point.value.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
          borderTop: '2px solid rgba(14, 165, 233, 0.3)',
          fontSize: '13px',
          color: '#67e8f9',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span>
          Displaying {visibleItems.length} of {processedData.length} records
        </span>
        {processedData.length > 0 && (
          <span style={{ fontSize: '12px', color: '#a5b4fc', fontWeight: '500' }}>
            {((visibleItems.length / processedData.length) * 100).toFixed(1)}% visible
          </span>
        )}
      </div>
    </div>
  );
}

export const DataTable = memo(DataTableComponent);

