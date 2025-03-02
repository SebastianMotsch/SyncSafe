import pandas as pd
import psycopg2

# Database connection details
DB_NAME = "syncsafe_db"
DB_USER = "postgres"
DB_PASSWORD = "CI103_SyncSafe"
DB_HOST = "localhost"
DB_PORT = "5432"

# Load the filtered CSV file
file_path = "C:/Users/Sebny/OneDrive/Desktop/DU Education/Fall 2024/CI 102 - Tammy Pairmann/CI 103 - SyncSafe/Backend/datasets/filtered_iot_security_data.csv"
df = pd.read_csv(file_path)

# Convert 1/0 values to boolean (True/False) for PostgreSQL
boolean_columns = [
    "is_ssl", "is_http", "is_g_http", "is_cdn_http", "is_ad_http",
    "suffix_is_unresolved", "domain_is_unresolved",
    "tcp_analysis_retransmission", "tcp_analysis_lost_segment"
]

for col in boolean_columns:
    if col in df.columns:
        df[col] = df[col].astype(bool)  # Convert 1 → True, 0 → False

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
)
cur = conn.cursor()

# Insert data into PostgreSQL
for _, row in df.iterrows():
    cur.execute("""
        INSERT INTO iot_device_data (
            device_category, duration, bytes, bytes_A, bytes_B, bytes_A_B_ratio,
            is_ssl, is_http, is_g_http, is_cdn_http, is_ad_http,
            suffix_is_unresolved, domain_is_unresolved,
            tcp_analysis_retransmission, tcp_analysis_lost_segment,
            ssl_count_certificates, ssl_count_transactions
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, tuple(row))

# Commit and close connection
conn.commit()
cur.close()
conn.close()

print("Data uploaded successfully!")

