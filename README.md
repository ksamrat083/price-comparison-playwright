# 📦 Product Price Comparison: Flipkart vs Amazon (Playwright + TypeScript)

This project automates an end-to-end test using **Playwright** and **TypeScript** to compare the price of the product **"iPhone 15 Plus"** on Flipkart and Amazon.

---

## 🎯 Objective

- Open both Flipkart and Amazon in parallel.
- Search for the product "iPhone 15 Plus" on both sites.
- Extract the price of the first matching result from each.
- Compare the prices.
- Pass if **Flipkart price is less than Amazon**, fail otherwise.
- Output prices clearly in console and trace reports.

---

## ✅ Features

- 🚀 Uses **Playwright with TypeScript**
- ⏱️ Executes **both sites in parallel**
- 📦 Extracts and compares **real-time product price**
- ✅ Adds **multiple assertions** (URL, title, visibility, comparison)
- 📋 Generates **Playwright HTML test reports**
- 🔍 Supports **trace viewer** for debugging failures
- 🧪 Designed for **robust testing and interview readiness**

---

## 🧰 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- Git / GitHub (Version Control)

---

## 📂 Project Structure

price-comparison/
├── tests/
│ └── price-comparison.spec.ts # Main test file
├── test-results/ # Auto-generated Playwright reports
├── playwright.config.ts # Playwright config file
├── tsconfig.json # TypeScript config
├── package.json
├── README.md

---

## 🚀 Setup & Run

### 1. Clone the Repository
bash
git clone https://github.com/ksamrat083/price-comparison-playwright
cd price-comparison

### 2. Install Dependencies
npm install

### 3. Run the Test
npx playwright test

### 4. View HTML Report
npx playwright show-report

### 5. Run Test with Trace
npx playwright test --trace on

🧪 Sample Console Output
🟦 Flipkart Price: ₹74900
🟧 Amazon  Price: ₹72490
❌ Flipkart is not cheaper.

📌 Acceptance Criteria Checklist
Feature	                              Status
Navigate to Flipkart & Amazon	           ✅
Validate URLs and page titles	           ✅
Product search on both sites	           ✅
Extract & compare prices	               ✅
Pass/fail based on price logic	         ✅
Parallel execution	                     ✅
Trace + HTML reports	                   ✅
Use of Playwright with TypeScript	       ✅
Meaningful console output & assertions	 ✅

📷 Screenshots
Use npx playwright show-report to view the test results, traces, and screenshots in your browser.

👨‍💻 Author
Samrat Kavide

💼 GitHub: @samratkavide

📜 License
This project is licensed under the MIT License.

📚 References
Playwright Official Docs

TypeScript Docs

MDN Web Docs

---

### ✅ Next Steps
- Add a LICENSE file (MIT or Apache recommended)
- Push the `README.md` to your GitHub repo
- Optional: Add badges (build passing, license, etc.)

Let me know if you'd like a version with badges or auto-deploy with GitHub Actions!
