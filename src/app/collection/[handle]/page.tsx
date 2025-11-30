import {getCollection} from "@/services/get-collection";
import {CollectionSection} from "@/components/CollectionSection";
import {Container} from "@/components/ui";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function Collection({ params }: PageProps) {
  const { handle } = await params;

  const collection = await getCollection(handle, 6);

  if (!collection) {
    return <p>Collection not found</p>
  }

  // TODO: pass products from server fetched collection to CollectionSection when first render !!!FOR SEO!!!

  return (
    <>
     <Container>
       {/*<CollectionSection title={collection.title} products={products} />*/}
       <CollectionSection
         title={collection.title}
         handle={handle}
       />
     </Container>
    </>
  )
}