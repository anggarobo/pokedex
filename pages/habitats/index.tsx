import Layout from "~/components/layout";
import Tab from "~/components/tab";
import HabitatTabs from '~/components/tab/habitats';

function Habitats() {
    return (
        <Layout>
            <Tab />
            <HabitatTabs />
        </Layout>
    );
}

export default Habitats;