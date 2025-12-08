import {NextResponse} from "next/server";
import {TLoginSchema} from "@/types";
import {ShopifyData} from "@/lib";
import {CREATE_ACCESS_TOKEN_MUTATION} from "@/constants/queries";
import {CreateAccessTokenMutation} from "@/types/storefront/storefront.generated";

export async function POST(req: Request) {
  try {
    const body: TLoginSchema = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const data: CreateAccessTokenMutation = await ShopifyData(CREATE_ACCESS_TOKEN_MUTATION, {
      email: body.email,
      password: body.password,
    })

    const result = data?.customerAccessTokenCreate;
    const token = result?.customerAccessToken?.accessToken;
    const error = result?.customerUserErrors?.[0];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });

    const COOKIE_OPTIONS = {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    };

    res.cookies.set("customer_token", token, COOKIE_OPTIONS);

    return res;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}