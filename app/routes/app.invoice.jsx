import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Tabs,
  Select,
  Button,
  DataTable,
  Badge,
  FormLayout,
  TextField,
} from "@shopify/polaris";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

function InvoiceItems() {
  const [items, setItems] = useState([
    { item: "Tree candle", description: "Tree-shaped candle - set of 3", quantity: 1, price: 8.99, amount: 8.99 },
    { item: "Bubble candle", description: "Rose bubble candle", quantity: 1, price: 4.8, amount: 4.8 },
  ]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "quantity" || field === "price") value = Number(value);
    newItems[index][field] = value;
    newItems[index].amount = newItems[index].quantity * newItems[index].price;
    setItems(newItems);
  };

  const addRow = () => setItems([...items, { item: "", description: "", quantity: 1, price: 0, amount: 0 }]);
  const removeRow = (index) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Card title="Invoice Items" sectioned>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#3b82f6", color: "white" }}> {/* Blue background */}
          <tr>
            <th style={{ padding: "8px" }}>Item</th>
            <th style={{ padding: "8px" }}>Description</th>
            <th style={{ padding: "8px" }}>Quantity</th>
            <th style={{ padding: "8px" }}>Price</th>
            <th style={{ padding: "8px" }}>Amount</th>
            <th style={{ padding: "8px" }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><input type="text" value={item.item} onChange={(e) => handleChange(index, "item", e.target.value)} /></td>
              <td><input type="text" value={item.description} onChange={(e) => handleChange(index, "description", e.target.value)} /></td>
              <td><input type="number" value={item.quantity} onChange={(e) => handleChange(index, "quantity", e.target.value)} /></td>
              <td><input type="number" value={item.price} step="0.01" onChange={(e) => handleChange(index, "price", e.target.value)} /></td>
              <td>${item.amount.toFixed(2)}</td>
              <td><Button plain onClick={() => removeRow(index)}>x</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button plain onClick={addRow} style={{ marginTop: "8px" }}>➕ Add More Items</Button>

      {/* Totals */}
      <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <Card title="Note" sectioned>
            <p>Enter any notes or special instructions here.</p>
          </Card>
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <Card title="Totals" sectioned>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tax (10%):</span><span>${tax.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "8px" }}><span>Total:</span><span>${total.toFixed(2)}</span></div>
          </Card>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
        <Button primary onClick={() => console.log("Send Email clicked")}>Send Email</Button>
        <Button onClick={() => console.log("Print clicked")}>Print</Button>
        <Button destructive onClick={() => console.log("Download PDF clicked")}>Download PDF</Button>
      </div>
    </Card>
  );
}

export default function InvoicePage() {
  const [tabIndex, setTabIndex] = useState(0);
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
            <Card title="Monthly Revenue" sectioned>
              <div style={{ width: "100%", height: 350 }}>
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
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
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
        {tabIndex === 1 && (
          <div>
            <h2>Orders 📦</h2>
            <DataTable
              columnContentTypes={["text", "text", "text", "numeric"]}
              headings={["Customer", "Item", "Status", "Total"]}
              rows={[
                ["John Doe", "T-shirt", <Badge status="success">Paid</Badge>, "$70"],
                ["Jane Smith", "Shoes", <Badge status="attention">Pending</Badge>, "$120"],
                ["Alex Lee", "Cap", <Badge status="critical">Overdue</Badge>, "$55"],
                ["Michael Chen", "Jacket", <Badge status="success">Paid</Badge>, "$150"],
                ["Sophia Lee", "Watch", <Badge status="attention">Pending</Badge>, "$220"],
                ["David Kim", "Bag", <Badge status="critical">Overdue</Badge>, "$90"],
                ["Emily Brown", "Sunglasses", <Badge status="success">Paid</Badge>, "$80"],
              ]}
            />
          </div>
        )}




        {tabIndex === 2 && (
          <div>
            <p
              style={{
                marginBottom: "24px",
                fontSize: "18px",
                fontWeight: "600",
                color: "#374151"
              }}
            >
              Manage your store preferences and account details ⚙️
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Card title="Store Information 🏪" sectioned>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <TextField
                    label="Store Name"
                    value={storeData.name}
                    onChange={() => { }}
                    autoComplete="off"
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={storeData.email}
                    onChange={() => { }}
                    autoComplete="email"
                  />
                  <TextField
                    label="Phone"
                    type="tel"
                    value={storeData.phone}
                    onChange={() => { }}
                    autoComplete="tel"
                  />
                </div>
              </Card>

              <Card title="Preferences" sectioned>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Select
                    label="Default Currency"
                    options={[
                      { label: "USD ($)", value: "usd" },
                      { label: "EUR (€)", value: "eur" },
                      { label: "GBP (£)", value: "gbp" },
                    ]}
                    value="usd"
                    onChange={() => { }}
                  />
                  <Select
                    label="Default Language"
                    options={[
                      { label: "English", value: "en" },
                      { label: "French", value: "fr" },
                      { label: "German", value: "de" },
                    ]}
                    value="en"
                    onChange={() => { }}
                  />
                </div>
              </Card>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Card title="Branding " sectioned>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#f9fafb",
                      fontSize: "12px",
                      color: "#6b7280"
                    }}
                  >
                    Logo
                  </div>
                  <Button>Upload Logo</Button>
                </div>
                <p style={{ marginTop: "8px", fontSize: "13px", color: "#6b7280" }}>
                  Recommended size: 200x200px (PNG or JPG)
                </p>
              </Card>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <Button primary size="large">💾 Save Settings</Button>
            </div>
          </div>
        )}
        {tabIndex === 3 && (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Reports <span role="img" aria-label="chart">📊</span>
            </h2>
            <p className="text-gray-600">Here’s a quick snapshot of your business performance this month.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card sectioned>
                <h3 className="text-gray-500">Revenue This Month</h3>
                <p className="text-2xl font-bold text-green-600">$3,200</p>
              </Card>

              <Card sectioned>
                <h3 className="text-gray-500">Outstanding Payments</h3>
                <p className="text-2xl font-bold text-red-500">$450</p>
              </Card>

              <Card sectioned>
                <h3 className="text-gray-500">Top Customer</h3>
                <p className="text-2xl font-bold">Jane Smith</p>
              </Card>
              <Card>
                <h3 className="text-gray-500">Invoices Sent</h3>
                <p className="text-2xl font-bold">58</p>

              </Card>
              <Card>
                <h3 className="text-gray-500">Avg. Invoice Value</h3>
                <p className="text-2xl font-bold">$210</p>

              </Card>
              <Card>
                <h3 className="text-gray-500">Growth Rate</h3>
                <p className="text-2xl font-bold text-blue-600">+12%</p>
              </Card>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue Trend (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { month: "Apr", revenue: 1100 },
                    { month: "May", revenue: 1500 },
                    { month: "Jun", revenue: 1800 },
                    { month: "Jul", revenue: 2500 },
                    { month: "Aug", revenue: 3200 },
                    { month: "Sep", revenue: 3400 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {tabIndex === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Card title="INVOICE" sectioned>
              <div style={{ display: "flex", gap: "24px", flexWrap: "nowrap" }}>
                <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <TextField label="Invoice No:" value="PF-LMKACMSPKS" onChange={() => { }} autoComplete="off" />
                  <TextField label="Invoice Date:" type="date" value="2023-01-20" onChange={() => { }} />
                  <TextField label="Due Date:" type="date" value="2023-01-20" onChange={() => { }} />
                  <Select
                    label="Currency:"
                    options={[
                      { label: "USD - US Dollar ($)", value: "usd" },
                      { label: "EUR - Euro (€)", value: "eur" },
                      { label: "GBP - British Pound (£)", value: "gbp" },
                    ]}
                    value="usd"
                    onChange={() => { }}
                  />
                </div>
                <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", paddingTop: "8px" }}>
                  <Button primary>📤 Choose your logo</Button>
                  <p style={{ fontSize: "12px", color: "gray", margin: 0 }}>Recommended logo size is 50x50 (px)</p>
                </div>
              </div>
            </Card>
            <Card sectioned>
              <div style={{ display: "flex", gap: "24px", flexWrap: "nowrap" }}>
                <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h2 style={{ marginBottom: "8px" }}>Billing From</h2>
                  <TextField label="Your Name" placeholder="Enter your name" />
                  <TextField label="E-mail Address" type="email" placeholder="Enter your email" />
                  <TextField label="City" placeholder="Enter your city" />
                  <Select
                    label="Country"
                    options={[
                      { label: "United States", value: "us" },
                      { label: "United Kingdom", value: "uk" },
                      { label: "Germany", value: "de" },
                    ]}
                    value="us"
                    onChange={() => { }}
                  />
                  <TextField label="Zip Code" placeholder="Enter zip code" />
                </div>
                <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h2 style={{ marginBottom: "8px" }}>Billing To</h2>
                  <TextField label="Customer's Name" placeholder="Enter customer's name" />
                  <TextField label="E-mail Address" type="email" placeholder="Enter customer's email" />
                  <TextField label="City" placeholder="Enter customer's city" />
                  <Select
                    label="Country"
                    options={[
                      { label: "United States", value: "us" },
                      { label: "United Kingdom", value: "uk" },
                      { label: "Germany", value: "de" },
                    ]}
                    value="us"
                    onChange={() => { }}
                  />
                  <TextField label="Zip Code" placeholder="Enter zip code" />
                </div>
              </div>
            </Card>
            <InvoiceItems />
          </div>
        )}


      </Card>
    </Page >
  );
}
