import psycopg2

def create_mother_table():
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
                mother_id SERIAL PRIMARY KEY,
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

def create_baby_table():
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
            CREATE TABLE IF NOT EXISTS baby (
                baby_id SERIAL PRIMARY KEY,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                mrn INT,
                barcode VARCHAR(50),
                mother_id INT REFERENCES mother(mother_id) ON DELETE CASCADE
            );
        ''')
        conn.commit()
        print("Table created successfully.")

        # Close the cursor and connection
        cur.close()
        conn.close()
    except psycopg2.Error as e:
        print(f"An error occurred while creating the table: {e}")

def create_bottle_table():
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
            CREATE TABLE IF NOT EXISTS bottle (
                bottle_id SERIAL PRIMARY KEY,
                milk_type VARCHAR(50),
                bottle_quantity INT,
                express_time TIMESTAMP,
                storage_method VARCHAR(50),
                storage_location VARCHAR(50),
                extra_notes VARCHAR(50),
                barcode VARCHAR(50),
                mother_id INT REFERENCES mother(mother_id) ON DELETE CASCADE,
                baby_id INT REFERENCES baby(baby_id) ON DELETE CASCADE
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
    create_mother_table()
    create_baby_table()
    create_bottle_table()