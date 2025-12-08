import {Container} from "@/components/ui";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation';

export default async function Cabinet() {
  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;

  if (!token) {
    redirect('/');
  }

  return (
    <div>
      <Container>
        Account Page
      </Container>
    </div>
  );
}
