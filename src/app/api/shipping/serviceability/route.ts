import { NextRequest, NextResponse } from "next/server";
import { checkPincodeServiceability } from "@/lib/shipping/shiprocket";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode");
    const cod = searchParams.get("cod") === "1" || searchParams.get("cod") === "true";

    if (!pincode) {
      return NextResponse.json(
        { error: "PIN code parameter is required." },
        { status: 400 }
      );
    }

    const result = await checkPincodeServiceability(pincode, cod);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to check PIN code serviceability." },
      { status: 500 }
    );
  }
}

