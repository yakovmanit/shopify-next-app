import {Container} from "@/components/ui";
import {ProductList} from "@/components/product";
import {getProductsFromCollection} from "@/services/get-products-from-collection";

export default async function Home() {
  const homeCollectionProducts = await getProductsFromCollection();

  const products = homeCollectionProducts?.map(product => ({
    id: product.id,
    title: product.title,
    price: product.priceRange.maxVariantPrice.amount,
    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
    image: product.images.edges[0].node.url,
    handle: product.handle,
    description: product.description,
  }));

  return (
    <div>
      <Container>
        <h1 className="text-3xl font-bold mb-6 mt-20">Home page products</h1>

        <ProductList products={products} />
      </Container>
    </div>
  );
}
