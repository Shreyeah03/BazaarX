"""Generate BazaarX internship presentation PPTX for Shreya Khacharia."""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Colors
BG = RGBColor(0x0C, 0x0A, 0x12)
PURPLE = RGBColor(0xA8, 0x55, 0xF7)
ORANGE = RGBColor(0xF9, 0x73, 0x16)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GRAY = RGBColor(0xC4, 0xC4, 0xD0)
LIGHT = RGBColor(0xE8, 0xE8, 0xF0)


def set_run(run, size=18, bold=False, color=WHITE, name="Calibri"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = name


def add_bg(slide, prs):
    shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = BG
    shape.line.fill.background()


def add_accent_bar(slide, prs):
    bar = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, Inches(0.12), prs.slide_height
    )
    bar.fill.solid()
    bar.fill.fore_color.rgb = PURPLE
    bar.line.fill.background()
    bar2 = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0.12), 0, Inches(0.06), prs.slide_height
    )
    bar2.fill.solid()
    bar2.fill.fore_color.rgb = ORANGE
    bar2.line.fill.background()


def add_footer(slide, prs, page, total=10):
    box = slide.shapes.add_textbox(
        Inches(0.5), Inches(7.0), Inches(8.5), Inches(0.35)
    )
    tf = box.text_frame
    p = tf.paragraphs[0]
    run = p.add_run()
    run.text = f"BazaarX  |  Internship Presentation  |  {page}/{total}"
    set_run(run, 11, False, GRAY)
    p.alignment = PP_ALIGN.RIGHT


def title_box(slide, text, top=0.35, left=0.5, width=12.3, size=32):
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(0.7))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    run = p.add_run()
    run.text = text
    set_run(run, size, True, WHITE)
    return box


# Unused import cleanup - keep spacing helper unused param silent
def bullets(slide, items, top=1.2, left=0.55, width=12.2, size=18, spacing=1.0):
    _ = spacing
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(5.4))
    tf = box.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.level = 0
        p.space_after = Pt(10)
        run = p.add_run()
        run.text = f"•  {item}"
        set_run(run, size, False, LIGHT)


def two_col_bullets(slide, left_items, right_items, top=1.3):
    bullets(slide, left_items, top=top, left=0.55, width=6.0, size=16)
    bullets(slide, right_items, top=top, left=6.7, width=6.0, size=16)


def make_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank = prs.slide_layouts[6]

    # ========== SLIDE 1: Title ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)

    box = s.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.5), Inches(1))
    p = box.text_frame.paragraphs[0]
    run = p.add_run()
    run.text = "INTERNSHIP PRESENTATION"
    set_run(run, 16, True, ORANGE)
    p.alignment = PP_ALIGN.CENTER

    box = s.shapes.add_textbox(Inches(0.8), Inches(2.1), Inches(11.5), Inches(1.2))
    p = box.text_frame.paragraphs[0]
    run = p.add_run()
    run.text = "BazaarX"
    set_run(run, 48, True, WHITE)
    p.alignment = PP_ALIGN.CENTER

    box = s.shapes.add_textbox(Inches(0.8), Inches(3.2), Inches(11.5), Inches(0.6))
    p = box.text_frame.paragraphs[0]
    run = p.add_run()
    run.text = "Modern E-Commerce Web Application"
    set_run(run, 22, False, GRAY)
    p.alignment = PP_ALIGN.CENTER

    details = [
        "Presented by: Shreya Khacharia  |  Enrollment No.: 12302040701170",
        "Madhuben & Bhanubhai Patel Institute of Technology (MBIT)",
        "B.Tech in Computer Engineering",
        "Internship at Prelytix Private Limited  |  Duration: 12/05/2026 – 27/05/2026",
        "Guide: Anjali Suthar  |  Head of Department: Dr. Gopi Bhatt",
        "Date: 17 July 2026",
    ]
    box = s.shapes.add_textbox(Inches(1.2), Inches(4.1), Inches(10.8), Inches(2.8))
    tf = box.text_frame
    tf.word_wrap = True
    for i, line in enumerate(details):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = PP_ALIGN.CENTER
        p.space_after = Pt(6)
        run = p.add_run()
        run.text = line
        set_run(run, 14, False, LIGHT)

    # ========== SLIDE 2: About Internship ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "About the Internship")
    bullets(
        s,
        [
            "Organization: Prelytix Private Limited",
            "Duration: 12 May 2026 to 27 May 2026 (2 weeks)",
            "Domain: Frontend Web Development and UI/UX",
            "Project assigned: BazaarX – a modern e-commerce web application",
            "Industry Guide: Anjali Suthar",
            "Academic Head: Dr. Gopi Bhatt, Head of Department, Computer Engineering, MBIT",
            "Objective: Gain hands-on experience in building a production-style React frontend",
        ],
        size=18,
    )
    add_footer(s, prs, 2)

    # ========== SLIDE 3: Project Overview ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "Project Overview – BazaarX")
    bullets(
        s,
        [
            "BazaarX is a frontend e-commerce platform for sneakers, streetwear, watches, and tech products",
            "Designed as a startup-style product with dark glass UI and smooth animations",
            "Focus areas: reusable components, responsive layout, and clean user experience",
            "Catalog driven by realistic product data (JSON) with INR pricing",
            "Cart and wishlist persist in the browser using localStorage",
            "Ready for deployment on Vercel or Netlify as a static SPA",
        ],
        size=18,
    )
    add_footer(s, prs, 3)

    # ========== SLIDE 4: Objectives ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "Objectives")
    bullets(
        s,
        [
            "Build a complete e-commerce frontend with homepage, shop, and product details",
            "Implement search, filtering, sorting, and pagination for product discovery",
            "Create cart and wishlist workflows with quantity control and persistence",
            "Apply modern UI practices: glassmorphism, motion, skeleton loaders, toasts",
            "Use modular React structure (pages, components, context, utils)",
            "Prepare the project for GitHub and cloud deployment",
        ],
        size=18,
    )
    add_footer(s, prs, 4)

    # ========== SLIDE 5: Tech Stack ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "Technology Stack")
    two_col_bullets(
        s,
        [
            "Frontend library: React.js 18",
            "Build tool: Vite",
            "Styling: Tailwind CSS",
            "Routing: React Router DOM",
            "Animation: Framer Motion",
        ],
        [
            "Icons: Lucide React",
            "State: Context API",
            "Storage: localStorage",
            "Fonts: Fraunces + Plus Jakarta Sans",
            "Deploy: Vercel / Netlify configs",
        ],
    )
    add_footer(s, prs, 5)

    # ========== SLIDE 6: System Architecture ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "System Architecture")
    bullets(
        s,
        [
            "Presentation layer: Pages (Home, Shop, Product Detail, Wishlist, Checkout)",
            "Reusable UI: Navbar, Footer, ProductCard, CartDrawer, Toast, Skeleton",
            "State layer: CartContext, WishlistContext, ToastContext",
            "Data layer: products.json + helper utilities (formatPrice, filters, images)",
            "Routing layer: AppRoutes with React Router",
            "Persistence: cart and wishlist saved under bazaarx-cart / bazaarx-wishlist keys",
            "No backend in this phase – frontend-focused architecture suitable for SPA hosting",
        ],
        size=17,
    )
    add_footer(s, prs, 6)

    # ========== SLIDE 7: Modules & Features ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "Modules and Features")
    two_col_bullets(
        s,
        [
            "Landing: Hero, trending, categories, banner, collections",
            "Shop: Search, category/price/rating filters, sort, pagination",
            "Product Detail: Gallery, zoom, reviews, related items",
            "Cart Drawer: Add/remove, quantity, subtotal, checkout link",
        ],
        [
            "Wishlist: Save items and move to cart",
            "Theme: Dark / light mode with localStorage",
            "UX: Toasts, skeleton loaders, hover animations",
            "18 sample products across 6 categories",
        ],
    )
    add_footer(s, prs, 7)

    # ========== SLIDE 8: Implementation Highlights ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "Implementation Highlights")
    bullets(
        s,
        [
            "Context API used for shared cart, wishlist, and notification state",
            "Product listing supports multi-filter logic and 8 items per page",
            "ProductImage component handles broken image URLs with fallback UI",
            "INR currency formatting using Intl.NumberFormat (en-IN)",
            "Responsive design for mobile, tablet, and desktop",
            "Deployment configs added (vercel.json, netlify.toml) for SPA routing",
            "Copy and UI refined for a clean, professional product feel",
        ],
        size=17,
    )
    add_footer(s, prs, 8)

    # ========== SLIDE 9: Learning Outcomes ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)
    title_box(s, "Learning Outcomes")
    bullets(
        s,
        [
            "Practical experience with React component design and Vite tooling",
            "Understanding of client-side state management using Context API",
            "Applied routing, filtering, and pagination in a real UI flow",
            "Improved skills in Tailwind CSS and motion-based UI polish",
            "Learned localStorage for cart/wishlist persistence without a backend",
            "Gained familiarity with GitHub workflow and static site deployment",
            "Understood how to structure a frontend project for maintainability",
        ],
        size=17,
    )
    add_footer(s, prs, 9)

    # ========== SLIDE 10: Conclusion / Thank You ==========
    s = prs.slides.add_slide(blank)
    add_bg(s, prs)
    add_accent_bar(s, prs)

    box = s.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.5), Inches(0.8))
    p = box.text_frame.paragraphs[0]
    run = p.add_run()
    run.text = "Conclusion & Thank You"
    set_run(run, 36, True, WHITE)
    p.alignment = PP_ALIGN.CENTER

    box = s.shapes.add_textbox(Inches(1.2), Inches(2.4), Inches(10.8), Inches(2.2))
    tf = box.text_frame
    tf.word_wrap = True
    lines = [
        "BazaarX demonstrates a complete frontend shopping experience with modern UI,",
        "modular React architecture, and deploy-ready configuration.",
        "",
        "Future scope: authentication, real APIs, payment gateway, and admin panel.",
    ]
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = PP_ALIGN.CENTER
        p.space_after = Pt(4)
        run = p.add_run()
        run.text = line
        set_run(run, 16, False, LIGHT)

    box = s.shapes.add_textbox(Inches(1.2), Inches(4.6), Inches(10.8), Inches(1.8))
    tf = box.text_frame
    tf.word_wrap = True
    thanks = [
        "Thank you for your guidance and support.",
        "Guide: Anjali Suthar  |  HOD: Dr. Gopi Bhatt",
        "Prelytix Private Limited  |  MBIT – B.Tech Computer Engineering",
        "Shreya Khacharia  |  12302040701170  |  17 July 2026",
    ]
    for i, line in enumerate(thanks):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = PP_ALIGN.CENTER
        p.space_after = Pt(6)
        run = p.add_run()
        run.text = line
        set_run(run, 14 if i else 18, i == 0, ORANGE if i == 0 else GRAY)

    out = r"C:\Users\lenovo\.cursor\projects\empty-window\bazaarx\BazaarX_Internship_Presentation.pptx"
    prs.save(out)
    print(f"Saved: {out}")
    return out


if __name__ == "__main__":
    make_presentation()
