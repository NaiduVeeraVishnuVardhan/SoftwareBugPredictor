import argparse
import pandas


def merge_process_metrics(project):
    final_defect_record = create_defect_csv(project)

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
    age_authors_coupling = age_authors_csv[["entity", "age-months", "n-authors", "n-revs"]].merge(
        filtered_coupling[["entity", "degree", "average-revs"]], on="entity", how="left")

    ml_ready_file = final_defect_record[["entity", "no_of_defects"]].merge(
        age_authors_coupling[["entity", "age-months", "n-authors", "n-revs", "degree", "average-revs"]], on="entity",
        how="left")

    ml_ready_file.to_csv(f"{project}/new-{project}_ml_ready-process-metrics.csv", index=False)


def filtered_dataframe(data_frame):
    data_frame.drop(data_frame.index[data_frame['entity'].str.contains('^test.*|^tests.*')], inplace=True)
    filtered_df = data_frame[data_frame['entity'].str.contains('.*java$|.*py$') == True]

    return filtered_df


def create_defect_csv(project):
    issue_dataset = pandas.read_csv(f"{project}/{project}.csv")
    issue_dataset.rename(columns={'FILE_NAME': 'entity'}, inplace=True)
    value_counts = issue_dataset['entity'].value_counts(dropna=True, sort=True)
    df_val_counts = pandas.DataFrame(value_counts)
    df_value_counts_reset = df_val_counts.reset_index()
    df_value_counts_reset.columns = ['entity', 'no_of_defects']
    df_value_counts_reset.to_csv(f"{project}/new-{project}.csv")

    return df_value_counts_reset


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--project')
    args = parser.parse_args()

    merge_process_metrics(args.project)
