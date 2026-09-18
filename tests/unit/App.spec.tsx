import { renderToString } from 'react-dom/server';

import { App, ServiceMetric } from '../../src/App';

describe('App', () => {
  it('renders with default props and default metrics', () => {
    const html = renderToString(<App />);
    expect(html).toContain('testrepostpeter-frontend');
    expect(html).toContain('Environment: <strong>production</strong>');
    expect(html).toContain('v0.1.0');
    expect(html).toContain('All systems operational');
    expect(html).toContain('Pipeline Engine');
    expect(html).toContain('ALPHACI Enterprise');
    expect(html).toContain('Passing (&gt;=90%)');
  });

  it('renders custom title and service metadata', () => {
    const html = renderToString(
      <App
        title="Custom Operations Center"
        serviceName="alphaci-client-app"
        environment="staging"
        version="2.0.0"
      />
    );
    expect(html).toContain('Custom Operations Center');
    expect(html).toContain('alphaci-client-app');
    expect(html).toContain('staging');
    expect(html).toContain('v2.0.0');
  });

  it('renders custom metrics list', () => {
    const customMetrics: ServiceMetric[] = [
      { label: 'Uptime', value: '99.99%', status: 'healthy' },
      { label: 'Latency', value: '42ms', status: 'info' },
    ];

    const html = renderToString(<App metrics={customMetrics} />);
    expect(html).toContain('Uptime');
    expect(html).toContain('99.99%');
    expect(html).toContain('Latency');
    expect(html).toContain('42ms');
  });
});