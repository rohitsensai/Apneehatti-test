import slugify from "slugify";

function generateSiteMap(products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
      <loc>https://apneehatti.com</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/FAQs</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/forgot-password</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/login</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/myorders</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/myprofile</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/order_details</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/placeorder</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/policy</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/register</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/reset-password</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/search</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      <url>
      <loc>https://apneehatti.com/wishlist</loc>
      <lastmod>2023-09-08T13:15:57.172Z</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      </url>
      ${products
        .map((item) => {
          return `
        <url>
            <loc>${process.env.HOST}/search?q=${slugify(item.name)}</loc>
            <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
        </url>
      `;
        })
        .join("")}
        ${products
          .map((item) => {
            return `
         <url>
             <loc>${process.env.HOST}/product-detail/${encodeURIComponent(
              item.name
            )}?pid=${item._id}</loc>
             <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
         </url>
       `;
          })
          .join("")}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  let products = await fetch(`${process.env.HOST}/api/products/list`);
  products = await products.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(products);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
