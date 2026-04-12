import { useState, useEffect } from "react";

const EUI = {
  office:    { new: 130, mid: 185, old: 235, vold: 285 },
  retail:    { new: 180, mid: 260, old: 320, vold: 380 },
  warehouse: { new: 65,  mid: 100, old: 135, vold: 165 },
  hotel:     { new: 210, mid: 290, old: 360, vold: 420 },
  mixed:     { new: 155, mid: 220, old: 275, vold: 330 },
};

const EF = {
  dk_grid:   { s1: 0,     s2: 0.130 },
  eu_grid:   { s1: 0,     s2: 0.230 },
  district:  { s1: 0,     s2: 0.060 },
  gas:       { s1: 0.202, s2: 0 },
  oil:       { s1: 0.266, s2: 0 },
  renewable: { s1: 0,     s2: 0.020 },
};

const BENCHMARKS = [
  { name: "EU Taxonomy (Paris-aligned 2030)", target: 20 },
  { name: "Danish Energy Class A",            target: 25 },
  { name: "BREEAM Excellent (Nordic)",        target: 35 },
  { name: "EU average commercial building",   target: 60 },
  { name: "EU regulatory minimum (EPBD)",     target: 90 },
];

function getRating(intensity) {
  if (intensity <= 20) return { label: "Excellent — Paris-aligned", color: "#0F6E56", bg: "#E1F5EE", pct: 8,  desc: "This building is aligned with the 2030 Paris Agreement targets for commercial real estate." };
  if (intensity <= 40) return { label: "Good — above average",      color: "#0F6E56", bg: "#C0DD97", pct: 30, desc: "This building performs above the EU average and meets Danish Energy Class A standards." };
  if (intensity <= 75) return { label: "Average — room to improve", color: "#854F0B", bg: "#FAEEDA", pct: 62, desc: "This building is around the EU average. Significant reduction potential through efficiency measures." };
  return                       { label: "Poor — high carbon risk",   color: "#A32D2D", bg: "#FCEBEB", pct: 88, desc: "This building is at risk of regulatory non-compliance as EU standards tighten toward 2030." };
}

export default function CO2BenchmarkCalculator() {
  const [btype,  setBtype]  = useState("office");
  const [area,   setArea]   = useState(2000);
  const [energy, setEnergy] = useState("dk_grid");
  const [age,    setAge]    = useState("mid");
  const [occ,    setOcc]    = useState(0.8);

  const euiVal   = EUI[btype][age] * occ;
  const totalKwh = euiVal * area;
  const ef       = EF[energy];
  const s1_kg    = totalKwh * ef.s1;
  const s2_kg    = totalKwh * ef.s2;
  const total_kg = s1_kg + s2_kg;
  const s3_kg    = total_kg * 0.25;
  const intensity = total_kg / area;
  const total_t  = total_kg / 1000;
  const s1_t     = s1_kg / 1000;
  const s2_t     = s2_kg / 1000;
  const s3_t     = s3_kg / 1000;

  const rating = getRating(intensity);

  const selectStyle = {
    width: "100%", padding: "8px 10px", fontSize: 14,
    border: "0.5px solid #ddd", borderRadius: 8,
    background: "#fff", color: "#1a1a1a", cursor: "pointer",
  };
  const inputStyle = {
    width: "100%", padding: "8px 10px", fontSize: 14,
    border: "0.5px solid #ddd", borderRadius: 8,
    background: "#fff", color: "#1a1a1a",
  };
  const labelStyle = { fontSize: 13, color: "#666", marginBottom: 6, display: "block" };
  const fieldStyle = { display: "flex", flexDirection: "column" };
  const sectionLabel = { fontSize: 11, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px", color: "#1a1a1a" }}>CO₂ Benchmark Calculator</h1>
        <p style={{ fontSize: 14, color: "#888", margin: 0 }}>Commercial real estate carbon footprint estimator — GHG Protocol methodology</p>
      </div>

      {/* Inputs */}
      <p style={sectionLabel}>Building details</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Building type</label>
          <select value={btype} onChange={e => setBtype(e.target.value)} style={selectStyle}>
            <option value="office">Office</option>
            <option value="retail">Retail / Shopping</option>
            <option value="warehouse">Warehouse / Logistics</option>
            <option value="hotel">Hotel / Hospitality</option>
            <option value="mixed">Mixed use</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Floor area (m²)</label>
          <input type="number" value={area} min={100} max={500000}
            onChange={e => setArea(parseFloat(e.target.value) || 0)} style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Primary energy source</label>
          <select value={energy} onChange={e => setEnergy(e.target.value)} style={selectStyle}>
            <option value="dk_grid">DK grid electricity</option>
            <option value="eu_grid">EU avg grid electricity</option>
            <option value="district">District heating (DK)</option>
            <option value="gas">Natural gas</option>
            <option value="oil">Heating oil</option>
            <option value="renewable">On-site renewables</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Building age</label>
          <select value={age} onChange={e => setAge(e.target.value)} style={selectStyle}>
            <option value="new">2015 or newer</option>
            <option value="mid">2000–2014</option>
            <option value="old">1980–1999</option>
            <option value="vold">Before 1980</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Occupancy rate</label>
          <select value={occ} onChange={e => setOcc(parseFloat(e.target.value))} style={selectStyle}>
            <option value={1.0}>100% — full</option>
            <option value={0.8}>80% — typical</option>
            <option value={0.6}>60% — partial</option>
            <option value={0.4}>40% — low</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "0.5px solid #e5e5e5", margin: "0 0 1.5rem" }} />

      {/* Metric cards */}
      <p style={sectionLabel}>Carbon footprint results</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total CO₂ (Scope 1+2)", value: total_t.toFixed(1), unit: "tonnes CO₂e / year" },
          { label: "Carbon intensity",       value: intensity.toFixed(1), unit: "kg CO₂e / m² / year" },
          { label: "Energy use intensity",   value: Math.round(euiVal),  unit: "kWh / m² / year" },
        ].map(m => (
          <div key={m.label} style={{ background: "#f5f5f5", borderRadius: 8, padding: "12px 14px" }}>
            <p style={{ fontSize: 11, color: "#888", margin: "0 0 4px" }}>{m.label}</p>
            <p style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{m.value}</p>
            <p style={{ fontSize: 11, color: "#888", margin: "2px 0 0" }}>{m.unit}</p>
          </div>
        ))}
      </div>

      {/* Rating bar */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...sectionLabel, marginBottom: 4 }}>Performance rating</p>
        <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: rating.bg, color: rating.color, marginBottom: 6 }}>
          {rating.label}
        </span>
        <p style={{ fontSize: 13, color: "#888", margin: "4px 0 10px" }}>{rating.desc}</p>
        <div style={{ height: 10, borderRadius: 5, background: "linear-gradient(to right, #1D9E75, #63a820, #EF9F27, #E24B4A)", position: "relative", marginBottom: 20 }}>
          <div style={{ position: "absolute", top: -5, left: `${rating.pct}%`, width: 4, height: 20, background: "#1a1a1a", borderRadius: 2, transform: "translateX(-50%)", transition: "left 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}>
          <span>Excellent</span><span>Good</span><span>Average</span><span>Poor</span>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid #e5e5e5", margin: "0 0 1.5rem" }} />

      {/* Scope breakdown */}
      <p style={sectionLabel}>Scope breakdown</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
        {[
          { scope: "Scope 1", name: "Direct emissions",    value: s1_t.toFixed(1) },
          { scope: "Scope 2", name: "Purchased energy",    value: s2_t.toFixed(1) },
          { scope: "Scope 3 (est.)", name: "Embodied + indirect", value: s3_t.toFixed(1) },
        ].map(s => (
          <div key={s.scope} style={{ border: "0.5px solid #e5e5e5", borderRadius: 8, padding: 12 }}>
            <p style={{ fontSize: 11, color: "#888", margin: "0 0 2px" }}>{s.scope}</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a", margin: "0 0 8px" }}>{s.name}</p>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#888", margin: "2px 0 0" }}>tCO₂e / year</p>
          </div>
        ))}
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid #e5e5e5", margin: "0 0 1.5rem" }} />

      {/* Benchmark table */}
      <p style={sectionLabel}>Benchmark comparison</p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["Standard / target", "Threshold (kg CO₂e/m²)", "Status"].map(h => (
              <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 500, color: "#888", padding: "6px 8px", borderBottom: "0.5px solid #e5e5e5" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BENCHMARKS.map((b, i) => {
            const met = intensity <= b.target;
            const closest = BENCHMARKS.reduce((prev, curr) => Math.abs(curr.target - intensity) < Math.abs(prev.target - intensity) ? curr : prev);
            const isClosest = b.target === closest.target;
            return (
              <tr key={b.name} style={{ background: isClosest ? "#f5f5f5" : "transparent" }}>
                <td style={{ padding: "8px", borderBottom: "0.5px solid #e5e5e5", fontWeight: isClosest ? 500 : 400, color: "#1a1a1a" }}>{b.name}</td>
                <td style={{ padding: "8px", borderBottom: "0.5px solid #e5e5e5", color: "#1a1a1a" }}>{b.target}</td>
                <td style={{ padding: "8px", borderBottom: "0.5px solid #e5e5e5" }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: met ? "#1D9E75" : "#E24B4A", marginRight: 6, verticalAlign: "middle" }} />
                  <span style={{ color: "#1a1a1a" }}>{met ? "Meets target" : "Does not meet"}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Methodology note */}
      <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6, borderTop: "0.5px solid #e5e5e5", paddingTop: "1rem", marginTop: "1.5rem" }}>
        Methodology: Emission factors from Energinet (DK grid 0.13 kgCO₂/kWh, 2023), EEA (EU avg 0.23), Danish Energy Agency (district 0.06), IPCC 2006 (gas 0.202, oil 0.266). EUI baselines from IEA Commercial Buildings & CBRE Nordic reports. Scope 3 estimated at 25% of Scope 1+2. Covers operational carbon only.
      </p>
    </div>
  );
}
