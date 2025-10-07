import React, { useState } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  Banner,
  DataTable,
} from "@shopify/polaris";

export default function PushNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all_customers");
  const [scheduleAt, setScheduleAt] = useState("");
  const [priority, setPriority] = useState("normal");
  const [history, setHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const audienceOptions = [
    { label: "All customers", value: "all_customers" },
    { label: "Recent buyers (30d)", value: "recent_buyers" },
    { label: "High value customers", value: "high_value" },
    { label: "Segment: Newsletter", value: "segment_1" },
  ];

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
  ];

  function handleSend() {
    if (!title || !message) {
      alert("Please enter both title and message before sending.");
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      const record = {
        id: Date.now(),
        title,
        message,
        audience,
        scheduleAt: scheduleAt || "now",
        status: "sent",
        createdAt: new Date().toLocaleString(),
      };
      setHistory((h) => [record, ...h]);
      setIsSending(false);
      setTitle("");
      setMessage("");
      setScheduleAt("");
      setAudience("all_customers");
      setPriority("normal");
    }, 900);
  }

  return (
    <Page title="Push Notifications">
      <Layout>
        <Layout.Section>
          <Card title="Compose Notification" sectioned>
            <FormLayout>
              <TextField
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="Short title — e.g. New Arrivals"
              />
              <TextField
                label="Message"
                value={message}
                onChange={setMessage}
                multiline={4}
                placeholder="Write your notification message"
              />
              <Select
                label="Audience"
                options={audienceOptions}
                value={audience}
                onChange={setAudience}
              />
              <TextField
                label="Schedule (optional)"
                type="datetime-local"
                value={scheduleAt}
                onChange={setScheduleAt}
              />
              <Select
                label="Priority"
                options={priorityOptions}
                value={priority}
                onChange={setPriority}
              />
              <Button
                primary
                loading={isSending}
                onClick={handleSend}
              >
                Send Notification
              </Button>
            </FormLayout>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Preview" sectioned>
            {title || message ? (
              <>
                <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>{title}</h3>
                <p>{message}</p>
                <p style={{ fontSize: "12px", color: "gray" }}>Audience: {audience}</p>
                {scheduleAt && (
                  <p style={{ fontSize: "12px", color: "gray" }}>Scheduled: {scheduleAt}</p>
                )}
              </>
            ) : (
              <Banner status="info">Your notification preview will appear here.</Banner>
            )}
          </Card>
        </Layout.Section>

        <Layout.Section fullWidth>
          <Card title="History" sectioned>
            {history.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={["Title", "Message", "Audience", "Schedule", "Status"]}
                rows={history.map((h) => [
                  h.title,
                  h.message,
                  h.audience,
                  h.scheduleAt,
                  h.status,
                ])}
              />
            ) : (
              <Banner status="info">No notifications sent yet.</Banner>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}