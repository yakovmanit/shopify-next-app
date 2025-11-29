import {Container} from "@/components/ui";
import {getCollection} from "@/services/get-collection";
import {CollectionSection} from "@/components/CollectionSection";

export default async function Home() {
  const homeCollection = await getCollection();

  const products = homeCollection?.products?.edges?.map(product => ({
    id: product.node.id,
    title: product.node.title,
    price: product.node.priceRange.maxVariantPrice.amount,
    currencyCode: product.node.priceRange.maxVariantPrice.currencyCode,
    image: product.node.images.edges[0].node.url,
    handle: product.node.handle,
    description: product.node.description,
  }));

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
