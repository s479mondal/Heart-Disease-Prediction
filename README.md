Cardiovascular disease claims approximately 17.9 million lives annually, making it one of the leading causes of death globally. Early and accurate detection is critical — yet it remains a complex challenge requiring integration of multiple clinical parameters.
This project builds an end-to-end machine learning pipeline that:

Performs Exploratory Data Analysis (EDA) on 13 clinical features
Applies feature engineering, StandardScaler normalization, and PCA
Trains and compares 3 classification models
Deploys a live web application for real-time predictions

Task: Binary Classification — 0 = No Heart Disease | 1 = Heart Disease Present

👥 Team
NameRegistration No.Soumen Mondal25MCA0195Tiyas Das25MCA0236
Course: PAMCA504 – Machine Learning, Winter Semester 2025–26
Institution: School of Computer Science Engineering and Information Systems, VIT Vellore
Submitted To: Dr. T. Ramakumar

📁 Dataset
PropertyDetailsNameHeart Disease Dataset (heart.csv)SourceUCI Machine Learning Repository / Kaggle (Cleveland Clinic Foundation)Records1,025 rowsFeatures13 clinical features + 1 target variableClass Balance~500 No Disease (0) / ~525 Disease (1) — near-balancedNull ValuesNoneDuplicatesNone
Feature Description
FeatureDescriptionTypeageAge of the patient (years)IntegersexSex (1=Male, 0=Female)BinarycpChest pain type (0–3)CategoricaltrestbpsResting blood pressure (mmHg)IntegercholSerum cholesterol (mg/dl)IntegerfbsFasting blood sugar >120 mg/dlBinaryrestecgResting ECG results (0–2)CategoricalthalachMaximum heart rate achieved (bpm)IntegerexangExercise-induced angina (1=Yes)BinaryoldpeakST depression induced by exercise (mm)FloatslopeSlope of peak exercise ST segment (0–2)CategoricalcaMajor vessels coloured by fluoroscopy (0–3)IntegerthalThalassemia type (1=Normal, 2=Fixed, 3=Reversible)CategoricaltargetHeart disease present ← Target VariableBinary

🔁 ML Pipeline
Load → Clean → EDA → Scale (StandardScaler) → PCA → Split (80/20)
     → Train 3 Models → Compare → Best Model (Random Forest) → Deploy
Stage-by-Stage Breakdown
StageStepDescription1Data Collection & InspectionLoad heart.csv; check shape, types, nulls, duplicates, class balance2Exploratory Data AnalysisCorrelation heatmap, distributions, chest pain analysis, feature importance3Data Splitting80% Train / 20% Test with stratified sampling4Model TrainingLogistic Regression, Decision Tree, Random Forest5Evaluation & DeploymentAccuracy, Confusion Matrix, F1-Score; deploy on Netlify

📊 EDA Highlights

Top positive predictors of heart disease: cp (r = +0.43), thalach (r = +0.42), slope (r = +0.35)
Top negative predictors: exang (r = −0.44), oldpeak (r = −0.44), ca (r = −0.38), thal (r = −0.34)
Age distribution: Most patients are 40–70 years; peak at 58–60 years
Chest pain insight: Atypical angina (Type 2) shows the highest disease prevalence
PCA: 10 principal components capture ~90% of total variance

Feature Importance (Random Forest)
RankFeatureImportance1cp (Chest pain type)~15.8%2thalach (Max heart rate)~13.6%3ca (Major vessels)~12.4%4oldpeak (ST depression)~11.2%5thal (Thalassemia type)~10.5%6exang (Exercise angina)~9.1%7age~8.3%8–13Others (sex, fbs, restecg, slope, chol, trestbps)~19.1%

🤖 Models
1. Logistic Regression (Baseline)

Solver: LBFGS | Max Iterations: 1000
Simple, interpretable, coefficient-based. Ideal baseline for binary classification.

2. Decision Tree

Criterion: Gini Impurity | Depth: tuned via cross-validation
Non-linear splits; easy to visualise clinical decision thresholds.

3. ⭐ Random Forest (Best Model)

Ensemble of 100 decision trees (bagging) | n_estimators=100 | random_state=42
Captures complex non-linear interactions; robust to noise; built-in feature importance.


📈 Results
ModelAccuracyPrecisionRecallF1-ScoreLogistic Regression85.37%~0.855~0.854~0.854Decision Tree81.95%~0.820~0.820~0.820Random Forest ⭐90.24%~0.903~0.902~0.902

Random Forest achieved 90.24% accuracy — correctly classifying ~90 out of every 100 patients on the unseen test set. The 4.87% gain over the baseline translates to ~50 additional correct diagnoses per 1,000 patients screened.


🛠️ Tech Stack
ComponentDetailsLanguagePython 3.xEnvironmentGoogle ColabML FrameworkScikit-learnLibrariesPandas, NumPy, Matplotlib, SeabornDeploymentNetlifyVersion ControlGitHub
