import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  User, 
  Activity, 
  Stethoscope, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react'
import './App.css'

const FORM_STEPS = [
  { id: 'profile', title: 'Basic Profile', icon: User },
  { id: 'clinical', title: 'Physical Stats', icon: Stethoscope },
  { id: 'performance', title: 'Cardiac Activity', icon: Activity },
]

const INITIAL_DATA = {
  age: 50,
  sex: 1,
  cp: 0,
  trestbps: 120,
  chol: 200,
  fbs: 0,
  restecg: 0,
  thalach: 150,
  exang: 0,
  oldpeak: 1.0,
  slope: 1,
  ca: 0,
  thal: 2
}

function App() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(INITIAL_DATA)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }))
  }

  const nextStep = () => setStep(s => Math.min(s + 1, FORM_STEPS.length - 1))
  const prevStep = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setPrediction(null)
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setPrediction(data)
    } catch {
      setError("Unable to connect to prediction service. Please ensure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(0)
    setPrediction(null)
    setFormData(INITIAL_DATA)
  }

  return (
    <div className="container">
      {/* Decorative Background Elements */}
      <div className="bg-decoration blur-1"></div>
      <div className="bg-decoration blur-2"></div>
      
      <header className="header">
        <div className="logo">
          <Heart className="heart-icon" size={40} />
          <h1>Cardio Scan <span className="premium-tag">PRO</span></h1>
        </div>
        <p className="subtitle">Precision AI Diagnostic for Heart Condition Risk</p>
      </header>

      {!prediction ? (
        <Motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card main-card"
        >
          <div className="wizard-progress">
            {FORM_STEPS.map((s, idx) => (
              <div key={s.id} className={`step-item ${idx <= step ? 'active' : ''}`}>
                <div className="step-icon">
                  <s.icon size={24} />
                </div>
                <span className="step-label">{s.title}</span>
                {idx < FORM_STEPS.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <Motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="step-content"
            >
              {step === 0 && (
                <div className="form-grid">
                  <div className="input-group">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 45" />
                    <p className="help-text">Years</p>
                  </div>
                  <div className="input-group">
                    <label>Gender</label>
                    <select name="sex" value={formData.sex} onChange={handleChange}>
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  </div>
                  <div className="input-group full">
                    <label>Chest Pain Type</label>
                    <select name="cp" value={formData.cp} onChange={handleChange}>
                      <option value="0">Typical Angina</option>
                      <option value="1">Atypical Angina</option>
                      <option value="2">Non-anginal Pain</option>
                      <option value="3">Asymptomatic</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="form-grid">
                  <div className="input-group">
                    <label>Resting Blood Pressure</label>
                    <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} />
                    <p className="help-text">mm Hg (ideal: 120)</p>
                  </div>
                  <div className="input-group">
                    <label>Serum Cholestoral</label>
                    <input type="number" name="chol" value={formData.chol} onChange={handleChange} />
                    <p className="help-text">mg/dl (ideal: &lt;200)</p>
                  </div>
                  <div className="input-group">
                    <label>Fasting Blood Sugar</label>
                    <select name="fbs" value={formData.fbs} onChange={handleChange}>
                      <option value="0">Normal (&lt;120 mg/dl)</option>
                      <option value="1">Elevated (&gt;120 mg/dl)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Resting ECG</label>
                    <select name="restecg" value={formData.restecg} onChange={handleChange}>
                      <option value="0">Normal</option>
                      <option value="1">ST-T Wave Abnormality</option>
                      <option value="2">LV Hypertrophy</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-grid">
                  <div className="input-group">
                    <label>Max Heart Rate</label>
                    <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} />
                    <p className="help-text">thalach (bpm)</p>
                  </div>
                  <div className="input-group">
                    <label>Exercise Induced Angina</label>
                    <select name="exang" value={formData.exang} onChange={handleChange}>
                      <option value="0">Negative</option>
                      <option value="1">Positive</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>ST Depression (Oldpeak)</label>
                    <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <label>Slope of Peak ST</label>
                    <select name="slope" value={formData.slope} onChange={handleChange}>
                      <option value="0">Upsloping</option>
                      <option value="1">Flat</option>
                      <option value="2">Downsloping</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Major Vessels (CA)</label>
                    <input type="number" min="0" max="3" name="ca" value={formData.ca} onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <label>Thalassemia (Thal)</label>
                    <select name="thal" value={formData.thal} onChange={handleChange}>
                      <option value="1">Normal</option>
                      <option value="2">Fixed Defect</option>
                      <option value="3">Reversable Defect</option>
                    </select>
                  </div>
                </div>
              )}
            </Motion.div>
          </AnimatePresence>

          <div className="wizard-actions">
            {step > 0 && (
              <button className="btn-secondary" onClick={prevStep}>
                <ChevronLeft size={18} /> Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < FORM_STEPS.length - 1 ? (
              <button className="btn-primary" onClick={nextStep}>
                Next Step <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                className="btn-accent" 
                onClick={handleSubmit} 
                disabled={loading}
              >
                {loading ? 'Analyzing Data...' : 'Calculate Risk'}
                {!loading && <ArrowRight size={18} />}
              </button>
            )}
          </div>
          {error && (
            <div className="error-box">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
        </Motion.div>
      ) : (
        <Motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card result-card"
        >
          <div className={`result-header ${prediction.prediction === 1 ? 'danger' : 'safe'}`}>
            <Motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {prediction.prediction === 1 ? <AlertCircle size={80} /> : <CheckCircle2 size={80} />}
            </Motion.div>
            <h2>Analysis Complete</h2>
            <p className="result-status">Based on your clinical parameters</p>
          </div>
          
          <div className="result-body">
            <div className="prediction-box">
               <span className="label">Cardiac Health Status</span>
               <h3 className={prediction.prediction === 1 ? 'text-danger' : 'text-safe'}>
                 {prediction.result}
               </h3>
            </div>
            
            <div className="recommendation">
              <h4>Professional Recommendations:</h4>
              {prediction.prediction === 1 ? (
                <ul>
                  <li>Schedule an immediate consultation with a cardiologist.</li>
                  <li>Monitor clinical vital signs (BP and HR) daily.</li>
                  <li>Implement heart-healthy dietary changes strictly.</li>
                  <li>Avoid strenuous physical activity until cleared by a doctor.</li>
                </ul>
              ) : (
                <ul>
                  <li>Maintain your consistent healthy lifestyle and nutrition.</li>
                  <li>Continue regular cardiovascular exercises (30 mins/day).</li>
                  <li>Schedule routine follow-up screenings every 12 months.</li>
                  <li>Ensure proper sleep hygiene and stress management.</li>
                </ul>
              )}
            </div>

            <button className="btn-outline" onClick={resetForm}>
              Perform New Analysis
            </button>
          </div>
        </Motion.div>
      )}

      <footer className="footer">
        <p>Project developed by <strong>Soumen Mondal</strong> & <strong>Tiyas Das</strong></p>
        <p>&copy; 2026 Cardio Scan. Developed for Intelligent Clinical Decision Support.</p>
      </footer>
    </div>
  )
}

export default App
