import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ClientWidgets from "@/components/layout/client-widgets";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ClientWidgets />
            <BreadcrumbSchema />
        </>
    );
}
