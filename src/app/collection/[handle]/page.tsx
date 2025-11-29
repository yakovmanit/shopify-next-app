import {getCollection} from "@/services/get-collection";
import {CollectionSection} from "@/components/CollectionSection";
import {Container} from "@/components/ui";
import {normalizeProductsFromCollection} from "@/lib";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function Collection({ params }: PageProps) {
  const { handle } = await params;

  const collection = await getCollection(handle);

  const products = normalizeProductsFromCollection(collection);

  if (!collection) {
    return <p>Collection not found</p>
  }

  return (
    <>
     <Container>
       <CollectionSection title={collection.title} products={products} />
     </Container>
    </>
  )
}