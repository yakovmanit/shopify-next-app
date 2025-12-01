import {getCollection} from "@/services/get-collection";
import {CollectionPage} from "@/components/collection";
import {Container} from "@/components/ui";
import {getProductTypesInCollection} from "@/services/get-product-types-in-collection";

interface PageProps {
  params: Promise<{ handle: string }>;
}


const availabilityOptions: string[] = [
  'Available',
  'Unavailable',
];

export default async function Collection({ params }: PageProps) {
  const { handle } = await params;

  const productTypes = await getProductTypesInCollection(handle);

  const uniqueProductTypes = [...new Set(productTypes)];

  const collection = await getCollection(handle, 3);

  if (!collection) {
    return <p>Collection not found</p>
  }

  return (
    <>
      <Container>
        <CollectionPage
          handle={handle}
          collection={collection}
          availabilityOptions={availabilityOptions}
          productTypes={uniqueProductTypes}
        />
      </Container>
    </>
  )
}