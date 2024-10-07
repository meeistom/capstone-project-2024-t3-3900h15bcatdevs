import psycopg2

def fetch_baby_data():
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
        cur.execute("SELECT * FROM baby;")

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

if __name__ == "__main__":
    fetch_baby_data()