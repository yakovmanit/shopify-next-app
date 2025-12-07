import {getProductByHandle} from "@/services";
import {PageContent} from "@/components/product/PageContent";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function Product({ params }: PageProps) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <>
      <PageContent product={product} />
    </>
  )
}