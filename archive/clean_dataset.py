import pandas as pd

# Define file paths
input_file = "C:/Users/Sebny/OneDrive/Desktop/DU Education/Fall 2024/CI 102 - Tammy Pairmann/CI 102 - Project/archive/iot_device_test.csv"
output_file = "C:/Users/Sebny/OneDrive/Desktop/DU Education/Fall 2024/CI 102 - Tammy Pairmann/CI 102 - Project/archive/iot_device_filtered.csv"

# Load the dataset
df = pd.read_csv(input_file)

# Select only the necessary columns for risk assessment
selected_columns = [
    'device_category', 'packets', 'bytes', 'http_GET', 'http_POST',
    'http_count_transactions', 'packet_size_avg', 'ssl_count_transactions',
    'ssl_handshake_duration_avg', 'tcp_analysis_retransmission'
]

# Check if required columns exist in the dataset
missing_columns = [col for col in selected_columns if col not in df.columns]
if missing_columns:
    print(f"Error: The following columns are missing from the dataset: {missing_columns}")
    exit()

# Filter the dataset
df_filtered = df[selected_columns]

# Save the filtered dataset to the specified path
df_filtered.to_csv(output_file, index=False)

print(f"Filtered CSV saved successfully to:\n{output_file}")
