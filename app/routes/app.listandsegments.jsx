import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";
import prisma from "../db.server";
import {
  Page,
  Card,
  TextField,
  Select,
  Button,
  BlockStack,
  InlineStack,
  ResourceList,
  ResourceItem,
  Badge,
  Text,
} from "@shopify/polaris";


export async function loader() {
  const items = await prisma.list.findMany({
    orderBy: { id: "desc" }, 
  });
  return json(items);
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const type = formData.get("type");
  const emails = formData.getAll("emails"); 
  await prisma.list.create({
    data: {
      name,
      type,
      emails,
    },
  });

  return redirect("/lists");
}
export default function ListsAndSegmentsPage() {
  const items = useLoaderData();
  const [showForm, setShowForm] = useState(false);
  const [emails, setEmails] = useState([""]);
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [listName, setListName]= useState();

  const filterOptions = [
    { label: "All types", value: "all" },
    { label: "Lists", value: "List" },
    { label: "Segments", value: "Segment" },
  ];

  const filteredItems = items.filter(
    (item) =>
      (filterType === "all" || item.type === filterType) &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleEmailChange = (value, index) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const addEmailField = () => setEmails([...emails, ""]);
  const removeEmailField = (index) => {
    const updated = [...emails];
    updated.splice(index, 1);
    setEmails(updated);
  };

  return (
    <Page
      title="Lists & Segments"
      primaryAction={{
        content: showForm ? "Cancel" : "Create List / Segment",
        onAction: () => setShowForm((prev) => !prev),
      }}
      secondaryActions={[{ content: "Inactive Segments" }]}
    >
      <Card>
        <BlockStack gap="400">
       
          {showForm && (
            <Card sectioned>
              <Form method="post">
                <BlockStack gap="300">
                  <TextField
                    label="List/Segment Name"
                    name="name"
                    value={listName}
                    onChange={setListName}
                    autoComplete="off"
                  />

                  <Select
                    label="Type"
                    options={[
                      { label: "List", value: "List" },
                      { label: "Segment", value: "Segment" },
                    ]}
                    name="type"
                    defaultValue="List"
                  />
                  <BlockStack gap="200">
                    {emails.map((email, index) => (
                      <InlineStack key={index} gap="100" align="start">
                        <TextField
                          label={`Email ${index + 1}`}
                          value={email}
                          onChange={(value) => handleEmailChange(value, index)}
                          type="email"
                        />
                        {emails.length > 1 && (
                          <Button destructive onClick={() => removeEmailField(index)}>
                            Remove
                          </Button>
                        )}
                        <input type="hidden" name="emails" value={email} />
                      </InlineStack>
                    ))}
                    <Button onClick={addEmailField}>Add Email</Button>
                  </BlockStack>

                  <Button submit primary>Create</Button>
                </BlockStack>
              </Form>
            </Card>
          )}

          <InlineStack gap="400" align="start" blockAlign="center" wrap={false}>
            <TextField
              placeholder="Search lists & segments"
              value={searchValue}
              onChange={setSearchValue}
              autoComplete="off"
            />
            <Select
              options={filterOptions}
              value={filterType}
              onChange={setFilterType}
            />
          </InlineStack>
          <ResourceList
            resourceName={{ singular: "list", plural: "lists" }}
            items={filteredItems}
            renderItem={(item) => {
              const { id, name, type, emails } = item;
              return (
                <ResourceItem id={id}>
                  <InlineStack align="space-between" blockAlign="center">
                    <div>
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name} <Badge>{type}</Badge>
                      </Text>
                      <Text as="span" tone="subdued">
                        View definition
                      </Text>
                    </div>
                    <div style={{ minWidth: "200px", textAlign: "right" }}>
                      <Text as="span">{emails.length} Members</Text>
                      <br />
                      <Text as="span" tone="subdued">
                        {new Date().toLocaleDateString()}
                      </Text>
                    </div>
                  </InlineStack>
                </ResourceItem>
              );
            }}
          />
        </BlockStack>
      </Card>
    </Page>
  );
}
