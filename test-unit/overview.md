

1. WHAT THIS COMPANY IS (CORE IDEA)
This company is an AGENT COMPANY.
What that means in simple terms:
* They do not manufacture products
* They do not buy products
* They partner with technology-based companies
Examples of partners:
* Phone companies (Apple, Samsung, etc.)
* Laptop companies
* Bike / Electric bike companies
* Other tech-related product companies

How the company gets products
* Partner companies give them products for testing
* These are test / evaluation / trial units
* Products:
    * Are real
    * Are working
    * Have nothing wrong with them
* Because these products are not bought, the agent company:
    * Can resell them very cheaply
This is the main reason prices are extremely low.

What the website must communicate
From the moment someone lands on the site:
* They must understand:
    * What the company does
    * Why products are cheap
    * How the process works
* The website should replace customer support explanations
* Customers should decide on their own whether to buy
This is very important: 👉 The website is not salesy. 👉 It is informative and transparent.

2. WEBSITE PHILOSOPHY (VERY IMPORTANT)
* Simple
* Calm
* Not overwhelming
* flashy
* Not excessive
Even though:
* There is a lot of information It must be:
* Well placed
* Easy to read
* Easy to understand
* Structured logically
If things are messy, users get overwhelmed — we avoid that.

3. DEVELOPMENT APPROACH (YOUR PLAN)
You as the developer will:
* Use bolt.new to generate the UI
* Use Gemini inside VS Code to:
    * Make it functional
    * Connect logic
    * Handle interactions

4. PHASE STRUCTURE (VERY IMPORTANT)
Phase 1 (CURRENT FOCUS)
* Website is static
* No real backend
* No real database
* No real payment processing
But:
* It must look and feel like a real store

Product data in Phase 1
* Products will be stored in a JSON file
* This JSON acts like:
    * A fake database
    * A local API
* Pages pull data from this JSON:
    * Product name
    * Price
    * Images
    * Category
    * Description
    * And other infos inlcluded in the image used as reference 
So:
* Add to cart works
* Checkout flow works
* But nothing is truly connected to a real DB yet

Future phases (briefly acknowledged)
* Phase 2 / 3:
    * Real database
    * Dynamic content
    * Real backend But we do not focus on them now.

5. HOMEPAGE STRUCTURE (KEY POINTS)
First section (Hero / intro)
* Product imagery
*  pricing shown (  that's the page. On the page, let's say in the header it's going to be like a currency shown. This is how the current server works on default - it's going to determine the location of the user to determine the currency that it will show. Let's say you are in Nigeria, it will display Naira. If you are in USA, it will display dollar.
* 
* Now after that user has the opportunity to click on the currency, it's going to show a drop-down. Then you can select the currency you want to select. Among the drop-down is not going to display all the currencies in the world but it's going to display the top 15 most important ones. )
* Content explaining:
    * Cheap pricing
    * What the company does
* AI (bolt.new) can suggest wording

Informational sections
* Multiple sections explaining:
    * How sourcing works
    * Why products are cheap
    * Transparency
* These sections reduce customer questions

FULL-SCREEN CATEGORY SECTION (KEY POINT)
This is non-negotiable.
How it works:
* Section is:
    * 100% width
    * 100% height
* Displays categories, not individual products
Categories examples:
* Phones / Tablets
* Laptops
* Bikes / Electric bikes
* Other tech categories

Each category slide:
* Has a background product image
    * Phone image for phone category
    * Laptop image for laptop category
* Shows:
    * Category name
    * Button to view that category

Animation behavior
* Automatically transitions to the next category
* Also has:
    * Left button
    * Right button
* User can:
    * Wait for auto-switch
    * Or manually navigate
This is like:
* A full-screen animated category carousel

6. HEADER / NAVIGATION (KEY POINT)
* There is no traditional “Shop” page
* Instead:
    * A shop-like menu item exists
    * Clicking / hovering shows categories
Behavior:
* Hover or click:
    * Shows dropdown / menu group
* Categories listed there
* Clicking a category:
    * Takes user to category page
    * Shows only products in that category

7. CATEGORY PAGES
* Each category page:
    * Displays products belonging only to that category
* Products are loaded from JSON
* Clean layout
* Not cluttered

8. PRODUCT INTERACTION (VERY IMPORTANT KEY POINT)
On desktop:
* Add to Cart button:
    * Appears only on hover
* Keeps UI clean

When “Add to Cart” is clicked
* A slide-in panel comes from the right side
* Width:
    * Around 20% on desktop

Slide-in panel content
* Product image
* Product info (size, specs, etc.)
* Add to cart button inside panel

Cart behavior
* After adding:
    * Cart panel updates
* Shows:
    * Products added
    * Quantity selector
    * Individual prices
    * Subtotal
    * Total

9. CHECKOUT FLOW (PHASE 1 RULES)
Checkout page
* Keep:
    * Contact details
    * Delivery details
* Remove:
    * Google Pay
    * Apple Pay
* Keep card UI but disabled
    * Shows “Coming soon” / “In construction”

Payment method (IMPORTANT)
* Bitcoin is the ONLY working payment method
* Others remain visible but inactive
* On hover:
    * Show explanation message

Checkout layout
* Left:
    * Customer details
    * Payment
* Right:
    * Cart summary
    * Products
    * Subtotal
    * Total

10. IMAGES AS GUIDANCE (IMPORTANT)
* You will provide images:
    * To explain interactions
    * To explain layouts
* These images are:
    * Blueprints
    * References
* The final UI must be:
    * Original
    * Unique
    * Not copied

11. FINAL IMPORTANT RULE YOU SET
* When you specify a key point, it must be followed exactly
* Everything else:
    * bolt.new can decide
    * As long as:
        * It’s simple
        * It’s not overwhelming
        * It respects usability

12. Use Next JS Latest Version  You must use the latest next JHS to build this application. The latest next JHS with all the most beautiful design, all the most beautiful workflow. How everything will look beautiful. This has to be the most beautiful of this kind of page. Don't build a fucking bots page. I'm requesting this to be specifically beautiful.   13 Be aware that the image attached as guidance is not entirely how we want this to be, but it is just to show you the blueprint of our key points. I'm not saying that only parts that we need to be; I'm sure you probably understand what I'm trying to see and what I'm trying to get. Of course, we want it to be like the image attached (yes, we want it to be like that), but I'm saying that's not the entire thing that we need to build. Of course, some images are not attached that we still need to build their features. How would they need to look like? But there's no image attached to how we are going to build them, so you get my point, correct?

