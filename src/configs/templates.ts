export type TemplateField = {
  key: string
  label: string
  placeholder: string
  half?: boolean
}

// number — decorative text bar, width in %; string — key of a fillable field
export type TemplateLine = number | string

export type TemplateSection = {
  heading?: string
  lines: TemplateLine[]
}

export type ContractTemplate = {
  id: string
  name: string
  category: string
  description: string
  docTitle: string
  docSubtitle: string
  signatures: [string, string]
  fields: TemplateField[]
  cover: TemplateLine[]
  pages: TemplateSection[][]
}

export const templateCategories = ['NDA', 'Employment', 'Sales', 'Lease', 'Services', 'Freelance']

export const contractTemplates: ContractTemplate[] = [
  {
    id: 'mutual-nda',
    name: 'Mutual NDA',
    category: 'NDA',
    description:
      'A balanced non-disclosure agreement where both parties share confidential information. Governs use, duration, and return of confidential material.',
    docTitle: 'Mutual non-disclosure agreement',
    docSubtitle: 'between the parties named below',
    signatures: ['Disclosing party', 'Receiving party'],
    fields: [
      { key: 'party1', label: 'Your company / name', placeholder: 'Stakeshark Inc.' },
      { key: 'party2', label: 'Counterparty', placeholder: 'Northwind LLC' },
      { key: 'effectiveDate', label: 'Effective date', placeholder: 'Jul 10, 2026', half: true },
      { key: 'term', label: 'Term (months)', placeholder: '24', half: true },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…' },
    ],
    cover: [88, 'party1', 74, 'party2', 90, 84, 58],
    pages: [
      [
        { lines: [92, 'party1', 88, 'party2', 70] },
        { heading: 'Definitions', lines: [95, 88, 92, 60] },
      ],
      [{ heading: 'Confidentiality obligations', lines: [90, 95, 'effectiveDate', 88, 92, 76] }],
      [{ heading: 'Term & termination', lines: [94, 'term', 85, 90, 52] }],
      [{ heading: 'Governing law', lines: [90, 'law', 78, 40] }],
    ],
  },
  {
    id: 'one-way-nda',
    name: 'One-way NDA',
    category: 'NDA',
    description:
      'Protects confidential information shared by one party only. Quick to put in place before negotiations or due diligence.',
    docTitle: 'Non-disclosure agreement',
    docSubtitle: 'between the parties named below',
    signatures: ['Disclosing party', 'Receiving party'],
    fields: [
      { key: 'discloser', label: 'Disclosing party', placeholder: 'Stakeshark Inc.' },
      { key: 'recipient', label: 'Receiving party', placeholder: 'Northwind LLC' },
      { key: 'effectiveDate', label: 'Effective date', placeholder: 'Jul 10, 2026', half: true },
      { key: 'purpose', label: 'Purpose of disclosure', placeholder: 'Evaluating a partnership' },
    ],
    cover: [86, 'discloser', 72, 'recipient', 92, 80, 64],
    pages: [
      [
        { lines: [90, 'discloser', 86, 'recipient', 68] },
        { heading: 'Definitions', lines: [94, 90, 'purpose', 58] },
      ],
      [{ heading: 'Obligations of the receiving party', lines: [92, 88, 95, 'effectiveDate', 74] }],
      [
        { heading: 'Remedies', lines: [90, 86, 62] },
        { heading: 'General', lines: [88, 44] },
      ],
    ],
  },
  {
    id: 'employee-nda',
    name: 'Employee NDA',
    category: 'NDA',
    description:
      'Keeps company information confidential during and after employment. Covers trade secrets, work product, and company property.',
    docTitle: 'Employee non-disclosure agreement',
    docSubtitle: 'between the company and the employee named below',
    signatures: ['Company', 'Employee'],
    fields: [
      { key: 'company', label: 'Company', placeholder: 'Stakeshark Inc.' },
      { key: 'employee', label: 'Employee name', placeholder: 'John Doe' },
      { key: 'position', label: 'Job title', placeholder: 'Software Engineer' },
      { key: 'startDate', label: 'Start date', placeholder: 'Aug 1, 2026', half: true },
      { key: 'survival', label: 'Survival period (months)', placeholder: '36', half: true },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…' },
    ],
    cover: [90, 'company', 76, 'employee', 88, 'position', 60],
    pages: [
      [
        { lines: [92, 'company', 86, 'employee', 'position', 70] },
        { heading: 'Definitions', lines: [94, 90, 56] },
      ],
      [{ heading: 'Employee obligations', lines: [90, 95, 88, 'startDate', 92, 72] }],
      [{ heading: 'Company property', lines: [88, 92, 64] }],
      [
        { heading: 'Term & survival', lines: [90, 'survival', 78] },
        { heading: 'Governing law', lines: ['law', 86, 42] },
      ],
    ],
  },
  {
    id: 'employment-agreement',
    name: 'Employment Agreement',
    category: 'Employment',
    description:
      'A full-time employment contract covering duties, compensation, working time, probation, confidentiality, and termination.',
    docTitle: 'Employment agreement',
    docSubtitle: 'entered into by the employer and the employee below',
    signatures: ['Employer', 'Employee'],
    fields: [
      { key: 'company', label: 'Employer', placeholder: 'Stakeshark Inc.' },
      { key: 'employee', label: 'Employee name', placeholder: 'John Doe' },
      { key: 'position', label: 'Job title', placeholder: 'Software Engineer' },
      { key: 'startDate', label: 'Start date', placeholder: 'Aug 1, 2026', half: true },
      { key: 'salary', label: 'Annual salary', placeholder: '$120,000', half: true },
      { key: 'hours', label: 'Working hours / week', placeholder: '40', half: true },
      { key: 'vacation', label: 'Paid vacation (days)', placeholder: '25', half: true },
      { key: 'probation', label: 'Probation (months)', placeholder: '3', half: true },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…', half: true },
    ],
    cover: [88, 'company', 74, 'employee', 90, 'position', 82, 56],
    pages: [
      [
        { lines: [90, 'company', 86, 'employee', 68] },
        { heading: 'Position & duties', lines: ['position', 94, 'startDate', 88, 60] },
      ],
      [{ heading: 'Compensation', lines: [90, 'salary', 92, 86, 70] }],
      [
        { heading: 'Working time & leave', lines: ['hours', 92, 'vacation', 88, 64] },
        { heading: 'Probation', lines: ['probation', 86, 50] },
      ],
      [
        { heading: 'Confidentiality', lines: [92, 88, 66] },
        { heading: 'Termination & governing law', lines: [90, 'law', 44] },
      ],
    ],
  },
  {
    id: 'sales-contract',
    name: 'Sales Contract',
    category: 'Sales',
    description:
      'Covers a one-off sale of goods: what is sold, at what price, and on what payment and delivery terms.',
    docTitle: 'Sales contract',
    docSubtitle: 'for the sale of the goods described below',
    signatures: ['Seller', 'Buyer'],
    fields: [
      { key: 'seller', label: 'Seller', placeholder: 'Stakeshark Inc.' },
      { key: 'buyer', label: 'Buyer', placeholder: 'Northwind LLC' },
      { key: 'goods', label: 'Description of goods', placeholder: '20 office desks, model D-200' },
      { key: 'price', label: 'Total price', placeholder: '$14,000', half: true },
      { key: 'deliveryDate', label: 'Delivery date', placeholder: 'Sep 15, 2026', half: true },
      { key: 'payment', label: 'Payment terms', placeholder: '50% upfront, 50% on delivery' },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…' },
    ],
    cover: [86, 'seller', 72, 'buyer', 90, 'goods', 62],
    pages: [
      [
        { lines: [90, 'seller', 86, 'buyer', 66] },
        { heading: 'Goods & acceptance', lines: ['goods', 92, 88, 58] },
      ],
      [{ heading: 'Price & payment', lines: ['price', 90, 'payment', 86, 72] }],
      [{ heading: 'Delivery', lines: [88, 'deliveryDate', 92, 68] }],
      [
        { heading: 'Warranties & liability', lines: [92, 88, 64] },
        { heading: 'Governing law', lines: ['law', 84, 40] },
      ],
    ],
  },
  {
    id: 'residential-lease',
    name: 'Residential Lease',
    category: 'Lease',
    description:
      'A lease for a residential property: term, rent, deposit, utilities, and each side’s responsibilities.',
    docTitle: 'Residential lease agreement',
    docSubtitle: 'for the premises described below',
    signatures: ['Landlord', 'Tenant'],
    fields: [
      { key: 'landlord', label: 'Landlord', placeholder: 'Jane Smith' },
      { key: 'tenant', label: 'Tenant', placeholder: 'John Doe' },
      { key: 'address', label: 'Property address', placeholder: '221B Baker Street, London' },
      { key: 'startDate', label: 'Lease start', placeholder: 'Sep 1, 2026', half: true },
      { key: 'term', label: 'Term (months)', placeholder: '12', half: true },
      { key: 'rent', label: 'Monthly rent', placeholder: '$2,400', half: true },
      { key: 'deposit', label: 'Security deposit', placeholder: '$2,400', half: true },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…' },
    ],
    cover: [88, 'landlord', 74, 'tenant', 90, 'address', 58],
    pages: [
      [
        { lines: [90, 'landlord', 86, 'tenant', 66] },
        { heading: 'Premises', lines: ['address', 92, 88, 56] },
      ],
      [{ heading: 'Term', lines: ['startDate', 90, 'term', 86, 70] }],
      [{ heading: 'Rent & deposit', lines: ['rent', 92, 'deposit', 88, 74] }],
      [
        { heading: 'Utilities & maintenance', lines: [90, 88, 62] },
        { heading: 'Termination & governing law', lines: [86, 'law', 42] },
      ],
    ],
  },
  {
    id: 'service-agreement',
    name: 'Service Agreement',
    category: 'Services',
    description:
      'Frames ongoing services between a provider and a client: scope, fees, invoicing, and liability.',
    docTitle: 'Service agreement',
    docSubtitle: 'for the services described below',
    signatures: ['Provider', 'Client'],
    fields: [
      { key: 'provider', label: 'Service provider', placeholder: 'Stakeshark Inc.' },
      { key: 'client', label: 'Client', placeholder: 'Northwind LLC' },
      { key: 'services', label: 'Description of services', placeholder: 'Monthly accounting services' },
      { key: 'startDate', label: 'Start date', placeholder: 'Aug 1, 2026', half: true },
      { key: 'fee', label: 'Monthly fee', placeholder: '$3,000', half: true },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…' },
    ],
    cover: [86, 'provider', 72, 'client', 90, 'services', 60],
    pages: [
      [
        { lines: [90, 'provider', 86, 'client', 66] },
        { heading: 'Services', lines: ['services', 92, 88, 58] },
      ],
      [{ heading: 'Fees & invoicing', lines: ['fee', 90, 86, 72] }],
      [{ heading: 'Term & termination', lines: ['startDate', 92, 88, 64] }],
      [
        { heading: 'IP & confidentiality', lines: [90, 88, 60] },
        { heading: 'Liability & governing law', lines: [86, 'law', 44] },
      ],
    ],
  },
  {
    id: 'freelance-contract',
    name: 'Freelance Contract',
    category: 'Freelance',
    description:
      'A project-based contract for independent contractors: scope, deadline, payment, and who owns the work.',
    docTitle: 'Freelance contract',
    docSubtitle: 'for the project described below',
    signatures: ['Client', 'Contractor'],
    fields: [
      { key: 'client', label: 'Client', placeholder: 'Stakeshark Inc.' },
      { key: 'contractor', label: 'Contractor', placeholder: 'John Doe' },
      { key: 'project', label: 'Scope of work', placeholder: 'Landing page design & build' },
      { key: 'deadline', label: 'Deadline', placeholder: 'Sep 30, 2026', half: true },
      { key: 'rate', label: 'Fee', placeholder: '$5,000 fixed', half: true },
      { key: 'law', label: 'Governing law', placeholder: 'State / country…' },
    ],
    cover: [88, 'client', 74, 'contractor', 90, 'project', 62],
    pages: [
      [
        { lines: [90, 'client', 86, 'contractor', 66] },
        { heading: 'Scope of work', lines: ['project', 92, 88, 58] },
      ],
      [{ heading: 'Deliverables & deadline', lines: [90, 'deadline', 86, 70] }],
      [{ heading: 'Payment', lines: ['rate', 92, 88, 64] }],
      [
        { heading: 'IP assignment', lines: [90, 86, 60] },
        { heading: 'Contractor status & governing law', lines: [88, 'law', 42] },
      ],
    ],
  },
]

export function getTemplate(id: string | string[] | undefined): ContractTemplate | undefined {
  if (typeof id !== 'string') return undefined
  return contractTemplates.find((template) => template.id === id)
}
