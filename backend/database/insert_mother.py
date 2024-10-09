import json
import psycopg2

def insert_mother_data(data):
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

        # Loop through each record in the JSON object
        for entry in data:
            cur.execute('''
                INSERT INTO mother(first_name, last_name, mrn, barcode)
                VALUES (%s, %s, %s, %s);
            ''', (entry['first_name'], entry['last_name'], entry['mrn'], entry['barcode']))
            
            # Commit the transaction for each row
            conn.commit()

        print("Data loaded successfully.")

        # Close the cursor and connection
        cur.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

if __name__ == "__main__":

    # Open and load the JSON file
    with open('data/mother_details.json', 'r') as file:
        data = json.load(file)
        insert_mother_data(data)