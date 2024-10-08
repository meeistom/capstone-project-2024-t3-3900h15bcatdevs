import psycopg2

def fetch_mother_data():
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

        # Execute the query
        cur.execute("SELECT * FROM mother;")

        # Fetch all rows from the query result
        rows = cur.fetchall()

        results = []
        # Print the result
        for row in rows:
            print(row)
            results.append(row)

        # Close the cursor and connection
        cur.close()
        conn.close()

        return results

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def fetch_mother_data_by_barcode(barcode):
    try:
        conn = psycopg2.connect(
            dbname="milk_checker",
            user="username",
            password="password",
            host="localhost",
            port="5432"
        )
        cur = conn.cursor()
        cur.execute("SELECT * FROM mother WHERE barcode = %s;", (barcode,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        return row
    except Exception as e:
        print(f"An error occurred: {e}")
        return None