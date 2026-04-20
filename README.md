# CO₂ Benchmark Calculator
### Commercial Real Estate Carbon Footprint Estimator

A interactive web tool for estimating and benchmarking CO₂ emissions from commercial buildings, built using React and grounded in the GHG Protocol Corporate Standard.

🔗 **Live demo:** [jacob-hub-esg.github.io/my-calculator](https://jacob-hub-esg.github.io/my-calculator)

---

## What it does

Enter a few details about a building — type, floor area, energy source, age, and occupancy — and the tool instantly calculates:

- Total CO₂ emissions in tonnes per year (Scope 1 + 2)
- Carbon intensity in kg CO₂e / m² / year
- Energy Use Intensity (kWh / m² / year)
- Scope 1, 2, and 3 breakdown
- Performance rating with a visual indicator
- Benchmark comparison against 5 real standards

---

## Benchmarks included

| Standard | Threshold |
|---|---|
| EU Taxonomy — Paris-aligned 2030 | ≤ 20 kg CO₂e/m² |
| Danish Energy Class A | ≤ 25 kg CO₂e/m² |
| BREEAM Excellent (Nordic) | ≤ 35 kg CO₂e/m² |
| EU average commercial building | ~60 kg CO₂e/m² |
| EU regulatory minimum (EPBD) | ≤ 90 kg CO₂e/m² |

---

## Methodology

Calculations follow the **GHG Protocol Corporate Accounting and Reporting Standard**.

**Emission factors used:**

| Energy source | Scope | kg CO₂e / kWh | Source |
|---|---|---|---|
| Danish grid electricity | Scope 2 | 0.130 | Energinet, 2023 |
| EU average grid | Scope 2 | 0.230 | EEA, 2023 |
| District heating (DK) | Scope 2 | 0.060 | Danish Energy Agency, 2023 |
| Natural gas | Scope 1 | 0.202 | IPCC 2006 |
| Heating oil | Scope 1 | 0.266 | IPCC 2006 |
| On-site renewables | Scope 2 | 0.020 | IPCC lifecycle average |

Where direct meter data is unavailable, **Energy Use Intensity (EUI)** benchmarks are applied based on building type and construction era, sourced from IEA Commercial Buildings data (2022) and the CBRE Nordic Sustainability Benchmark (2023).

Scope 3 is estimated at 25% of Scope 1+2 as a proxy for operational phase indirect emissions. This tool covers operational carbon only — embodied carbon from construction is excluded.

---

## Built with

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- Deployed via [GitHub Pages](https://pages.github.com/)

---

## Running locally

```bash
git clone https://github.com/jacob-hub-esg/my-calculator.git
cd my-calculator
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project context

This tool was built as part of a personal project exploring carbon accounting methodology for commercial real estate — a sector responsible for approximately 18% of global CO₂ emissions. It accompanies a full carbon accounting methodology writeup and a sample carbon performance report for a fictional Danish retail portfolio (Vesterbro Retail Partners A/S), both benchmarked against EU Taxonomy and Danish national energy standards.

---

## Author

**Joatham Jacob**  
linkedin.com/in/joatham-jacob · joathamjacob@gmail.com
