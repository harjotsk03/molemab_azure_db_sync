MS SQL (Azure) DB Sync with Zoho Inventory

- This Node.js server simply connects and queries the DB, fetches the last 100 rows of data from the ZOHO_INVOICE_LIST table and sends this data to a Zoho CRM REST API endpoint
- The REST API is a function which takes the rows of data, formats it into json data to send to Zoho Inventory to create invoices from the rows
- In order to run this server, you must create a .env file with the DB information, you must also be connected to the MoleMab VPN in order to connect to the Azure server and DB. You will also need to run npm install before running the script