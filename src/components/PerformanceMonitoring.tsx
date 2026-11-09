import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

import { useLocation } from 'react-router-dom';

// Real-world performance metrics registry for diagnostic inspection
interface PerformanceReport {
  vitals: Record<string, { value: number; rating: 'good' | 'needs-improvement' | 'poor'; delta: number }>;
  bottlenecks: Array<{ type: string; details: string; timestamp: number; severity: 'info' | 'warn' | 'critical' }>;
  navigationTiming?: {
    dns: number;
    tcp: number;
    ttfb: number;
    domInteractive: number;
    domComplete: number;
    totalLoadTime: number;
  };
}

declare global {
  interface Window {
    __PERF_METRICS__?: PerformanceReport;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

function initPerformanceDiagnostics() {
  if (typeof window === 'undefined') return;

  const report: PerformanceReport = {
    vitals: {},
    bottlenecks: [],
  };
  window.__PERF_METRICS__ = report;

  const recordMetric = (metric: Metric) => {
    report.vitals[metric.name] = {
      value: Math.round(metric.value * 100) / 100,
      rating: metric.rating,
      delta: Math.round(metric.delta * 100) / 100,
    };

    if (metric.rating === 'poor') {
      report.bottlenecks.push({
        type: `Core Web Vital: Poor ${metric.name}`,
        details: `${metric.name} measured ${Math.round(metric.value)}ms (Threshold: poor)`,
        timestamp: Date.now(),
        severity: 'warn',
      });
    }
  };

  // 1. Core Web Vitals (Real-World User Metrics)
  try {
    onCLS(recordMetric);
    onFCP(recordMetric);
    onINP(recordMetric);
    onLCP((metric) => {
      recordMetric(metric);
      // Analyze LCP element if available
      if (metric.entries && metric.entries.length > 0) {
        const lastEntry = metric.entries[metric.entries.length - 1] as PerformanceEntry & {
          element?: Element;
          url?: string;
          loadTime?: number;
          renderTime?: number;
        };
        if (lastEntry.url) {
          report.bottlenecks.push({
            type: 'LCP Resource',
            details: `LCP candidate element url: ${lastEntry.url} (${Math.round(metric.value)}ms)`,
            timestamp: Date.now(),
            severity: 'info',
          });
        }
      }
    });
    onTTFB(recordMetric);
  } catch {
    // Non-fatal if web-vitals fails in unsupported environments
  }

  // 2. Navigation Timing Breakdown
  if (typeof window.performance !== 'undefined') {
    const handleNavigationTiming = () => {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        const nav = navEntries[0];
        report.navigationTiming = {
          dns: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
          tcp: Math.round(nav.connectEnd - nav.connectStart),
          ttfb: Math.round(nav.responseStart - nav.requestStart),
          domInteractive: Math.round(nav.domInteractive),
          domComplete: Math.round(nav.domComplete),
          totalLoadTime: Math.round(nav.loadEventEnd || performance.now()),
        };

        if (report.navigationTiming.ttfb > 600) {
          report.bottlenecks.push({
            type: 'Slow Server Response',
            details: `TTFB is ${report.navigationTiming.ttfb}ms (> 600ms)`,
            timestamp: Date.now(),
            severity: 'warn',
          });
        }
      }
    };

    if (document.readyState === 'complete') {
      handleNavigationTiming();
    } else {
      window.addEventListener('load', handleNavigationTiming, { once: true });
    }
  }

  // 3. Long Tasks / Thread Blocking Bottlenecks
  if (typeof PerformanceObserver !== 'undefined') {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 80) {
            report.bottlenecks.push({
              type: 'Long Main Thread Task',
              details: `Task took ${Math.round(entry.duration)}ms blocking main thread`,
              timestamp: Date.now(),
              severity: entry.duration > 200 ? 'critical' : 'warn',
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch {
      // Longtask observer not supported in all browsers (e.g. Safari), ignore safely
    }

    // 4. Slow Resource Loading (> 600ms)
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
          if (entry.duration > 600 && entry.initiatorType !== 'xmlhttprequest' && entry.initiatorType !== 'fetch') {
            report.bottlenecks.push({
              type: 'Slow Static Asset',
              details: `${entry.initiatorType.toUpperCase()}: ${entry.name.split('/').pop()} took ${Math.round(entry.duration)}ms`,
              timestamp: Date.now(),
              severity: 'warn',
            });
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch {
      // Ignore if unsupported
    }
  }
}

export function trackAnalyticsEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/**
 * PerformanceMonitoring Component
 * Integrates Google Analytics 4, Vercel Web Analytics, Speed Insights, and Real-World Web Vitals & Bottleneck tracking.
 */
export default function PerformanceMonitoring() {
  const location = useLocation();

  useEffect(() => {
    initPerformanceDiagnostics();
  }, []);

  // Synchronize SPA client-side route changes with Google Analytics 4
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-F8H2BGFTB4', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return (
    <>
      {/* Vercel Web Analytics */}
      <Analytics />
      {/* Vercel Speed Insights (Core Web Vitals & Load Times) */}
      <SpeedInsights />
    </>
  );
}
