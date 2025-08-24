import { useState } from "react";
import {
  Page,
  Card,
  ResourceList,
  ResourceItem,
  Text,
  TextField,
  Select,
  Button,
  InlineStack,
  Tag,
  Badge,
} from "@shopify/polaris";

export default function ListsAndSegmentsPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("all");

  const items = [
    { id: "1", name: "New Subscribers", type: "Segment", members: 4, created: "Dec 15, 2020, 11:52 am" },
    { id: "2", name: "Preview List", type: "List", members: 5, created: "Dec 15, 2020, 11:52 am" },
    { id: "3", name: "Engaged (3 Months)", type: "Segment", members: 0, created: "Dec 15, 2020, 11:52 am" },
    { id: "4", name: "Newsletter", type: "List", members: 6, created: "Dec 15, 2020, 11:52 am" },
    { id: "5", name: "Unengaged (1 Year)", type: "Segment", members: 0, created: "Dec 15, 2020, 11:52 am" },
    { id: "6", name: "Unengaged (3 Months)", type: "Segment", members: 0, created: "Dec 15, 2020, 11:52 am" },
    { id: "7", name: "Churn Risks", type: "Segment", members: 0, created: "Dec 15, 2020, 11:52 am" },
  ];

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

  return (
    <Page
      title="Lists & Segments"
      primaryAction={{ content: "Create List / Segment" }}
      secondaryActions={[{ content: "Inactive Segments" }]}
    >
      <Card>
        <InlineStack gap="400" align="start" blockAlign="center" wrap={false}>
          <TextField
            placeholder="Search lists & segments"
            value={searchValue}
            onChange={setSearchValue}
            autoComplete="off"
          />
          <TextField placeholder="Select tags..." disabled />
          <Select
            options={filterOptions}
            value={filterType}
            onChange={setFilterType}
          />
        </InlineStack>

        <ResourceList
          resourceName={{ singular: "list", plural: "lists" }}
          items={filteredItems}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          renderItem={(item) => {
            const { id, name, type, members, created } = item;
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
                    <Text as="span">{members} Members</Text>
                    <br />
                    <Text as="span" tone="subdued">
                      {created}
                    </Text>
                  </div>
                </InlineStack>
              </ResourceItem>
            );
          }}
        />
      </Card>
    </Page>
  );
}
