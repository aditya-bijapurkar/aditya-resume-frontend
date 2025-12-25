import React from 'react';
import './css/Pages.css';

interface CostItem {
  id: number;
  service: string;
  description: string;
  yearlyCost?: number;
  monthlyCost?: number;
  category: string;
}

const Cost: React.FC = () => {
  const costItems: CostItem[] = [
    {
      id: 1,
      service: 'OCI Compute Instance',
      description: 'VM.Standard.E2.1.Micro Always Free Tier',
      monthlyCost: 0,
      category: 'Infrastructure'
    },
    {
      id: 2,
      service: 'AWS Route53',
      description: 'Domain registration and renewal',
      yearlyCost: 8,
      category: 'Hosting'
    },
    {
      id: 3,
      service: 'Cloudflare services',
      description: 'DNS and CDN services',
      monthlyCost: 0,
      category: 'Hosting'
    },
    {
      id: 4,
      service: 'Cloudflare Certificate Manager',
      description: 'SSL/TLS certificates for end-to-end encryption',
      monthlyCost: 0,
      category: 'Hosting'
    },
    {
      id: 5,
      service: 'OpenAI chat model',
      description: 'gpt-4o-mini $0.6 / 1M tokens',
      yearlyCost: 0.3,
      category: 'AI'
    },
    {
      id: 6,
      service: 'OpenAI embeddings model',
      description: 'text-embedding-3-small $0.02 / 1M tokens',
      yearlyCost: 0.04,
      category: 'AI'
    },
    {
      id: 7,
      service: 'Google reCAPTCHA v3',
      description: 'Free up to 10,000 assessments/month',
      monthlyCost: 0,
      category: 'Security'
    },
    {
      id: 8,
      service: 'Zoom Marketplace',
      description: 'API for scheduling and managing meetings',
      monthlyCost: 0,
      category: 'Communication'
    },
    {
      id: 9,
      service: 'Github Actions',
      description: 'Free for public repositories with standard runners',
      monthlyCost: 0,
      category: 'Automation'
    },
    {
      id: 10,
      service: 'GitHub / DockerHub',
      description: 'Repository storage and image hosting',
      monthlyCost: 0,
      category: 'Storage'
    },
    {
      id: 11,
      service: 'AWS S3',
      description: 'First 50 TB: $0.023 per GB/month',
      monthlyCost: 0,
      category: 'Storage'
    },
  ];

  const totalMonthly = costItems.reduce((sum, item) => {
      sum += item.monthlyCost ? item.monthlyCost : 0;
      sum += item.yearlyCost ? item.yearlyCost / 12 : 0;
      return sum;
    }, 0 as number);

  const totalYearly = costItems.reduce((sum, item) => {
      sum += item.monthlyCost ? item.monthlyCost * 12 : 0;
      sum += item.yearlyCost ? item.yearlyCost : 0;
      return sum;
    }, 0 as number);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Website Maintenance Costs</h1>
        <p className="subtitle">Transparent breakdown of monthly and annual expenses for maintaining this website</p>
      </div>

      <div className="page-content">
        <div className="cost-table-container">
          <table className="cost-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Associated Cost</th>
              </tr>
            </thead>
            <tbody>
              {costItems.map((item) => (
                <tr key={item.id}>
                  <td className="service-name">{item.service}</td>
                  <td className="service-description">{item.description}</td>
                  <td>
                    <span className="category-tag">{item.category}</span>
                  </td>
                  <td className="text-right cost-amount">
                    {item.yearlyCost ? formatCurrency(item.yearlyCost) + '/year' : item.monthlyCost ? formatCurrency(item.monthlyCost ?? 0) + '/month' : formatCurrency(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cost-summary">
          <div className="summary-card">
            <h3>Monthly Total</h3>
            <p className="summary-amount">
              {formatCurrency(totalMonthly)}
            </p>
          </div>
          <div className="summary-card">
            <h3>Annual Total</h3>
            <p className="summary-amount">
              {formatCurrency(totalYearly)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cost;