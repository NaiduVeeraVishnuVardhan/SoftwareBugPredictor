
# load the model from disk
import pickle
import pandas as pd
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

testmetrics = pd.read_csv("ml_ready-process-metrics.csv")
testdata = testmetrics[["age-months","n-authors","n-revs"]]
Ypred = loaded_model.predict(testdata).round()
x= testmetrics["entity"].tolist()
ResultDataFrame = pd.DataFrame({'File name':x, 'predicted bugs':Ypred})
ResultDataFrame.to_csv("PredictedBugs.csv")