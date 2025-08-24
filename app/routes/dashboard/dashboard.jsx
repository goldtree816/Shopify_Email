import {
  Frame,
  Navigation,
  Page,
  Layout,
  LegacyCard,
  Text,
  Card,
  InlineGrid,
  BlockStack,
  Button,
  Badge,
} from "@shopify/polaris";
import {
  HomeIcon,
  SendIcon,
  MobileIcon,
  EmailIcon,
  ImageIcon,
  PageIcon,
  FormsIcon,
  FolderIcon,
} from "@shopify/polaris-icons";

export default function Dashboard() {
  return (
    <Frame>
      <Page fullWidth>
        <Layout>
          {/* Welcome Section */}
          <Layout.Section>
            <LegacyCard sectioned>
              <Text variant="headingLg">👋 Welcome back!</Text>
              <p>Here’s a quick overview of your business performance today.</p>
            </LegacyCard>
          </Layout.Section>

          {/* Stats / Summary Section */}
          <Layout.Section>
            <InlineGrid columns={4} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Orders</Text>
                  <Text variant="headingLg" tone="success">
                    245
                  </Text>
                  <Badge tone="success">+12% Today</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Revenue</Text>
                  <Text variant="headingLg" tone="critical">
                    $4,520
                  </Text>
                  <Badge tone="critical">-5% This week</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Visitors</Text>
                  <Text variant="headingLg">8,120</Text>
                  <Badge tone="info">+18% Growth</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Subscribers</Text>
                  <Text variant="headingLg">1,040</Text>
                  <Badge tone="attention">New</Badge>
                </BlockStack>
              </Card>
            </InlineGrid>
          </Layout.Section>

          {/* Quick Actions */}
          <Layout.Section>
            <LegacyCard sectioned>
              <Text variant="headingMd">⚡ Quick Actions</Text>
              <InlineGrid columns={3} gap="400">
                <Button icon={SendIcon} fullWidth>
                  Send Campaign
                </Button>
                <Button icon={ImageIcon} fullWidth>
                  Upload Media
                </Button>
                <Button icon={FormsIcon} fullWidth>
                  Create Form
                </Button>
              </InlineGrid>
            </LegacyCard>
          </Layout.Section>

          {/* Recent Activity / Updates */}
          <Layout.Section>
            <LegacyCard title="📌 Recent Activity" sectioned>
              <ul>
                <li>New order received from <b>Kamal</b> (2 mins ago)</li>
                <li>Email campaign <b>“Summer Sale”</b> sent (1 hour ago)</li>
                <li>New subscriber joined your newsletter (Today)</li>
              </ul>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
