# Installation Guide - PRABC

## Prerequisites

- Python 3.7+
- pip (Python package manager)
- Virtual environment (recommended)

## Backend Setup (Flask Web App)

### 1. Clone Repository
```bash
git clone https://github.com/pavanbadempet/PRABC.git
cd PRABC
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

Required packages:
- Flask
- scikit-learn
- joblib
- numpy
- pandas

### 4. Run Application
```bash
python app.py
```

Visit `http://localhost:5000`

## Android App Setup

### 1. Prerequisites
- Android Studio
- Android SDK 21+
- Kotlin/Java compiler

### 2. Open Project
```bash
cd PRABC-Android
open in Android Studio
```

### 3. Build & Run
```bash
# Build APK
./gradlew build

# Run on emulator/device
./gradlew installDebug
```

## Windows/MacOS App Setup

### 1. Prerequisites
- Java JDK 11+
- JavaFX SDK

### 2. Build
```bash
cd PRABC-Desktop
java -jar build/PRABC.jar
```

## Testing

### 1. Test Predictions
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "family_history": 1,
    "tumor_size": 2.5,
    "tumor_grade": 2
  }'
```

## Troubleshooting

### Flask app won't start
```bash
python app.py  # Check for error messages
```

### Module import errors
```bash
pip install --upgrade -r requirements.txt
```

---

See [USAGE.md](USAGE.md) for how to use the app.