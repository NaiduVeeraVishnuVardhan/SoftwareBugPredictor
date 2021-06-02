
# load the model from disk
import pickle
import pandas as pd

if __name__ == '__main__':

    filename = 'finalized_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    testmetrics = pd.read_csv("ml_ready-process-metrics.csv")
    testdata = testmetrics[["age-months","n-authors","n-revs"]]
    print(testdata)
    Ypred = loaded_model.predict(testdata).round()
    print(Ypred)
    x= testmetrics["entity"].tolist()
    ResultDataFrame = pd.DataFrame({'File name':x, 'predicted bugs':Ypred})
    print(ResultDataFrame)
    ResultDataFrame.to_csv("PredictedBugs.csv")
