# ❤️ Heart Disease Prediction System

A comprehensive Machine Learning application that predicts the likelihood of heart disease based on clinical parameters. The project features a **FastAPI** backend, a **React (Vite)** frontend, and is fully containerized using **Docker**.

---

## 🚀 Features

- **Real-time Prediction**: Instant feedback based on medical data.
- **Modern UI**: Intuitive and responsive interface built with React.
- **FastAPI Backend**: High-performance API for model inference.
- **Dockerized Architecture**: Seamless deployment using Docker and Docker Compose.
- **Data Scaling**: Robust preprocessing using Scikit-learn's standard scaler.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js (Vite)
- **Styling**: CSS3 (Vanilla)
- **Tooling**: ESLint, PostCSS

### Backend

- **Framework**: FastAPI
- **Server**: Uvicorn
- **ML Libraries**: Scikit-Learn, Pandas, NumPy, Pickle

### DevOps & Deployment

- **Containerization**: Docker, Docker Compose
- **Platform Support**: Optimized for Render (Backend) and Netlify/Vercel (Frontend)

---

## 📦 Project Structure

```text
.
├── app.py              # FastAPI application & ML Inference
├── model.pkl           # Trained ML Model
├── scaler.pkl          # Pre-fitted Standard Scaler
├── columns.pkl         # Feature column names
├── requirements.txt    # Python dependencies
├── Dockerfile          # Backend Docker config
├── docker-compose.yml  # Local orchestration
├── frontend/           # React frontend project
│   ├── src/            # Components & Logic
│   └── Dockerfile      # Frontend Docker config
└── ...
```

---

## 🛠️ Installation & Setup

### Option 1: Using Docker (Recommended)

Ensure you have [Docker](https://www.docker.com/) installed.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/s479mondal/Heart-Disease-Prediction.git
   cd Heart-Disease-Prediction
   ```

2. **Run with Docker Compose**:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

### Option 2: Manual Local Setup

#### Backend

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   uvicorn app:app --reload --port 8000
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📡 API Documentation

### POST `/predict`

Predict heart disease status based on clinical parameters.

**Request Body:**

| Field      | Description                                                       | Example |
| :--------- | :---------------------------------------------------------------- | :------ |
| `age`      | Age in years                                                      | `52`    |
| `sex`      | Gender (1 = male; 0 = female)                                     | `1`     |
| `cp`       | Chest pain type (0-3)                                             | `0`     |
| `trestbps` | Resting blood pressure (mm Hg)                                    | `125`   |
| `chol`     | Serum cholestoral (mg/dl)                                         | `212`   |
| `fbs`      | Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)             | `0`     |
| `restecg`  | Resting electrocardiographic results (0-2)                        | `1`     |
| `thalach`  | Maximum heart rate achieved                                       | `168`   |
| `exang`    | Exercise induced angina (1 = yes; 0 = no)                         | `0`     |
| `oldpeak`  | ST depression induced by exercise relative to rest                | `1.0`   |
| `slope`    | The slope of the peak exercise ST segment                         | `2`     |
| `ca`       | Number of major vessels (0-3) colored by flourosopy               | `2`     |
| `thal`     | Thalassemia (1 = normal; 2 = fixed defect; 3 = reversable defect) | `3`     |

**Example JSON Body:**

```json
{
  "age": 52,
  "sex": 1,
  "cp": 0,
  "trestbps": 125,
  "chol": 212,
  "fbs": 0,
  "restecg": 1,
  "thalach": 168,
  "exang": 0,
  "oldpeak": 1.0,
  "slope": 2,
  "ca": 2,
  "thal": 3
}
```

**Response:**

```json
{
  "prediction": 1,
  "result": "Heart Disease Detected"
}
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
