# Practical Exercise: Introduction to Data Analysis with Python

**Course / Module:** Applied Data Analysis

**Practical Title:** Compute Descriptive Statistics and Visualize a Distribution

**Practical Number:** 1

**Duration:** 2 hours

**Date:**

**Instructor:**

**Student Name / ID:**

## Objectives
- Load a CSV dataset into Python using `pandas`.
- Compute mean, median, variance, and standard deviation for a numeric column.
- Create and save a histogram and boxplot of the data.
- Write a short report interpreting the results.

## Learning Outcomes
- Students will be able to perform basic exploratory data analysis (EDA) on a univariate dataset.
- Students will be able to summarize and visualize distribution characteristics and explain implications.

## Prerequisites
- Basic familiarity with Python and the command line.
- Python 3.8+ installed.
- `pandas`, `matplotlib`, and `seaborn` installed (installation instructions below).

## Materials and Equipment
- Computer with Python 3.8+.
- Libraries: `pandas`, `matplotlib`, `seaborn`.
- Dataset: `data/sample.csv` (numeric column `value`). See [data/sample.csv](data/sample.csv).

## Setup Instructions
1. Create and activate a virtual environment (recommended):

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install pandas matplotlib seaborn
```

2. Verify the dataset is present: `ls data/sample.csv`

## Background / Theory
Descriptive statistics (mean, median, variance, standard deviation) summarize central tendency and dispersion of a numeric variable. Visualizations such as histograms and boxplots reveal shape, skewness, and outliers which are important when choosing statistical models or preprocessing steps.

## Procedure
1. Inspect the dataset header using a text editor or `head`:

```bash
head -n 5 data/sample.csv
```

2. Create a script `analysis.py` with the following steps:
   - Read `data/sample.csv` into a `pandas.DataFrame`.
   - Compute: count, mean, median, min, max, variance, standard deviation, and interquartile range (IQR) for the `value` column.
   - Create a histogram and a boxplot of `value` and save them as `histogram.png` and `boxplot.png`.
   - Save computed statistics as `results.txt`.

3. Run the script and collect the outputs.

Example `analysis.py` (you may copy into your working folder):

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data/sample.csv')
col = 'value'

stats = df[col].describe()
median = df[col].median()
iqr = df[col].quantile(0.75) - df[col].quantile(0.25)

with open('results.txt', 'w') as f:
    f.write(str(stats) + '\n')
    f.write(f'median: {median}\n')
    f.write(f'IQR: {iqr}\n')

plt.figure()
sns.histplot(df[col], kde=True)
plt.title('Histogram of value')
plt.savefig('histogram.png')

plt.figure()
sns.boxplot(x=df[col])
plt.title('Boxplot of value')
plt.savefig('boxplot.png')

print('Done: results.txt, histogram.png, boxplot.png created')
```

## Data / Observations
- Use the table below to record any anomalies or missing values observed during the run.

| Item | Observation |
|---|---|
| Missing values |  |
| Outliers noted |  |

## Calculations and Analysis
- Paste the contents of `results.txt` here and comment on whether the mean and median differ (indicates skewness).
- Note IQR and any values outside the whiskers in the boxplot (possible outliers).

## Results
- Include the final statistics, attach `histogram.png` and `boxplot.png` in your report, and summarize findings in 3–5 sentences.

## Discussion and Conclusion
- Discuss distribution shape (symmetric, left/right skew), presence of outliers, and how these observations might affect downstream modelling.
- Suggest at least two preprocessing steps (e.g., log-transform, outlier removal) and justify them.

## Assessment / Marking Rubric
- Correct data loading and statistics: 40%
- Correct and labelled plots: 25%
- Quality of interpretation and discussion: 25%
- Code readability and submission completeness: 10%

## Submission Instructions
- Bundle: `report.pdf` (1–2 pages) and `analysis.py`. If code is large, include as a ZIP.
- Deadline:
- Submit to: (LMS link or instructor email)

## References
- `pandas` documentation: https://pandas.pydata.org/
- `seaborn` documentation: https://seaborn.pydata.org/

## Instructor Notes
- Expected results depend on dataset; use `results.txt` to fill expected summary values for grading.
