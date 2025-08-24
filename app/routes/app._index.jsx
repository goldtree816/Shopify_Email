import {
  Page,
  BlockStack,

} from "@shopify/polaris";

// import pkg from "@shopify/polaris";
// const {Section, Page, BlockStack }= pkg;
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import Dashboard from "./dashboard/dashboard";
export default function Index() {
  return (
    <Page>
      <TitleBar title="Bulk-sms dashboard">
      </TitleBar>
      <BlockStack gap="500">
        <Dashboard/>
      </BlockStack>
    </Page>
  );
}
