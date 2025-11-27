import {Container} from "@/components/ui";
import Image from "next/image";
import {getProductByHandle} from "@/services/get-product-by-handle";

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
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-8 md:py-12">
          <div className="flex h-fit bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200'}
              alt={'autopart'}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <div className="py-4 border-y border-gray-200">
              <div className='mb-6 last:mb-0'>
                <span className="text-gray-600 font-semibold text-lg">Color:</span>

                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <button className='rounded-md px-4 font-semibold py-2 border border-gray-300 text-gray-600 hover:bg-gray-300 transition-colors'>
                    S
                  </button>
                  <button className={`rounded-md px-4 font-semibold py-2 border border-gray-300 text-gray-600 hover:bg-gray-300 transition-colors ${true === true ? 'bg-gray-200' : ''}`}>
                    S
                  </button>
                </div>
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-semibold text-gray-900">{product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}</p>

            <div className="mt-auto">
              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}