const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

console.log("🔁 Starting MS SQL Sync Script...");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const ZOHO_FUNCTION_URL = process.env.ZOHO_FUNCTION_URL;

async function runSync() {
  try {
    console.log("Connecting to MS SQL...");
    const pool = await sql.connect(config);

    const query = `
  SELECT TOP 100
    [State],
    [Territory],
    [Salesman],
    [SalesmanName],
    [Customer],
    [CustName],
    [InvoiceNo],
    [Date],
    [CatCode],
    [CatDescr],
    [Item],
    [ItemDesc],
    [Qty],
    [NetPrice],
    [Total],
    [CostRecovery],
    [SupplierOrdPrice],
    [PurchTotal],
    [Margin],
    [%margin]
  FROM [MOLEMAB_FLORIDA].[dbo].[ZOHO_INVOICE_LIST]
  ORDER BY [Date] DESC
`;


    const result = await pool.request().query(query);
    const rows = result.recordset;
    console.log(`✅ Query successful. Rows returned: ${rows.length}`);

    const payload = {
      arguments: JSON.stringify({ invoices: rows }),
    };

    console.log("🚀 Sending data to Zoho Function...");
    const response = await fetch(ZOHO_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const zohoResponse = await response.json();

    console.log(zohoResponse.details.userMessage);
    // console.log(zohoResponse.details.output);

    await sql.close();
    console.log("✅ Sync completed successfully.");
  } catch (err) {
    console.error("❌ Error in Sync Script:", err);
    await sql.close();
  }
}

runSync();
