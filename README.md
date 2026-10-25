# FreeTools — bilingual online utilities

Static, client-side Arabic/English tools. No server or paid API is required.

**Included (14):** Unit Converter, BMI, Percentage, Age, Tip, Discount, Loan/EMI, BMR/Calories, Date Difference, Word Counter, Secure Password Generator, JSON Formatter/Validator, Image Compressor/Converter, QR Code Generator.

## Development
Install Node.js 18+ and run `node scripts/check-site.mjs` to validate links, sitemap, JavaScript syntax and calculator examples.

## Deployment
Designed for GitHub Pages from repository root on the `main` branch. GitHub Pages must be enabled in repository settings by an authorized maintainer; committing code alone does not guarantee publication.

## AdSense
Approval, publisher ID, advertising consent requirements, and site eligibility must be verified directly with Google. No live ad code or fictional publisher ID is included. Set up `ads.txt` only with the real authorized publisher ID after confirmation.

All currently implemented tool calculations and files are processed locally in the browser. QR creation uses the vendored MIT-licensed qrcodejs library; see `vendor/qrcode.LICENSE`.