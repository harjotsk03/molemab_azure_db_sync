MS SQL (Azure) DB Sync with Zoho Inventory

- This Node.js server simply connects and queries the DB, fetches the last 100 rows of data from the ZOHO_INVOICE_LIST table and sends this data to a Zoho CRM REST API endpoint
- The REST API is a function which takes the rows of data, formats it into json data to send to Zoho Inventory to create invoices from the rows
