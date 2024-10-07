import psycopg2

def create_table():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(
            dbname="milk_checker",
            user="username",
            password="password",
            host="localhost",
            port=5432
        )
        cur = conn.cursor()
        # Create the table if it doesn't already exist
        cur.execute('''
            CREATE TABLE IF NOT EXISTS mother (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                mrn INT,
                barcode VARCHAR(50)
            );
        ''')
        conn.commit()
        print("Table created successfully.")

        # Close the cursor and connection
        cur.close()
        conn.close()
    except psycopg2.Error as e:
        print(f"An error occurred while creating the table: {e}")

if __name__ == "__main__":
    create_table()