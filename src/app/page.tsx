import {Container} from "@/components/ui";
import {getCollection} from "@/services/get-collection";
import {CollectionSection} from "@/components/CollectionSection";

export default async function Home() {
  const homeCollection = await getCollection("frontpage", 3);

  return (
    <div>
      <Container>
        <CollectionSection
          title={homeCollection?.title}
          handle="frontpage"
        />
      </Container>
    </div>
  );
}
