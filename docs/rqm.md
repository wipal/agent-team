t đang dùng claude code, và muốn build 1 agent team
1. Agent team này có nhiều roles khác nhau ví dụ PM, Dev FE, Dev BE, Dev Mobile, QA, DevOps, Designer, Marketing, Sales, Support, HR, Finance, Legal, Admin, etc.
2. Mỗi role có thể có nhiều skills khác nhau, nó có thử sử dụng link hoạt và các skill có kết nối, bổ trợ cho nhau
3. Mỗi role có thể có nhiều tools khác nhau
4. Mỗi role có thể có memory khác nhau, và mỗi project sẽ có memory riêng, bộ nhớ dài hạn
5. Mỗi role có thể có nhiều workflow khác nhau
6. Mỗi role có thể có thể tự học và cải thiện khi làm việc và đc góp ý.
7. Mỗi role có thể extract bộ nhớ kiến thức chung để update thanks skill hay known base của source code này
8. Mỗi roles cũng sẽ có 1 vài MCP(cs thể ko có)
9. Về phần agent team này sẽ là 1 template ban đầu và đc thêm dần, sau này mỗi dự án cần chỉ càn pick 1 ai đó trong agent team này vào là đc
10. agent team là 1 bộ soủce code độc lập và có thể setup nhanh để chạy đc với claude code 
11. tôi có tham khảo qua 1 vài chỗ nó nói có thể bill dạng agent skills và dùng agent team của claude code, bạn có thể tham khảo 
12. TRước tiên tôi cần các roles sau trong agent team để có thể chạy đc project hiện tại của tôi
    1.  PM - quản lý team, lên kế hoạch, giao việc, theo dõi tiến độ, báo cáo, etc.
    2.  Dev FE(nodejs, reactjs, nextjs, tailwindcss, typescript, Vite, etc.) - phát triển giao diện người dùng, tương tác với người dùng, etc.
    3.  Dev BE(nodejs, expressjs, typescript,Redis, Docker etc.) - phát triển logic nghiệp vụ, tương tác với cơ sở dữ liệu, etc.
    4.  QA - kiểm thử ứng dụng, đảm bảo chất lượng, etc.
    5.  DevOps - triển khai ứng dụng, quản lý hạ tầng, etc.
    6.  Designer - thiết kế giao diện, trải nghiệm người dùng, etc.
    7.  QA Lead - quản lý team QA, lên kế hoạch, giao việc, theo dõi tiến độ, báo cáo, etc. Biết nhiều về test strategy, test plan, test case, test report, etc, expert về các test tool automation như playwright, cypress, k6, jmeter, etc.
    8.  Dev Lead - quản lý team Dev, lên kế hoạch, giao việc, theo dõi tiến độ, báo cáo, etc. Biết nhiều về các ngôn ngữ lập trình như java, python, go, nodejs, etc. và các framework như spring, django, flask, express, etc. và các database như mysql, postgres, mongodb, etc.
    9.  QA Automation - viết test case, test script, test report, etc. Làm tốt về E2E, API, Performance, Security, dùng được các tool như Playwright, Cypress, K6, Jmeter
    10. Ngoài ra các role còn cần sử dụng tốt git, github, gitlab, etc. để quản lý mã nguồn và cộng tác với nhau
13. source code này ko chỉ là setup agent team mà còn setup cả các skills,MCP, tools, etc. cho từng role
14. về MCP luôn có context7 và các agent luôn phải tham khảo nó khi nào về code
15. Team còn cần các template báo cáo, trao đổi, etc. để report cho tôi
16. Source code cũng cần có các workflow để có thể chạy đc với claude code
17. Source code có thể setup qua claude code bằng chat với claude code, và có thể update, cải thiện thông qua chat với claude code. sẽ có template để setup ví dự team bao nhiều người, những roles nào...
18. source code cần 1 template về workflow để có thể setup nhanh 1 team làm việc có thứ tự ko bị lặp/chèn/bỏ sót..
19. Về phần các skill và các workflow cần có tính liên kết và bổ trợ cho nhau, ví dụ Skill A có thể dùng skill B và F để có thêm thông tin và lmaf việc chính xác hiệu quả hơn, nhưng cẩn thận bị lặp vô hạn
20. Về phần các MCP, tools, etc. cần có tính liên kết và bổ trợ cho nhau, ví dụ MCP A có thể dùng MCP B và F để có thêm thông tin và lmaf việc chính xác hiệu quả hơn, nhưng cẩn thận bị lặp vô hạn
Dưới đây là 1 mô tả về team tôi đang càn    
---
1.2 Core Team Structure
                    ┌─────────────┐
                    │   Product   │
                    │   Manager   │
                    │   (Part-time│
                    │   or Owner) │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐
    │  Business │    │ Technical │    │   Design  │
    │ Analyst   │    │   Lead    │    │   (Part   │
    │           │    │           │    │   -time)  │
    └─────┬─────┘    └─────┬─────┘    └───────────┘
          │                │
          │         ┌──────┼──────┐
          │         │      │      │
          │    ┌────┴──┐ ┌─┴───┐ ┌┴────┐
          │    │  BE   │ │ FE  │ │ QA  │
          │    │  Dev  │ │ Dev │ │ Eng │
          │    │   x2  │ │ x2  │ │ x1  │
          │    └───────┘ └─────┘ └─────┘
          │
    ┌─────┴─────┐
    │ DevOps    │
    │ (Part-time│
    │  or Out)  │
    └───────────┘
1. Role Definitions
2.1 Business Analyst (BA)
Overview
Attribute	Value
Headcount	1
Employment	Full-time
Experience	2-4 years
Priority	High
Required Skills
Skill	Level	Description
Requirements Analysis	Expert	Elicit, document, validate requirements
Documentation	Expert	Write clear BRD, SRS, user stories
Process Mapping	Advanced	Create workflow diagrams, flowcharts
SQL/Database	Basic	Query data for analysis
Communication	Expert	Bridge between business and tech
Agile/Scrum	Advanced	Work in sprint-based environment
Nice-to-Have Skills
Skill	Description
Logistics Domain	Understanding of parking, warehouse operations
Figma/Design Tools	Can review UI mockups
API Knowledge	Understand REST APIs
Vietnamese Business	Local business practices knowledge
Key Responsibilities
Analyze business requirements from stakeholders
Write user stories and acceptance criteria
Create process flow documentation
Validate requirements with development team
Support UAT (User Acceptance Testing)
Maintain documentation in specs/ folder
Deliverables
Deliverable	Frequency
Business Requirements (BR)	Per feature
User Stories (US)	Per sprint
Process Diagrams	As needed
UAT Test Cases	Before release
Interview Questions
Technical Questions:

Describe your process for gathering requirements from non-technical stakeholders.
How do you handle conflicting requirements from different stakeholders?
What tools do you use for documentation and why?
How do you validate that requirements are complete?
Scenario Questions:

A user reports a bug that seems to conflict with the documented requirements. How do you handle this?
The client wants to add a major feature mid-sprint. What do you do?
Salary Range (Vietnam): 15-25M VND/month

2.2 Technical Lead / Solution Architect (SA)
Overview
Attribute	Value
Headcount	1
Employment	Full-time
Experience	5-8 years
Priority	Critical
Required Skills
Skill	Level	Description
System Design	Expert	Design scalable architectures
NestJS/Node.js	Expert	Backend development
React/TypeScript	Advanced	Frontend development
PostgreSQL	Expert	Database design, optimization
DevOps	Advanced	CI/CD, Docker, deployment
Team Leadership	Expert	Mentor, code review, technical decisions
Nice-to-Have Skills
Skill	Description
Prisma ORM	Type-safe database operations
Redis	Caching strategies
Microservices	Future architecture planning
Cloud (AWS/GCP)	Infrastructure knowledge
Security	OWASP, authentication patterns
Key Responsibilities
Design system architecture and make technical decisions
Lead code reviews and ensure code quality
Mentor junior developers
Make technology recommendations
Oversee deployment and infrastructure
Create technical documentation in specs/
Deliverables
Deliverable	Frequency
Architecture Documents	Per major feature
API Specifications	Per endpoint
Code Review	Daily
Technical Decisions	As needed
Interview Questions
Technical Questions:

Explain how you would design a session management system that handles 100+ concurrent vehicle entries.
What's your approach to database schema design for a multi-tenant system?
How do you handle authentication and authorization in a web application?
Describe your CI/CD pipeline setup for a NestJS + React project.
Architecture Questions:

How would you scale this application if we need to handle 10x more traffic?
What's your approach to technical debt?
How do you balance feature delivery with code quality?
Salary Range (Vietnam): 40-60M VND/month

2.3 Backend Developer (BE)
Overview
Attribute	Value
Headcount	2
Employment	Full-time
Experience	2-4 years
Priority	High
Required Skills
Skill	Level	Description
TypeScript	Advanced	Strong typing, generics
NestJS	Advanced	Controllers, services, modules
Prisma/ORM	Advanced	Database operations
REST API	Expert	Design and implementation
SQL	Advanced	Query optimization
Testing	Intermediate	Unit, integration tests
Nice-to-Have Skills
Skill	Description
Redis	Caching
Docker	Containerization
WebSocket	Real-time features
Payment Integration	Bank APIs, VNPay, MoMo
OCR Integration	License plate recognition
Key Responsibilities
Implement API endpoints as per specifications
Write clean, maintainable TypeScript code
Create database migrations
Write unit and integration tests
Participate in code reviews
Document APIs using Swagger
Deliverables
Deliverable	Frequency
API Endpoints	Per sprint
Unit Tests	Per feature
Database Migrations	As needed
API Documentation	Per endpoint
Interview Questions
Technical Questions:

Explain the difference between a service and a controller in NestJS.
How do you handle database transactions in Prisma?
What's your approach to error handling in APIs?
How do you secure an API endpoint?
Coding Challenge:

Create a simple CRUD API for managing vehicle sessions
Include input validation and error handling
Add basic authentication
Salary Range (Vietnam): 20-35M VND/month

2.4 Frontend Developer (FE)
Overview
Attribute	Value
Headcount	2
Employment	Full-time
Experience	2-4 years
Priority	High
Required Skills
Skill	Level	Description
TypeScript	Advanced	Strong typing
React 18+	Expert	Hooks, context, performance
Vite	Intermediate	Build tooling
TailwindCSS	Advanced	Styling
TanStack Query	Advanced	Server state
Zustand/Redux	Intermediate	Client state
Testing	Intermediate	Vitest, React Testing Library
Nice-to-Have Skills
Skill	Description
shadcn/ui	Component library
React Hook Form	Form handling
Zod	Schema validation
PWA	Progressive web app
i18n	Internationalization
Key Responsibilities
Implement UI components as per design
Create responsive layouts
Integrate with backend APIs
Handle client-side state
Write component tests
Optimize application performance
Deliverables
Deliverable	Frequency
UI Components	Per sprint
Page Implementations	Per feature
Component Tests	Per component
Performance Reports	Monthly
Interview Questions
Technical Questions:

Explain React's useEffect cleanup function and when to use it.
How do you handle API state with TanStack Query?
What's your approach to form validation in React?
How do you optimize React application performance?
Coding Challenge:

Create a vehicle search form with real-time results
Include loading, error, and empty states
Make it responsive for desktop and tablet
Salary Range (Vietnam): 20-35M VND/month

2.5 QA Engineer
Overview
Attribute	Value
Headcount	1
Employment	Full-time
Experience	2-4 years
Priority	Medium
Required Skills
Skill	Level	Description
Test Planning	Expert	Create test plans, test cases
Manual Testing	Expert	Functional, regression, UAT
API Testing	Advanced	Postman, REST client
E2E Testing	Intermediate	Playwright, Cypress
Bug Tracking	Expert	Jira, linear, bug lifecycle
Documentation	Advanced	Test reports, coverage
Nice-to-Have Skills
Skill	Description
Performance Testing	k6, Artillery
Security Testing	OWASP basics
SQL	Data verification
Automation	Test automation frameworks
CI/CD Integration	Automated testing in pipeline
Key Responsibilities
Create and maintain test plans
Execute manual testing for new features
Develop automated E2E tests
Report and track bugs
Verify bug fixes
Conduct regression testing
Deliverables
Deliverable	Frequency
Test Plans	Per feature
Test Cases	Per sprint
Bug Reports	As found
Test Reports	Per release
E2E Tests	Per feature
Interview Questions
Technical Questions:

How do you prioritize which tests to automate?
Describe your bug reporting process.
How do you handle a situation where developers can't reproduce a bug?
What's your approach to regression testing?
Scenario Questions:

A critical bug is found just before release. What do you do?
How do you test an API without documentation?
Salary Range (Vietnam): 15-25M VND/month

2.6 UI/UX Designer (Part-time/Contract)
Overview
Attribute	Value
Headcount	1
Employment	Part-time / Contract
Experience	2-4 years
Priority	Medium (Can start later)
Required Skills
Skill	Level	Description
Figma	Expert	Design tool
UI Design	Expert	Visual design, layouts
UX Design	Advanced	User flows, wireframes
Design Systems	Advanced	Components, tokens
Prototyping	Intermediate	Interactive prototypes
Nice-to-Have Skills
Skill	Description
HTML/CSS	Implementation knowledge
Accessibility	WCAG guidelines
Motion Design	Animations, transitions
User Research	Interviews, testing
Key Responsibilities
Create UI mockups in Figma
Design user flows and wireframes
Build and maintain design system
Create interactive prototypes
Collaborate with developers
Deliverables
Deliverable	Frequency
UI Mockups	Per screen
Design System	Initial + updates
Prototypes	Per feature
Assets	As needed
Interview Questions
Portfolio Review:

Walk us through your design process for a recent project.
How do you handle feedback from stakeholders?
How do you ensure designs are accessible?
Scenario Questions:

How would you design a form that needs to capture 20+ fields?
A developer says your design is too complex to implement. What do you do?
Salary Range (Vietnam): 15-25M VND/month (part-time: 8-15M)

2.7 DevOps Engineer (Part-time/Outsource)
Overview
Attribute	Value
Headcount	1
Employment	Part-time / Contract
Experience	3-5 years
Priority	Medium (Can start later)
Required Skills
Skill	Level	Description
Docker	Expert	Containerization
CI/CD	Expert	GitHub Actions, Jenkins
Linux	Advanced	Server administration
Nginx	Advanced	Web server, reverse proxy
PostgreSQL	Intermediate	Database administration
Monitoring	Intermediate	Logs, metrics, alerts
Nice-to-Have Skills
Skill	Description
Kubernetes	Container orchestration
AWS/GCP	Cloud platforms
Terraform	Infrastructure as code
Security	Hardening, SSL/TLS
Key Responsibilities
Set up and maintain CI/CD pipelines
Configure Docker environments
Manage server infrastructure
Set up monitoring and logging
Handle deployments
Ensure system security
Deliverables
Deliverable	Frequency
CI/CD Pipeline	Initial setup
Docker Configs	Per environment
Deployment Scripts	Per release
Monitoring Setup	Initial + updates
Interview Questions
Technical Questions:

Describe your CI/CD pipeline setup for a Node.js application.
How do you handle database migrations in production?
What's your approach to zero-downtime deployments?
How do you monitor application health?
Salary Range (Vietnam): 30-45M VND/month (part-time: 15-25M)

2.8 Product Manager / Project Manager
Overview
Attribute	Value
Headcount	1
Employment	Full-time or Part-time
Experience	3-5 years
Priority	Medium
Required Skills
Skill	Level	Description
Product Management	Expert	Roadmap, prioritization
Project Management	Expert	Timelines, resources
Stakeholder Management	Expert	Communication, alignment
Agile/Scrum	Expert	Sprint planning, ceremonies
Documentation	Advanced	PRDs, release notes
Nice-to-Have Skills
Skill	Description
Technical Background	Understanding of development
Logistics Domain	Industry knowledge
Analytics	Data-driven decisions
Vietnamese Business	Local market knowledge
Key Responsibilities
Define product roadmap
Prioritize features and bug fixes
Manage sprint planning
Coordinate with stakeholders
Track project progress
Manage risks and blockers
Deliverables
Deliverable	Frequency
Product Roadmap	Quarterly
Sprint Plans	Bi-weekly
Status Reports	Weekly
Release Notes	Per release
Interview Questions
Technical Questions:

How do you prioritize features when everything seems important?
Describe your process for gathering user feedback.
How do you handle scope creep?
Salary Range (Vietnam): 25-40M VND/month

3. Team Phasing Plan
Phase 1: MVP (Months 1-3)
Role	Headcount	Start
Technical Lead	1	Week 1
Backend Developer	2	Week 1
Frontend Developer	1	Week 2
Business Analyst	1	Week 1
Total	5	
Phase 2: Growth (Months 4-6)
Role	Headcount	Start
+ Frontend Developer	1	Month 4
+ QA Engineer	1	Month 4
+ UI/UX Designer	0.5	Month 4
Total	7.5	
Phase 3: Mature (Months 7+)
Role	Headcount	Start
+ DevOps Engineer	0.5	Month 7
+ Product Manager	1	Month 7
Total	9	
4. Hiring Timeline
Week 1-2:  Technical Lead (CRITICAL)
Week 2-4:  Backend Developers x2
Week 3-4:  Frontend Developer
Week 1-4:  Business Analyst
Month 2:   QA Engineer
Month 3:   UI/UX Designer (part-time)
Month 4+:  DevOps (as needed)
5. Interview Process
5.1 Standard Process
Round	Duration	Focus
HR Screen	30 min	Background, availability, salary
Technical	60 min	Skills assessment, coding
Team Fit	45 min	Culture, communication
Final	30 min	Offer discussion
5.2 Technical Assessment
Role	Assessment Type
Technical Lead	System design + Architecture review
Backend Dev	Coding challenge + API design
Frontend Dev	Coding challenge + UI implementation
QA	Test plan creation + Bug hunting
BA	Requirements analysis exercise
6. Onboarding Checklist
Week 1
 Access to GitHub repository
 Access to project management tool (Linear/Jira)
 Access to documentation (docs/)
 Development environment setup
 Introduction to team members
 Review of project overview
Week 2
 Code walkthrough with Tech Lead
 First task assignment
 Architecture overview
 Deployment process walkthrough
Week 3-4
 Full integration into sprint
 Code review participation
 Documentation contribution
7. Salary Summary
Role	Experience	Range (M VND/mo)	Avg
Technical Lead	5-8 yrs	40-60	50
Backend Dev	2-4 yrs	20-35	27.5
Frontend Dev	2-4 yrs	20-35	27.5
Business Analyst	2-4 yrs	15-25	20
QA Engineer	2-4 yrs	15-25	20
UI/UX Designer	2-4 yrs	15-25	20
DevOps	3-5 yrs	30-45	37.5
Product Manager	3-5 yrs	25-40	32.5
Estimated Monthly Burn (Phase 1 - 5 people): ~145M VND Estimated Monthly Burn (Phase 2 - 7.5 people): ~210M VND Estimated Monthly Burn (Phase 3 - 9 people): ~280M VND

8. Job Postings Template
Backend Developer
TITLE: Backend Developer (NestJS/TypeScript)

ABOUT US:
KimThanhLogistics đang xây dựng hệ thống quản lý bãi xe container hiện đại.
Chúng tôi tìm kiếm Backend Developer để tham gia phát triển nền tảng core.

REQUIREMENTS:
- 2+ năm kinh nghiệm Node.js/TypeScript
- Có kinh nghiệm với NestJS framework
- Hiểu biết về PostgreSQL và ORM (Prisma ưu tiên)
- Có kinh nghiệm viết REST API
- Có kinh nghiệm với unit testing

NICE TO HAVE:
- Redis, Docker
- Payment gateway integration
- OCR integration

BENEFITS:
- Lương cạnh tranh (20-35M VND)
- Remote linh hoạt
- Bảo hiểm sức khỏe
- 13th month salary

CONTACT: [email]
Frontend Developer
TITLE: Frontend Developer (React/TypeScript)

ABOUT US:
KimThanhLogistics đang xây dựng hệ thống quản lý bãi xe container hiện đại.
Chúng tôi tìm kiếm Frontend Developer để xây dựng giao diện người dùng.

REQUIREMENTS:
- 2+ năm kinh nghiệm React
- TypeScript proficiency
- Có kinh nghiệm với TailwindCSS
- Hiểu biết về state management (Zustand, TanStack Query)
- Responsive design

NICE TO HAVE:
- shadcn/ui
- React Hook Form + Zod
- Vite
- Testing (Vitest, Playwright)

BENEFITS:
- Lương cạnh tranh (20-35M VND)
- Remote linh hoạt
- Bảo hiểm sức khỏe
- 13th month salary

CONTACT: [email]
---