import json
import psycopg2

def insert_bottle_data(milk_type, bottle_quantity, express_time, storage_method, storage_location, extra_notes, barcode, mother_id):
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

        query = '''
            INSERT INTO bottle (milk_type, bottle_quantity, express_time, storage_method, storage_location, extra_notes, barcode, mother_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        '''

        cur.execute(query, (
            milk_type, 
            bottle_quantity, 
            express_time if express_time else None,
            storage_method if storage_method else None,
            storage_location if storage_location else None,
            extra_notes if extra_notes else '',
            barcode if barcode else None,
            mother_id
        ))

        # Commit the transaction for each row
        conn.commit()

        print("Data loaded successfully.")

        # Close the cursor and connection
        cur.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

# if __name__ == "__main__":

#     # Open and load the JSON file
#     with open('data/bottle_details.json', 'r') as file:
#         data = json.load(file)
#         insert_bottle_data(data)