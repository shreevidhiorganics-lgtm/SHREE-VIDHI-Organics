import { NextResponse } from "next/server";
import { products } from "@/lib/data/initial-data";

export const dynamic = "force-dynamic";

/**
 * Generates Google Merchant Center compliant RSS 2.0 XML Product Feed
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shreevidhiorganics.com";

  const xmlItems = products
    .filter((p) => p.status === "PUBLISHED" && p.stock > 0)
    .map((p) => {
      const productUrl = `${baseUrl}/product/${p.slug}`;
      const imageUrl = p.images[0]?.url?.startsWith("http")
        ? p.images[0].url
        : `${baseUrl}${p.images[0]?.url || "/pictures/products/placeholder.png"}`;

      const title = escapeXml(p.name);
      const desc = escapeXml(p.shortDesc || p.description.slice(0, 300));
      const price = `${p.salePrice}.00 INR`;
      const availability = p.stock > 0 ? "in stock" : "out of stock";
      const category = escapeXml(p.categoryName || "Health & Beauty > Personal Care > Hair Care");

      return `
    <item>
      <g:id>${p.id}</g:id>
      <g:title>${title}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:brand>Shree Vidhi Organics</g:brand>
      <g:product_type>${category}</g:product_type>
      <g:google_product_category>469</g:google_product_category>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Express Courier</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`;
    })
    .join("");

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Shree Vidhi Organics Product Catalog</title>
    <link>${baseUrl}</link>
    <description>Authentic Ayurvedic formulations, wild-harvested herbs, and traditional Ubtans from Varanasi.</description>
${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(feedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
