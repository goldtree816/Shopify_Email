import { Box, Card, EmptyState, Frame, Icon, InlineGrid, Layout, Page, Text } from "@shopify/polaris";
import { ImportIcon, NoteIcon, PageIcon } from "@shopify/polaris-icons";

export default function Managelist() {
    return (
        <Frame>
            <Page fullWidth title="All the list of your Costumers">
                <Layout>
                    <Layout.Section>
                        <Card fullWidth>
                            <EmptyState heading="There is not anyone in this list"
                                action={{ content: "Create a Signup form", icon: NoteIcon }}
                                secondaryAction={{ content: "Add s Subscribe Page", icon: PageIcon }}
                            />
                            <p>How would you like to add people</p>
                            <Box>
                                <InlineGrid columns={3} gap="400" align="center">
                                    <Card sectioned>
                                        <Box textAlign="center">
                                            <Icon source={NoteIcon} tone="base" />
                                            <Text>Create a sign up form</Text>
                                        </Box>
                                    </Card>
                                    <Card sectioned>
                                        <Box textAlign="center">
                                            <Icon source={PageIcon} tone="base" />
                                            <Text>Add a Subscribe Page</Text>
                                        </Box>
                                    </Card>
                                    <Card sectioned>
                                        <Box textAlign="center">
                                            <Icon source={ImportIcon} tone="base" />
                                            <Text>Upload Contacts</Text>
                                        </Box>
                                    </Card>
                                </InlineGrid>
                            </Box>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>

    )
}