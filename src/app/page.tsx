import {Container} from "@/components/ui";
import {getCollection} from "@/services";
import {CollectionSection} from "@/components/collection";
import Link from "next/link";

export default async function Home() {
  const homeCollection = await getCollection("frontpage", 3);

  return (
    <div>
      <Container>
        <CollectionSection
          title={homeCollection?.title}
          initialData={homeCollection?.products.edges ?? []}
        />

        <Link href={`/collection/${homeCollection?.handle}`} className="text-xl ml-auto mt-10 w-fit block bg-blue-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          View all
        </Link>
      </Container>
    </div>
  );
}
