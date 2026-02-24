import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url);

    let make = searchParams.get("make") || "";
    let model = searchParams.get("model") || "";
    let fuel = searchParams.get("fuel_type") || "";
    let year = searchParams.get("year") || "";
    let limit = searchParams.get("limit") || "10";

    // ✅ IMPORTANT FIX: fallback model
    if (!make && !model) {
      model = "corolla";
    }

    const apiUrl = new URL(
      "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars"
    );

    if (make)
      apiUrl.searchParams.append("make", make);

    if (model)
      apiUrl.searchParams.append("model", model);

    if (fuel)
      apiUrl.searchParams.append("fuel_type", fuel);

    if (year)
      apiUrl.searchParams.append("year", year);

    if (limit)
      apiUrl.searchParams.append("limit", limit);

    console.log("Fetching:", apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
        "X-RapidAPI-Host":
          "cars-by-api-ninjas.p.rapidapi.com",
      },
    });

    const data = await response.json();

    return NextResponse.json(
      Array.isArray(data) ? data : []
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json([], { status: 500 });

  }
}