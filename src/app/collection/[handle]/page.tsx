import {getCollection} from "@/services/get-collection";
import {CollectionPage} from "@/components/collection";
import {Container} from "@/components/ui";
import {getTypesAndPricesInCollection} from "@/services/get-product-types-in-collection";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function Collection({ params }: PageProps) {
  const { handle } = await params;

  const productsData  = await getTypesAndPricesInCollection(handle);

  const uniqueProductTypes = [
    ...new Set(
      productsData
        ?.map(edge => edge?.node?.productType)
        .filter(Boolean)
    )
  ] as string[];

  const maxPrice = productsData?.reduce((max, edge) => {
    const variantPrices = edge?.node?.variants?.edges?.map(
      variantEdge => parseFloat(variantEdge?.node?.price?.amount || '0')
    ) || [];

    const currentMaxPrice = Math.max(...variantPrices, 0);
    return Math.max(max, currentMaxPrice);
  }, 0) || 1000;

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
          productTypes={uniqueProductTypes}
          maxPrice={maxPrice}
        />
      </Container>
    </>
  )
}