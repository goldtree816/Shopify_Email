import { useState } from "react";
import { Page, Card, Tabs, Select, Button } from "@shopify/polaris";

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

export default function InvoicePage() {
  const [tabIndex, setTabIndex] = useState(4);
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
    <Page title="Shopify App">
      <Tabs tabs={tabs} selected={tabIndex} onSelect={setTabIndex} fitted />

      <Card sectioned>
        {tabIndex === 0 && <p>Welcome to the Dashboard 🚀</p>}
        {tabIndex === 1 && <p>Here are your Orders 📦</p>}
        {tabIndex === 2 && <p>Settings ⚙️</p>}
        {tabIndex === 3 && <p>Reports 📊</p>}

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
