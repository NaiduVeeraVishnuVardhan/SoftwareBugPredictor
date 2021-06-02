import argparse
import pandas


def merge_process_metrics(project):

    age_file_name = f"{project}/{project}_code_metrics_age.csv"
    authors_file_name = f"{project}/{project}_code_metrics_authors.csv"
    coupling_file_name = f"{project}/{project}_code_metrics_coupling.csv"

    age_csv = pandas.read_csv(age_file_name)
    authors_csv = pandas.read_csv(authors_file_name)
    coupling_csv = pandas.read_csv(coupling_file_name)

    filtered_age = filtered_dataframe(age_csv)
    filtered_authors = filtered_dataframe(authors_csv)
    filtered_coupling = filtered_dataframe(coupling_csv)

    age_authors_csv = filtered_age[["entity", "age-months"]].merge(filtered_authors[["entity", "n-authors", "n-revs"]],
                                                                   on="entity", how="left")
    age_authors_csv.to_csv(f"../public/files/test_data/{project}-ml_ready-process-metrics.csv")
    



def filtered_dataframe(data_frame):
    data_frame.drop(data_frame.index[data_frame['entity'].str.contains('^test.*|^tests.*')], inplace=True)
    filtered_df = data_frame[data_frame['entity'].str.contains('.*java$|.*py$') == True]

    return filtered_df



if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--project')
    args = parser.parse_args()

    merge_process_metrics(args.project)
