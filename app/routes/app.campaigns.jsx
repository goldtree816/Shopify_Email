import {
  Frame,
  Page,
  Layout,
  LegacyCard,
  Text,
  TextField,
  Button,
  Select,
  InlineStack,
  DatePicker,
  BlockStack,
  ChoiceList,
} from "@shopify/polaris";
import { useState } from "react";

export default function Campaigns() {
  const [campaignName, setCampaignName] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  const [audience, setAudience] = useState("all");
  const [scheduleType, setScheduleType] = useState(["now"]);

  return (
    <Frame>
      <Page title="📧 Create Email Campaign" fullWidth>
        <Layout>
          {/* Campaign Details */}
          <Layout.Section>
            <LegacyCard title="Campaign Details" sectioned>
              <BlockStack gap="400">
                <TextField
                  label="Campaign Name"
                  value={campaignName}
                  onChange={setCampaignName}
                  placeholder="e.g. Summer Sale Blast"
                  autoComplete="off"
                />
                <TextField
                  label="Subject Line"
                  value={subjectLine}
                  onChange={setSubjectLine}
                  placeholder="Catchy subject line"
                  autoComplete="off"
                />
                <Select
                  label="Select Audience"
                  options={[
                    { label: "All Subscribers", value: "all" },
                    { label: "VIP Customers", value: "vip" },
                    { label: "Inactive Users", value: "inactive" },
                  ]}
                  onChange={setAudience}
                  value={audience}
                />
              </BlockStack>
            </LegacyCard>
          </Layout.Section>

          {/* Email Content */}
          <Layout.Section>
            <LegacyCard title="Email Content" sectioned>
              <Text variant="headingSm">Message Body</Text>
              <TextField
                multiline={6}
                placeholder="Write your email content here..."
                autoComplete="off"
              />
              <InlineStack gap="400" align="end">
                <Button variant="secondary">Use Template</Button>
                <Button variant="secondary">Upload HTML</Button>
              </InlineStack>
            </LegacyCard>
          </Layout.Section>

          {/* Schedule Options */}
          <Layout.Section>
            <LegacyCard title="Schedule" sectioned>
              <ChoiceList
                title="When do you want to send this campaign?"
                choices={[
                  { label: "Send Now", value: "now" },
                  { label: "Schedule for Later", value: "later" },
                ]}
                selected={scheduleType}
                onChange={setScheduleType}
              />
              {scheduleType.includes("later") && (
                <DatePicker
                  month={8}
                  year={2025}
                  onChange={() => {}}
                  onMonthChange={() => {}}
                  selected={new Date()}
                />
              )}
            </LegacyCard>
          </Layout.Section>

          {/* Review & Launch */}
          <Layout.Section>
            <LegacyCard sectioned>
              <InlineStack gap="400" align="end">
                <Button variant="secondary">Save Draft</Button>
                <Button primary>Launch Campaign</Button>
              </InlineStack>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
