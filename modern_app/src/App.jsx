import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BMICalculator from './pages/tools/BMICalculator';
import GradeCalculator from './pages/tools/GradeCalculator';
import GPACalculator from './pages/tools/GPACalculator';
import PercentageCalculator from './pages/tools/PercentageCalculator';
import ScientificCalculator from './pages/tools/ScientificCalculator';
import AgeCalculator from './pages/tools/AgeCalculator';
import ZodiacCalculator from './pages/tools/ZodiacCalculator';
import LoanEmiCalculator from './pages/tools/LoanEmiCalculator';
import InvestorCalculator from './pages/tools/InvestorCalculator';
import BaseConverter from './pages/tools/BaseConverter';
import UnitConverter from './pages/tools/UnitConverter';
import AlgebraSolver from './pages/tools/AlgebraSolver';
import ColorPicker from './pages/tools/ColorPicker';
import RomanConverter from './pages/tools/RomanConverter';
import LcmGcdCalculator from './pages/tools/LcmGcdCalculator';
import PeriodicTable from './pages/tools/PeriodicTable';
import PhysicsSolver from './pages/tools/PhysicsSolver';
import MatrixCalculator from './pages/tools/MatrixCalculator';

import About from './pages/static/About';
import Contact from './pages/static/Contact';
import Legal from './pages/static/Legal';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/disclaimer" element={<Legal type="disclaimer" />} />

          {/* Tools Routes */}
          <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
          <Route path="/tools/grade-calculator" element={<GradeCalculator />} />
          <Route path="/tools/gpa-calculator" element={<GPACalculator />} />
          <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tools/scientific-calculator" element={<ScientificCalculator />} />
          <Route path="/tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/tools/zodiac-calculator" element={<ZodiacCalculator />} />
          <Route path="/tools/loan-emi-calculator" element={<LoanEmiCalculator />} />
          <Route path="/tools/investor-calculator" element={<InvestorCalculator />} />
          <Route path="/tools/base-converter" element={<BaseConverter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/tools/algebra-solver" element={<AlgebraSolver />} />
          <Route path="/tools/color-picker" element={<ColorPicker />} />
          <Route path="/tools/roman-converter" element={<RomanConverter />} />
          <Route path="/tools/lcm-gcd-calculator" element={<LcmGcdCalculator />} />
          <Route path="/tools/periodic-table" element={<PeriodicTable />} />
          <Route path="/tools/physics-solver" element={<PhysicsSolver />} />
          <Route path="/tools/matrix-calculator" element={<MatrixCalculator />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
