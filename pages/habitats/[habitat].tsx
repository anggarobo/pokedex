import Layout from "~/components/layout";
import Tab from "~/components/tab";
import HabitatTabs from "~/components/tab/habitats";

function Habitat() {
    return (
        <Layout>
            <Tab />
            <HabitatTabs />
        </Layout>
    );
}

export default Habitat;