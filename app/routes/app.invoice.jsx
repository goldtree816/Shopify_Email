import { useState } from "react";
import {
  Page,
  Card,
  Tabs,
  Select,
  Button,
  TextField,
  DataTable,
  Badge
} from "@shopify/polaris";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Legend,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2000 },
  { month: "May", revenue: 2500 },
  { month: "Jun", revenue: 3000 },
];

const invoiceStatusData = [
  { name: "Paid", value: 3200 },
  { name: "Pending", value: 450 },
  { name: "Overdue", value: 300 },
];

const COLORS = ["#16a34a", "#facc15", "#ef4444"];

// Demo Store + Order Data
const storeData = {
  name: "My Shopify Store",
  address: "123 Market Street",
  zip: "12345",
  phone: "+1 555-123-4567",
  email: "support@mystore.com"
};

const orderData = {
  customer: "John Doe",
  items: [
    { name: "T-shirt", price: "$20" },
    { name: "Shoes", price: "$50" }
  ],
  total: "$70"
};

// Generate Invoice HTML
const generateTemplateHtml = (templateId) => {
  if (templateId === "classic") {
    return `
      <div class="invoice-classic">
        <h1>${storeData.name}</h1>
        <p>${storeData.address}, ZIP: ${storeData.zip}</p>
        <p>Tel: ${storeData.phone} | Email: ${storeData.email}</p>
        
        <h2>Invoice</h2>
        <p><b>Customer:</b> ${orderData.customer}</p>
        <table>
          <tr><th>Item</th><th>Price</th></tr>
          ${orderData.items
        .map((item) => `<tr><td>${item.name}</td><td>${item.price}</td></tr>`)
        .join("")}
        </table>
        <p><b>Total: ${orderData.total}</b></p>
      </div>
    `;
  }

  if (templateId === "modern") {
    return `
      <div class="invoice-modern">
        <h2 style="color:#4CAF50;">${storeData.name}</h2>
        <p>${storeData.address}, ZIP: ${storeData.zip}</p>
        <p>Tel: ${storeData.phone} | Email: ${storeData.email}</p>

        <h3>Invoice</h3>
        <p><b>Customer:</b> ${orderData.customer}</p>
        <ul>
          ${orderData.items
        .map((item) => `<li>${item.name} - ${item.price}</li>`)
        .join("")}
        </ul>
        <h3>Total: ${orderData.total}</h3>
      </div>
    `;
  }

  return "";
};

// Templates
const templates = [
  {
    id: "classic",
    name: "Classic Invoice",
    css: `
      .invoice-classic {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      .invoice-classic table {
        width: 100%;
        border-collapse: collapse;
      }
      .invoice-classic table, th, td {
        border: 1px solid black;
      }
    `
  },
  {
    id: "modern",
    name: "Modern Invoice",
    css: `
      .invoice-modern {
        font-family: 'Helvetica Neue', sans-serif;
        padding: 30px;
        background: #f9f9f9;
        border-radius: 8px;
      }
      .invoice-modern h2 {
        margin-bottom: 10px;
      }
    `
  }
];

export default function InvoicePage() {
  const [tabIndex, setTabIndex] = useState(0); // Default to Dashboard
  const [selected, setSelected] = useState("classic");
  const [customCSS, setCustomCSS] = useState("");

  const selectedTemplate = templates.find((t) => t.id === selected);
  const generatedHtml = generateTemplateHtml(selected);

  const tabs = [
    { id: "dashboard", content: "Dashboard", panelID: "dashboard-panel" },
    { id: "orders", content: "Orders", panelID: "orders-panel" },
    { id: "settings", content: "Settings", panelID: "settings-panel" },
    { id: "reports", content: "Reports", panelID: "reports-panel" },
    { id: "invoice", content: "Invoice", panelID: "invoice-panel" }
  ];

  return (
    <Page title="Shopify Invoicify">
      <Tabs tabs={tabs} selected={tabIndex} onSelect={setTabIndex} fitted />

      <Card sectioned>
        {tabIndex === 0 && (
          <div>
            <p style={{ marginBottom: "24px" }}>Welcome to your Invoicing Dashboard 🚀</p>

            {/* Stats in cards */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Card title="Total Invoices" sectioned>
                <h1 style={{ fontSize: "32px", margin: 0 }}>152</h1>
                <p style={{ color: "#6b7280" }}>Invoices generated so far</p>
              </Card>

              <Card title="Pending Payments" sectioned>
                <h1 style={{ fontSize: "32px", margin: 0, color: "#d97706" }}>$450</h1>
                <p style={{ color: "#6b7280" }}>Awaiting customer action</p>
              </Card>

              <Card title="Paid This Month" sectioned>
                <h1 style={{ fontSize: "32px", margin: 0, color: "#16a34a" }}>$3,200</h1>
                <p style={{ color: "#6b7280" }}>Revenue received</p>
              </Card>
            </div>

            {/* Charts Section */}
            <Card title="Monthly Revenue" sectioned>
              <div style={{ width: "100%", height: 350 }}> {/* Increased height */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3b82f6" barSize={40} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Invoice Status Breakdown" sectioned>
              <div style={{ width: "100%", height: 350 }}> {/* Increased height */}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={120} // bigger pie
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>


            {/* Other Insights */}
            <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Card title="Top Customer" sectioned>
                <p><b>Jane Smith</b></p>
                <p>Total spent: $1,050</p>
              </Card>

              <Card title="Most Sold Item" sectioned>
                <p><b>T-Shirt</b></p>
                <p>Sold: 85 units</p>
              </Card>

              <Card title="Upcoming Payments" sectioned>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>Alex Lee — $120 (due in 3 days)</li>
                  <li>Michael Chen — $90 (due in 5 days)</li>
                </ul>
              </Card>
            </div>
          </div>
        )}

        {/* Orders */}
        {tabIndex === 1 && (
          <div>
            <h2>Orders 📦</h2>
            <DataTable
              columnContentTypes={["text", "text", "numeric"]}
              headings={["Customer", "Status", "Total"]}
              rows={[
                ["John Doe", <Badge status="success">Paid</Badge>, "$70"],
                ["Jane Smith", <Badge status="attention">Pending</Badge>, "$120"],
                ["Alex Lee", <Badge status="warning">Overdue</Badge>, "$55"]
              ]}
            />
          </div>
        )}

        {/* Settings */}
        {tabIndex === 2 && (
          <div>
            <h2>Settings ⚙️</h2>
            <TextField label="Store Name" value={storeData.name} onChange={() => { }} />
            <TextField label="Email" value={storeData.email} onChange={() => { }} />
            <TextField label="Phone" value={storeData.phone} onChange={() => { }} />
            <p style={{ marginTop: "10px" }}>💾 Save button would go here</p>
          </div>
        )}

        {/* Reports */}
        {tabIndex === 3 && (
          <div>
            <h2>Reports 📊</h2>
            <ul>
              <li>Revenue This Month: <b>$3,200</b></li>
              <li>Outstanding Payments: <b>$450</b></li>
              <li>Top Customer: <b>Jane Smith</b></li>
            </ul>
          </div>
        )}

        {/* Invoice */}
        {tabIndex === 4 && (
          <div>
            <Card sectioned>
              <Select
                label="Choose a template"
                options={templates.map((t) => ({ label: t.name, value: t.id }))}
                onChange={(val) => setSelected(val)}
                value={selected}
              />
            </Card>

            <Card sectioned>
              <h3>Live Preview</h3>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  marginTop: "10px"
                }}
                dangerouslySetInnerHTML={{ __html: generatedHtml }}
              />
              <style>{selectedTemplate.css + customCSS}</style>
            </Card>

            <Card sectioned>
              <h3>Custom CSS</h3>
              <textarea
                style={{ width: "100%", minHeight: "100px" }}
                placeholder="Write your custom CSS here..."
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
              />
            </Card>

            <Card sectioned>
              <Button
                primary
                onClick={() =>
                  alert("Send Email with invoice HTML + store info")
                }
              >
                Export / Send Invoice
              </Button>
            </Card>
          </div>
        )}
      </Card>
    </Page>
  );
}
