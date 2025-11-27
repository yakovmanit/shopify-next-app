import {Container} from "@/components/ui";
import {ProductList} from "@/components/product";

export default function Home() {
  return (
    <div>
      <Container>
        <h1 className="text-3xl font-bold mb-6 mt-20">Home page products</h1>

        <ProductList />
      </Container>
    </div>
  );
}
