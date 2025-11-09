'use client';

import React, { useState, useCallback, memo } from 'react';
import { FilterOptions } from '@/lib/types';
import { useDataContext } from '../providers/DataProvider';

const CATEGORIES = ['CPU', 'Memory', 'Network', 'Disk', 'API'];

function FilterPanelComponent() {
  const { filters, setFilters } = useDataContext();
  const [localFilters, setLocalFilters] = useState<FilterOptions>({
    categories: filters?.categories || CATEGORIES,
    minValue: filters?.minValue,
    maxValue: filters?.maxValue,
  });

  const handleCategoryToggle = useCallback((category: string) => {
    setLocalFilters((prev) => {
      const categories = prev.categories || CATEGORIES;
      const newCategories = categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category];
      return { ...prev, categories: newCategories };
    });
  }, []);

  const handleApply = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  const handleClear = useCallback(() => {
    const cleared = {
      categories: CATEGORIES,
      minValue: undefined,
      maxValue: undefined,
    };
    setLocalFilters(cleared);
    setFilters(null);
  }, [setFilters]);

  return (
    <div
      className="filter-panel"
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
          Data Filters
        </h3>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Categories
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {CATEGORIES.map((category) => (
            <label
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                background: localFilters.categories?.includes(category)
                  ? 'linear-gradient(135deg, #ff6b35 0%, #f97316 100%)'
                  : 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                color: localFilters.categories?.includes(category)
                  ? '#fff'
                  : '#67e8f9',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                border: localFilters.categories?.includes(category)
                  ? '2px solid rgba(255, 107, 53, 0.5)'
                  : '2px solid rgba(14, 165, 233, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: localFilters.categories?.includes(category)
                  ? '0 4px 12px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 2px 6px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (!localFilters.categories?.includes(category)) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!localFilters.categories?.includes(category)) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
                }
              }}
            >
              <input
                type="checkbox"
                checked={localFilters.categories?.includes(category) || false}
                onChange={() => handleCategoryToggle(category)}
                style={{ marginRight: '6px', cursor: 'pointer' }}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Value Range
        </label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minValue !== undefined ? localFilters.minValue : ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  minValue: e.target.value !== '' ? Number(e.target.value) : undefined,
                }))
              }
              style={{
                padding: '10px 14px',
                border: '2px solid rgba(14, 165, 233, 0.3)',
                borderRadius: '8px',
                width: '100px',
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
              type="number"
              placeholder="Max"
              value={localFilters.maxValue !== undefined ? localFilters.maxValue : ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  maxValue: e.target.value !== '' ? Number(e.target.value) : undefined,
                }))
              }
              style={{
                padding: '10px 14px',
                border: '2px solid rgba(14, 165, 233, 0.3)',
                borderRadius: '8px',
                width: '100px',
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

export const FilterPanel = memo(FilterPanelComponent);

