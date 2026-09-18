import React from 'react';

export interface ServiceMetric {
  label: string;
  value: string;
  status?: 'healthy' | 'warning' | 'info';
}

export interface AppProps {
  title?: string;
  serviceName?: string;
  environment?: string;
  version?: string;
  metrics?: ServiceMetric[];
}

const DEFAULT_METRICS: ServiceMetric[] = [
  { label: 'Pipeline Engine', value: 'ALPHACI Enterprise', status: 'healthy' },
  { label: 'Quality Gate', value: 'Passing (>=90%)', status: 'healthy' },
  { label: 'Deployment State', value: 'Ready', status: 'healthy' },
  { label: 'Security Scan', value: '0 Vulnerabilities', status: 'healthy' },
];

export function App({
  title = 'testrepostpeter-frontend',
  serviceName = 'testrepostpeter-frontend',
  environment = 'production',
  version = '0.1.0',
  metrics = DEFAULT_METRICS,
}: AppProps) {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 data-testid="app-title" style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
          {title}
        </h1>
        <p data-testid="service-meta" style={{ margin: '0.5rem 0 0', color: '#64748b' }}>
          Service: <strong>{serviceName}</strong> | Environment: <strong>{environment}</strong> | {`v${version}`}
        </p>
      </header>

      <section aria-labelledby="status-heading" style={{ marginBottom: '2rem' }}>
        <h2 id="status-heading" style={{ fontSize: '1.25rem', color: '#1e293b' }}>
          System Status
        </h2>
        <div
          role="status"
          aria-live="polite"
          data-testid="status-indicator"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            fontWeight: 600,
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          All systems operational
        </div>
      </section>

      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" style={{ fontSize: '1.25rem', color: '#1e293b' }}>
          CI/CD Quality Metrics
        </h2>
        <div
          data-testid="metrics-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              data-testid={`metric-card-${idx}`}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f8fafc',
              }}
            >
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                {metric.label}
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}