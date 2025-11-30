import {getCollection} from "@/services/get-collection";
import {CollectionSection} from "@/components/CollectionSection";
import {Container} from "@/components/ui";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function Collection({ params }: PageProps) {
  const { handle } = await params;

  const collection = await getCollection(handle, 3);

  if (!collection) {
    return <p>Collection not found</p>
  }

  return (
    <>
     <Container>
       <CollectionSection
         title={collection.title}
         initialData={collection.products.edges}
         handle={handle}
       />
     </Container>
    </>
  )
}