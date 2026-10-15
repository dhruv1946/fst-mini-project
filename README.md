# MarketPress — Verified Campus Engineering Hardware & Textbook Exchange

🌐 **Live Deployment:** [https://fst-mini-project-tan.vercel.app/](https://fst-mini-project-tan.vercel.app/)

MarketPress is a verified student-to-student marketplace and engineering community platform for borrowing and renting microcontrollers, sensor kits, lab test equipment, and academic reference textbooks.

---

## 🚀 Key Features

* **Verified Student Auth & Security**: Google and GitHub OAuth 2.0 single-sign-on with domain verification, credentials login, and role-based access control (`ADMIN` and `STUDENT`).
* **Concurrency-Safe Atomic Reservations**: Mutex-locked reservation engine preventing double-claiming during simultaneous rental requests.
* **Deep Hardware Technical Inspection**: Detailed product specs, pinouts, wear grading, security deposit terms, and designated lab pickup lockers.
* **Digital Transaction Receipts**: Instant receipt generation with verification tokens and QR code handoff badges.
* **Student Inventory Dashboard**: Private portal for monitoring active reservations, managing posted gear, and listing new hardware.
* **Campus Tech Q&A Forum**: Peer-to-peer discussion threads, hardware debugging help, upvoting, and accepted solution badges.
* **Moderator Queue**: Protected administrative desk for approving listings and managing dispute resolution.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React Server Components)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database & ORM**: [Prisma ORM 7](https://www.prisma.io/) with dual-tier PostgreSQL & in-memory persistence
* **Authentication**: OAuth 2.0 (Google & GitHub) + Cookie session management
* **Styling**: Vanilla CSS with custom cyber-academic design tokens
* **Icons**: [Lucide React](https://lucide.dev/)
* **Deployment**: [Vercel](https://vercel.com/)

---

## 💻 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dhruv1946/fst-mini-project.git
   cd fst-mini-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live URL
Visit the live deployment at [https://fst-mini-project-tan.vercel.app/](https://fst-mini-project-tan.vercel.app/).
