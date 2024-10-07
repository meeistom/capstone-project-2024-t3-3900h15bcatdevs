import json
import psycopg2

def insert_mother_details(json_filepath):
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

        # Open and load the JSON file
        with open(json_filepath, 'r') as file:
            data = json.load(file)
            
            # Loop through each record in the JSON object
            for entry in data:
                cur.execute('''
                    INSERT INTO mother(first_name, last_name, mrn, barcode)
                    VALUES (%s, %s, %s, %s);
                ''', (entry['first_name'], entry['last_name'], entry['mrn'], entry['barcode']))
                
                # Commit the transaction for each row
                conn.commit()
        
        print("Data inserted successfully.")

        # Close the cursor and connection
        cur.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    insert_mother_details('data/mother_details.json')