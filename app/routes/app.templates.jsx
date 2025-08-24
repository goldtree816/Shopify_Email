import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  BlockStack,
  Box,
  TextField,
  Modal,
} from "@shopify/polaris";


const blocks = [
  { id: "header", label: "Header", default: "Welcome to our newsletter" },
  { id: "text", label: "Text", default: "This is some sample email text." },
  { id: "image", label: "Image", default: "https://via.placeholder.com/600x200" },
  { id: "button", label: "Button", default: "Click Here" },
];

const defaultTemplate = [
  { id: "header", label: "Header", content: "Welcome to Kamal Basyal's Newsletter" },
  { id: "image", label: "Image", content: "https://via.placeholder.com/600x200" },
  { id: "text", label: "Text", content: "This is a default email body text." },
  { id: "button", label: "Button", content: "Get Started" },
];

export default function Templates() {
  const [template, setTemplate] = useState(defaultTemplate);
  const [previewOpen, setPreviewOpen] = useState(false);


  const handleDragStart = (event, block) => {
    event.dataTransfer.setData("block", JSON.stringify(block));
  };

  const handleDropEvent = (event) => {
    event.preventDefault();
    const block = JSON.parse(event.dataTransfer.getData("block"));
    setTemplate((prev) => [
      ...prev,
      { ...block, content: block.default },
    ]);
  };


  const handleEdit = (index, newValue) => {
    const updated = [...template];
    updated[index].content = newValue;
    setTemplate(updated);
  };

  return (
    <Page title="Email Template Builder">
      <Layout>
        <Layout.Section oneThird>
          <Card title="Available Blocks" sectioned>
            <BlockStack gap="300">
              {blocks.map((block) => (
                <Box
                  key={block.id}
                  padding="300"
                  background="bg-surface-secondary"
                  border="base"
                  borderRadius="200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                  style={{ cursor: "grab" }}
                >
                  <Text as="span" fontWeight="semibold">
                    {block.label}
                  </Text>
                </Box>
              ))}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card
            title="Your Email Template"
            sectioned
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropEvent}
          >
            {template.length === 0 ? (
              <Text color="subdued">Drag blocks here to build your email</Text>
            ) : (
              <BlockStack gap="300">
                {template.map((block, index) => (
                  <Card key={index} sectioned>
                    {block.id === "image" ? (
                      <>
                        <img
                          src={block.content}
                          alt="template-img"
                          style={{ maxWidth: "100%", borderRadius: "8px" }}
                        />
                        <TextField
                          label="Image URL"
                          value={block.content}
                          onChange={(val) => handleEdit(index, val)}
                        />
                      </>
                    ) : (
                      <TextField
                        label={block.label}
                        value={block.content}
                        onChange={(val) => handleEdit(index, val)}
                        multiline
                      />
                    )}
                  </Card>
                ))}
              </BlockStack>
            )}
          </Card>

          {template.length > 0 && (
            <Box padding="400" gap="300" display="flex">
              <Button onClick={() => console.log("Final Template:", template)}>
                Save Template
              </Button>
              <Button variant="primary" onClick={() => setPreviewOpen(true)}>
                Preview
              </Button>
            </Box>
          )}
        </Layout.Section>
      </Layout>

      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Email Preview"
        large
      >
        <Modal.Section>
          <Box padding="400" background="bg-surface-secondary">
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              {template.map((block, index) => {
                if (block.id === "header") {
                  return (
                    <h2 key={index} style={{ textAlign: "center", margin: "16px 0" }}>
                      {block.content}
                    </h2>
                  );
                }
                if (block.id === "text") {
                  return (
                    <p key={index} style={{ fontSize: "16px", lineHeight: "22px" }}>
                      {block.content}
                    </p>
                  );
                }
                if (block.id === "image") {
                  return (
                    <div key={index} style={{ textAlign: "center", margin: "16px 0" }}>
                      <img
                        src={block.content}
                        alt="email-img"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                      />
                    </div>
                  );
                }
                if (block.id === "button") {
                  return (
                    <div key={index} style={{ textAlign: "center", margin: "24px 0" }}>
                      <Button primary>{block.content}</Button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </Box>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
