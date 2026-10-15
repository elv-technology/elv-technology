import SolutionPage, { solutionPageMetadata } from "@/components/solutions/solution-page";

export const metadata = solutionPageMetadata("home-automation");

export default function HomeAutomationPage() {
    return <SolutionPage slug="home-automation" />;
}
