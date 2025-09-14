import { useState } from "react";
// import dotenvn form "../../"
import {
  Page,
  Layout,
  Card,
  Button,
  TextField,
  InlineGrid,
  BlockStack,
  Select,
  Text,
  Badge,
  Banner,
  Spinner,
} from "@shopify/polaris";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "12px",
    border: isDragging ? "2px dashed #5c6ac4" : "1px dashed #d1d5db",
    borderRadius: "10px",
    background: "#ffffff",
    boxShadow: isDragging
      ? "0 6px 16px rgba(0,0,0,0.10)"
      : "0 2px 8px rgba(0,0,0,0.06)",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [title, setTitle] = useState("Your Product Title");
  const [body, setBody] = useState(
    "This is your amazing product. Customize this text to advertise."
  );
  const [image, setImage] = useState();
  const [buttonLabel, setButtonLabel] = useState("Shop Now");
  const [buttonColor, setButtonColor] = useState("#008060");
  const [alignment, setAlignment] = useState("center");
  const [textColor, setTextColor] = useState("#212b36");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [contentMaxWidth, setContentMaxWidth] = useState("600");

  const [blocks, setBlocks] = useState([
    { id: "title", type: "title" },
    { id: "image", type: "image" },
    { id: "body", type: "body" },
    { id: "button", type: "button" },
  ]);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("New Product Alert!");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const templates = [
    {
      id: 1,
      name: "Simple Promo",
      frameStyle: {
        border: "1px solid #e1e3e5",
        padding: 24,
        borderRadius: 14,
        background: backgroundColor,
        textAlign: alignment,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      },
      headingStyle: { fontSize: 26, fontWeight: 700 },
      bodyStyle: { fontSize: 16, lineHeight: 1.6 },
    },
    {
      id: 2,
      name: "Bold Highlight",
      frameStyle: {
        border: "2px solid #111827",
        padding: 28,
        borderRadius: 16,
        background: backgroundColor,
        textAlign: alignment,
        boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
      },
      headingStyle: { fontSize: 28, fontWeight: 800, letterSpacing: 0.2 },
      bodyStyle: { fontSize: 16, lineHeight: 1.7 },
    },
  ];
  const activeTemplate =
    templates.find((t) => t.id === selectedTemplate) ?? templates[0];
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    setBlocks((items) => arrayMove(items, oldIndex, newIndex));
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case "title":
        return (
          <h2
            style={{
              margin: 0,
              marginBottom: 12,
              color: textColor,
              ...activeTemplate.headingStyle,
            }}
          >
            {title}
          </h2>
        );
      case "image":
        return (
          <img
            src={image}
            alt="template"
            style={{
              width: "100%",
              borderRadius: 10,
              marginBottom: 12,
              display: "block",
            }}
          />
        );
      case "body":
        return (
          <p
            style={{
              margin: 0,
              marginBottom: 12,
              color: textColor,
              ...activeTemplate.bodyStyle,
            }}
          >
            {body}
          </p>
        );
      case "button":
        return (
          <div style={{ display: "flex", justifyContent: alignment }}>
            <button
              style={{
                border: 0,
                padding: "12px 18px",
                borderRadius: 10,
                background: buttonColor,
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {buttonLabel}
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  const generateHTML = () => {
    return `
    <div style="max-width:${contentMaxWidth}px;margin:auto;padding:20px;background:${backgroundColor};text-align:${alignment};font-family:sans-serif;">
      ${blocks
        .map((block) => {
          switch (block.type) {
            case "title":
              return `<h2 style="color:${textColor};">${title}</h2>`;
            case "image":
              return image
                ? `<img src="${image}" style="width:100%;border-radius:8px;margin:12px 0;" />`
                : ""; // ✅ skip if no image
            case "body":
              return `<p style="color:${textColor};line-height:1.6;">${body}</p>`;
            case "button":
              return `<a href="#" style="display:inline-block;background:${buttonColor};color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:600;">${buttonLabel}</a>`;
            default:
              return "";
          }
        })
        .join("")}
    </div>
  `;
  };


  const handleSend = async () => {
    console.log("the html generated by you is", generateHTML())
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, html: generateHTML() }),
      });
      // const data = await res.json();
      // if (data.success) {
      //   setStatus({ success: true, message: "Email sent successfully" });
      // } else {
      //   setStatus({ success: false, message: data.error || "Failed to send" });
      // }

      const data = await res.json();
      if (data.success) {
        setStatus({ success: true, message: "Email sent successfully" });
      } else {
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : JSON.stringify(data.error); // fallback stringify

        setStatus({ success: false, message: errorMessage });
      }

    } catch (err) {
      setStatus({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const previewOuterStyle = {
    display: "flex",
    justifyContent: "center",
    background: "#f6f7f8",
    padding: 16,
    borderRadius: 12,
  };

  return (
    <Page title=" Customize  Email Templates">
      <Layout>
        <Layout.Section>
          <Card title="Choose a Template" sectioned>
            <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
              {templates.map((tpl) => (
                <Card key={tpl.id} sectioned>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">
                      {tpl.name}{" "}
                      {selectedTemplate === tpl.id && (
                        <Badge tone="success">Selected</Badge>
                      )}
                    </Text>
                    <div style={previewOuterStyle}>
                      <div style={{ width: "100%", maxWidth: 360 }}>
                        <div style={{ ...tpl.frameStyle }}>
                          <h4 style={{ marginTop: 0 }}>Preview</h4>
                          <div
                            style={{
                              opacity: 0.7,
                              fontSize: 13,
                              marginBottom: 8,
                            }}
                          >
                            (Uses your content/colors)
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                            }}
                          >
                            <div
                              style={{ ...tpl.headingStyle, color: textColor }}
                            >
                              {title}
                            </div>
                            <div
                              style={{
                                height: 120,
                                background: "#e5e7eb",
                                borderRadius: 8,
                              }}
                            />
                            <div
                              style={{ ...tpl.bodyStyle, color: textColor }}
                            >
                              Sample body…
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedTemplate(tpl.id)}
                      primary={selectedTemplate === tpl.id}
                      fullWidth
                    >
                      {selectedTemplate === tpl.id ? "Selected" : "Select"}
                    </Button>
                  </BlockStack>
                </Card>
              ))}
            </InlineGrid>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Live Preview & Arrange Blocks" sectioned>
            <div style={previewOuterStyle}>
              <div style={{ width: "100%", maxWidth: Number(contentMaxWidth) }}>
                <div style={{ ...activeTemplate.frameStyle }}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={blocks.map((b) => b.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <BlockStack gap="300">
                        {blocks.map((block) => (
                          <SortableItem key={block.id} id={block.id}>
                            {renderBlock(block)}
                          </SortableItem>
                        ))}
                      </BlockStack>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Customize Content & Styles" sectioned>
            <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
              <BlockStack gap="300">
                <Text as="h4" variant="headingSm">
                  Content
                </Text>
                <TextField label="Title" value={title} onChange={setTitle} />
                <TextField
                  label="Body"
                  value={body}
                  onChange={setBody}
                  multiline={4}
                />
                <TextField
                  label="Image URL"
                  value={image}
                  onChange={setImage}
                />
                <TextField
                  label="Button Label"
                  value={buttonLabel}
                  onChange={setButtonLabel}
                />
              </BlockStack>

              <BlockStack gap="300">
                <Text as="h4" variant="headingSm">
                  Colors
                </Text>
                <TextField
                  label="Text Color"
                  type="color"
                  value={textColor}
                  onChange={setTextColor}
                />
                <TextField
                  label="Background Color"
                  type="color"
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                />
                <TextField
                  label="Button Color"
                  type="color"
                  value={buttonColor}
                  onChange={setButtonColor}
                />
              </BlockStack>

              <BlockStack gap="300">
                <Text as="h4" variant="headingSm">
                  Layout
                </Text>
                <Select
                  label="Text Alignment"
                  options={[
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                  ]}
                  onChange={setAlignment}
                  value={alignment}
                />
                <TextField
                  label="Max Content Width (px)"
                  type="number"
                  value={contentMaxWidth}
                  onChange={setContentMaxWidth}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    onClick={() =>
                      setBlocks([
                        { id: "title", type: "title" },
                        { id: "image", type: "image" },
                        { id: "body", type: "body" },
                        { id: "button", type: "button" },
                      ])
                    }
                  >
                    Reset Order
                  </Button>
                  <Button
                    tone="critical"
                    onClick={() =>
                      setBlocks((prev) =>
                        prev.filter((b) => b.id !== "image")
                      )
                    }
                  >
                    Remove Image
                  </Button>
                </div>
              </BlockStack>
            </InlineGrid>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Send Email" sectioned>
            <BlockStack gap="300">
              <TextField
                label="Recipient Email"
                type="email"
                value={to}
                onChange={setTo}
              />
              <TextField
                label="Subject"
                value={subject}
                onChange={setSubject}
              />
              <Button primary onClick={handleSend} disabled={loading}>

                {loading ? <Spinner size="small" /> : "Send Email"}
              </Button>
              {status && (
                <Banner
                  tone={status.success ? "success" : "critical"}
                  title={status.message}
                />
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
