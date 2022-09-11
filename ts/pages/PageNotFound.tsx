import Page, { PageEntry } from "../Page";

export default function PageNotFound() {
    return (
        <Page width="normal">
            <PageEntry>
                <h1 style={{
                fontWeight: "normal",
                fontSize: '1.4rem',
                marginBottom: '0.2rem'
                }}>
                    404 - Page not found
                </h1>
                <p style={{
                fontWeight: "normal",
                fontSize: '0.9rem'
                }}>
                    The requested page could not be found. Check the URL again or use the nav bar to find what you're looking for.
                </p>
            </PageEntry>
        </Page>
    );
}