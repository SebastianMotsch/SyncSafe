import pandas as pd
import psycopg2

# Database connection details
DB_NAME = "wifi_data"  # Change this if your database name is different
DB_USER = "postgres"
DB_PASSWORD = "CI103_SyncSafe"  # Replace with your actual password
DB_HOST = "localhost"
DB_PORT = "5432"

# Load filtered household Wi-Fi data
file_path = "household_wifi_data.csv"  # Ensure this file exists in the correct path
df = pd.read_csv(r"C:\Users\Sebny\OneDrive\Desktop\DU Education\Fall 2024\CI 102 - Tammy Pairmann\CI 102 - Project\archive\household_wifi_data.csv")

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
)
cursor = conn.cursor()

# Insert data into PostgreSQL
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO household_wifi (device_category, ack, bytes, duration, 
                                    http_count_transactions, packet_size_avg, packets, ssl_count_transactions)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        row['device_category'], row['ack'], row['bytes'], row['duration'],
        row['http_count_transactions'], row['packet_size_avg'], row['packets'], row['ssl_count_transactions']
    ))

# Commit and close
conn.commit()
cursor.close()
conn.close()

print("Data uploaded successfully!")
