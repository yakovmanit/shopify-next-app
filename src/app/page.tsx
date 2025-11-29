import {Container} from "@/components/ui";
import {getCollection} from "@/services/get-collection";
import {CollectionSection} from "@/components/CollectionSection";
import {normalizeProductsFromCollection} from "@/lib";

export default async function Home() {
  const homeCollection = await getCollection("frontpage");

  const products = normalizeProductsFromCollection(homeCollection);

  return (
    <div>
      <Container>
        <CollectionSection
          title={homeCollection?.title}
          products={products}
        />
      </Container>
    </div>
  );
}
