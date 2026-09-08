import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import heroVilla from "@/assets/hero-villa.jpg";
import agentPortrait from "@/assets/agent-portrait.jpg";
import propertyIkoyi from "@/assets/property-ikoyi.jpg";
import propertyVictoria from "@/assets/property-victoria.jpg";
import propertyLekki from "@/assets/property-lekki.jpg";
import propertyMaitama from "@/assets/property-maitama.jpg";
import propertyWuse from "@/assets/property-wuse.jpg";
import propertyLekkiTownhouse from "@/assets/property-lekki-townhouse.jpg";

type Property = {
  id: number;
  title: string;
  price: string;
  city: "Lagos" | "Abuja";
  location: string;
  type: string;
  beds: number;
  baths: number;
  size: string;
  status: "Buy" | "Rent";
  image: string;
  description: string;
};

const properties: Property[] = [
  { id: 1, title: "5-Bed Waterfront Villa", price: "₦185m", city: "Lagos", location: "Ikoyi", type: "Villa", beds: 5, baths: 6, size: "620m²", status: "Buy", image: propertyIkoyi, description: "A private waterfront residence with a double-height lobby, six full bathrooms and a pool overlooking the lagoon. Title verified and ready for an immediate viewing." },
  { id: 2, title: "3-Bed Skyline Apartment", price: "₦2.4m /mo", city: "Lagos", location: "Victoria Island", type: "Apartment", beds: 3, baths: 4, size: "285m²", status: "Rent", image: propertyVictoria, description: "A light-filled apartment with floor-to-ceiling views, marble finishes and a full-service building in the heart of Victoria Island." },
  { id: 3, title: "4-Bed Garden Duplex", price: "₦92m", city: "Lagos", location: "Lekki Phase 1", type: "Duplex", beds: 4, baths: 5, size: "410m²", status: "Buy", image: propertyLekki, description: "A contemporary duplex with landscaped gardens, a private pool and generous entertaining spaces in a quiet Lekki compound." },
  { id: 4, title: "Executive Maitama Residence", price: "₦210m", city: "Abuja", location: "Maitama", type: "Residence", beds: 6, baths: 7, size: "800m²", status: "Buy", image: propertyMaitama, description: "A formal residence on a generous plot with a manicured garden, secure parking and the privacy expected of Maitama living." },
  { id: 5, title: "2-Bed Serviced Apartment", price: "₦1.8m /mo", city: "Abuja", location: "Wuse 2", type: "Apartment", beds: 2, baths: 2, size: "150m²", status: "Rent", image: propertyWuse, description: "A fully serviced, move-in-ready apartment with a calm interior, balcony outlook and easy access to Wuse 2's best amenities." },
  { id: 6, title: "4-Bed Townhouse", price: "₦140m", city: "Lagos", location: "Lekki", type: "Townhouse", beds: 4, baths: 4, size: "360m²", status: "Buy", image: propertyLekkiTownhouse, description: "A polished townhouse in a secure gated community with a private terrace, landscaped frontage and evening-lit communal streets." },
];

const whatsappUrl = "https://wa.me/2348100000000?text=Hello%20Ad%C3%A9%20Estates%2C%20I%27d%20like%20to%20discuss%20a%20property.";
const phoneUrl = "tel:+2348100000000";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adé Estates | Premium Real Estate in Lagos & Abuja" },
      { name: "description", content: "Discover verified homes, investment properties and expert guidance across Lagos and Abuja with Adé Estates." },
      { property: "og:title", content: "Adé Estates | Premium Real Estate in Lagos & Abuja" },
      { property: "og:description", content: "A curated property portfolio for buyers, renters and investors across Lagos and Abuja." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [finder, setFinder] = useState({ status: "All", city: "All locations", type: "All types", budget: "Any budget" });
  const [inquirySent, setInquirySent] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (activeFilter !== "All" && property.status !== activeFilter && property.city !== activeFilter) return false;
      if (finder.status !== "All" && finder.status !== property.status) return false;
      if (finder.city !== "All locations" && finder.city !== property.city) return false;
      if (finder.type !== "All types" && finder.type !== property.type) return false;
      const priceInMillions = Number.parseFloat(property.price.replace(/[^\d.]/g, ""));
      if (finder.budget === "Under ₦100m" && priceInMillions >= 100) return false;
      if (finder.budget === "₦100m–₦250m" && (priceInMillions < 100 || priceInMillions > 250)) return false;
      if (finder.budget === "Above ₦250m" && priceInMillions <= 250) return false;
      return true;
    });
  }, [activeFilter, finder]);

  const scrollToProperties = () => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquirySent(true);
  }

  return (
    <div className="min-h-screen bg-paper text-foreground selection:bg-brand selection:text-primary-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex min-w-0 items-baseline gap-2 font-display text-foreground" aria-label="Adé Estates home">
            <span className="shrink-0 text-lg font-extrabold tracking-tight">ADÉ</span>
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Estates · Lagos—Abuja</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft md:flex" aria-label="Primary navigation">
            <a href="#properties" className="transition-colors hover:text-foreground">Properties</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#areas" className="transition-colors hover:text-foreground">Areas</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={whatsappUrl} className="hidden bg-brand px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-brand/85 sm:inline-flex">WhatsApp Me</a>
            <button type="button" className="grid size-10 place-items-center border border-border md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation" aria-expanded={mobileMenuOpen}>
              <span className="font-mono text-xs">{mobileMenuOpen ? "×" : "Menu"}</span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && <nav className="border-t border-border bg-paper px-5 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="grid gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {["properties", "services", "about", "areas", "contact"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>{id}</a>)}
          </div>
        </nav>}
      </header>

      <main id="top" className="mx-auto max-w-[1280px] px-5 md:px-10">
        <section className="border-b border-border pb-14 pt-14 md:pb-20 md:pt-20">
          <p className="page-rise font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Private viewing room — Lagos · Abuja</p>
          <h1 className="page-rise mt-5 max-w-[16ch] font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground md:text-7xl">Find the right property in Lagos &amp; Abuja</h1>
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <div className="page-rise flex flex-col gap-5 md:col-span-5">
              <p className="max-w-[46ch] text-pretty font-body text-lg leading-relaxed text-ink-soft">Homes chosen with local insight. A curated shortlist of verified residences across Ikoyi, Lekki Phase 1, Victoria Island, Maitama and Wuse 2 — each one walked, checked and negotiated on your side.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={scrollToProperties} className="bg-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-background transition-colors hover:bg-foreground/85">View Properties</button>
                <a href={whatsappUrl} className="border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground">WhatsApp Me</a>
              </div>
            </div>
            <div className="page-rise md:col-span-7">
              <div className="overflow-hidden rounded-lg"><img src={heroVilla} alt="Modern waterfront villa in Ikoyi Lagos at dusk" width={1440} height={900} className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.02]" /></div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"><span>Featured · Ikoyi, Lagos</span><span>₦185m</span></div>
            </div>
          </div>
        </section>

        <section className="border-b border-border" aria-label="Adé Estates track record">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[['12+', 'Years in market'], ['340+', 'Properties closed'], ['260+', 'Clients served'], ['2', 'Cities covered']].map(([number, label], index) => <div key={label} className={`border-border py-6 ${index % 2 === 0 ? 'pr-6 md:pr-8' : 'pl-6 md:pl-8'} ${index < 2 ? 'border-b md:border-b-0' : ''} ${index !== 3 ? 'md:border-r' : ''}`}><p className="font-display text-3xl font-bold text-foreground">{number.includes('+') ? <>{number.replace('+', '')}<span className="text-brand">+</span></> : number}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{label}</p></div>)}
          </div>
        </section>

        <section id="properties" className="scroll-mt-20 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">The collection</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Featured properties</h2></div>
            <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.1em]" role="group" aria-label="Property filters">
              {['All', 'Buy', 'Rent', 'Lagos', 'Abuja'].map((filter) => <button key={filter} type="button" onClick={() => { setActiveFilter(filter); if (filter === 'Buy' || filter === 'Rent') setFinder({ ...finder, status: filter }); }} className={`border px-3 py-1.5 transition-colors ${activeFilter === filter ? 'border-brand bg-brand-soft text-brand' : 'border-border text-ink-soft hover:border-foreground'}`}>{filter}</button>)}
            </div>
          </div>
           {filteredProperties.length > 0 ? <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{filteredProperties.map((property) => <PropertyCard key={property.id} property={property} onOpen={() => setSelectedProperty(property)} />)}</div> : <div className="border-b border-border py-16 text-center font-body text-xl text-ink-soft">No properties match that brief. <button type="button" className="text-brand underline underline-offset-4" onClick={() => { setActiveFilter('All'); setFinder({ status: 'All', city: 'All locations', type: 'All types', budget: 'Any budget' }); }}>Clear filters</button></div>}
        </section>

         <section className="border-y border-border py-10" aria-labelledby="finder-title">
           <div className="grid gap-6 lg:grid-cols-[0.85fr_1.7fr] lg:items-end"><div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Private search</p><h2 id="finder-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">Find your next address</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Looking to<select value={finder.status} onChange={(event) => setFinder({ ...finder, status: event.target.value })} className="border border-border bg-paper px-3 py-3 font-body text-base normal-case tracking-normal text-foreground"><option value="All">Buy or rent</option><option>Buy</option><option>Rent</option></select></label><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Location<select value={finder.city} onChange={(event) => setFinder({ ...finder, city: event.target.value })} className="border border-border bg-paper px-3 py-3 font-body text-base normal-case tracking-normal text-foreground"><option>All locations</option><option>Lagos</option><option>Abuja</option></select></label><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Property type<select value={finder.type} onChange={(event) => setFinder({ ...finder, type: event.target.value })} className="border border-border bg-paper px-3 py-3 font-body text-base normal-case tracking-normal text-foreground"><option>All types</option><option>Villa</option><option>Apartment</option><option>Duplex</option><option>Residence</option><option>Townhouse</option></select></label><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Budget<select value={finder.budget} onChange={(event) => setFinder({ ...finder, budget: event.target.value })} className="border border-border bg-paper px-3 py-3 font-body text-base normal-case tracking-normal text-foreground"><option>Any budget</option><option>Under ₦100m</option><option>₦100m–₦250m</option><option>Above ₦250m</option></select></label></div></div>
        </section>

        <section id="about" className="scroll-mt-20 border-b border-border py-16 md:py-20"><div className="grid gap-10 md:grid-cols-12 md:items-center"><div className="md:col-span-5"><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">The advisor</p><h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">Why work with me</h2><p className="mt-4 max-w-[44ch] text-pretty font-body text-lg leading-relaxed text-ink-soft">Every residence is verified before it reaches your list. I bring local expertise, honest negotiation and end-to-end support — from the first walk-through to the final signature.</p><a href={whatsappUrl} className="mt-6 inline-block border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground">WhatsApp Me</a></div><div className="md:col-span-7"><img src={agentPortrait} alt="Adéọlá Adébáyọ̀, principal real-estate advisor" width={1024} height={1280} loading="lazy" className="aspect-[5/6] w-full rounded-lg object-cover object-top" /><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Adéọlá Adébáyọ̀ · Principal advisor</p></div></div></section>

        <section id="areas" className="scroll-mt-20 border-b border-border py-16 md:py-20"><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Neighbourhood intelligence</p><div className="mt-6 grid gap-10 sm:grid-cols-2"><AreaList city="Lagos" areas={[["Ikoyi", "14 listings"], ["Lekki Phase 1", "22 listings"], ["Victoria Island", "18 listings"]]} /><AreaList city="Abuja" areas={[["Maitama", "9 listings"], ["Wuse 2", "11 listings"], ["Asokoro", "7 listings"]]} /></div></section>

        <section id="services" className="scroll-mt-20 border-b border-border py-16 md:py-20"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">How I help</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">A considered service, end to end</h2></div><a href={whatsappUrl} className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand underline underline-offset-4">Discuss your brief</a></div><div className="mt-8 grid gap-0 border-y border-border sm:grid-cols-2 lg:grid-cols-4">{[['01', 'Property sales', 'Positioning, viewings and negotiation for a confident purchase or sale.'], ['02', 'Property sourcing', 'A private search built around your location, use and long-term brief.'], ['03', 'Investment advisory', 'Local market context to help you compare yield, risk and opportunity.'], ['04', 'Property management', 'Reliable oversight for owners who need their asset cared for on ground.']].map(([number, title, text]) => <div key={number} className="border-border py-6 sm:px-6 lg:border-r lg:first:pl-0 lg:last:border-r-0"><span className="font-mono text-[11px] text-gold">{number}</span><h3 className="mt-8 font-display text-xl font-bold text-foreground">{title}</h3><p className="mt-3 font-body text-lg leading-relaxed text-ink-soft">{text}</p></div>)}</div></section>

        <section className="border-b border-border py-16 md:py-20"><div className="flex items-end justify-between gap-5"><div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Client notes</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">Trusted by people who value clarity</h2></div><span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft sm:block">Selected client feedback</span></div><div className="mt-8 grid gap-8 md:grid-cols-3">{[['“Adéọlá understood that the right home was about more than square metres. She made the process calm, clear and genuinely personal.”', 'Tola A.', 'Ikoyi, Lagos'], ['“We needed a reliable Abuja investment and a local person we could trust. Every recommendation came with context, not pressure.”', 'Chinedu O.', 'Maitama, Abuja'], ['“From the first WhatsApp message to handover, the details were handled with unusual care. I would work with Adé again.”', 'Mariam K.', 'Lekki, Lagos']].map(([quote, name, location]) => <figure key={name} className="border-t-2 border-brand pt-5"><blockquote className="font-body text-2xl leading-tight text-foreground">{quote}</blockquote><figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{name} · {location}</figcaption></figure>)}</div></section>

        <section className="border-b border-border py-16 md:py-20"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Market intelligence</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">Notes for your next move</h2></div><a href={whatsappUrl} className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand underline underline-offset-4">Ask for the latest</a></div><div className="mt-8 grid gap-8 md:grid-cols-3">{[['01', 'What ₦200m buys in Lagos right now', 'A grounded look at the neighbourhoods, space and terms available to serious buyers.'], ['02', 'The quiet value of a well-managed rental', 'Why professional oversight matters for owners building a durable property portfolio.'], ['03', 'Maitama, Wuse 2 or Asokoro?', 'A practical comparison of three Abuja neighbourhoods for work, family and investment.']].map(([number, title, text]) => <article key={number} className="group border-t border-border pt-5"><p className="font-mono text-[11px] text-gold">{number}</p><h3 className="mt-7 font-display text-2xl font-bold text-foreground transition-colors group-hover:text-brand">{title}</h3><p className="mt-3 font-body text-lg leading-relaxed text-ink-soft">{text}</p><a href={whatsappUrl} className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground underline underline-offset-4 decoration-border group-hover:decoration-brand">Discuss this note</a></article>)}</div></section>

        <section id="contact" className="scroll-mt-20 py-16 md:py-20"><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Private inquiry</p><h2 className="mt-4 max-w-[20ch] font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Tell me what you&apos;re looking for</h2><p className="mt-4 max-w-[52ch] font-body text-lg leading-relaxed text-ink-soft">Share the basics and I&apos;ll come back with a shortlist that respects your budget, location and timing.</p><form onSubmit={submitInquiry} className="mt-8 grid gap-4 sm:grid-cols-3"><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Budget<input required name="budget" className="border border-border bg-paper px-4 py-3 font-body text-lg text-foreground outline-none transition-colors focus:border-brand" placeholder="e.g. ₦150m" /></label><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Location<input required name="location" className="border border-border bg-paper px-4 py-3 font-body text-lg text-foreground outline-none transition-colors focus:border-brand" placeholder="Lagos or Abuja" /></label><label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Property type<input required name="type" className="border border-border bg-paper px-4 py-3 font-body text-lg text-foreground outline-none transition-colors focus:border-brand" placeholder="Home, land or investment" /></label><div className="sm:col-span-3 flex flex-wrap items-center gap-4"><button type="submit" className="bg-brand px-6 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-brand/85">{inquirySent ? 'Brief received' : 'Send my brief'}</button><a href={whatsappUrl} className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand underline underline-offset-4">Prefer WhatsApp? Start here</a></div></form></section>
      </main>

      <footer className="border-t border-border bg-paper-deep"><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 md:grid-cols-4 md:px-10"><div><div className="flex items-baseline gap-2 font-display text-foreground"><span className="font-extrabold">ADÉ</span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Estates</span></div><p className="mt-3 max-w-[30ch] font-body text-sm text-ink-soft">Boutique real estate for Lagos &amp; Abuja. Verified, negotiated, delivered.</p></div><FooterColumn title="Navigate" items={['Properties', 'Services', 'About', 'Areas']} /><FooterColumn title="Coverage" items={['Ikoyi · Lekki · Victoria Island', 'Maitama · Wuse 2 · Asokoro']} /><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Contact</p><ul className="mt-3 space-y-2 font-body text-foreground"><li><a href={phoneUrl} className="hover:text-brand">+234 810 000 0000</a></li><li><a href={whatsappUrl} className="hover:text-brand">WhatsApp</a></li><li><a href="mailto:hello@ade-estates.ng" className="hover:text-brand">hello@ade-estates.ng</a></li><li><a href="#" className="hover:text-brand">Instagram</a></li></ul></div></div><div className="border-t border-border py-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">© 2026 Adé Estates · Lagos &amp; Abuja</div></footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3"><a href={whatsappUrl} className="grid size-12 place-items-center rounded-full bg-wa font-mono text-[10px] uppercase tracking-widest text-primary-foreground shadow-lg ring-1 ring-foreground/10 transition-transform hover:scale-105" aria-label="WhatsApp Adé Estates">WA</a><a href={phoneUrl} className="grid size-12 place-items-center rounded-full bg-foreground font-mono text-[10px] uppercase tracking-widest text-background shadow-lg ring-1 ring-foreground/10 transition-transform hover:scale-105" aria-label="Call Adé Estates">Call</a></div>

      {selectedProperty && <PropertyDialog property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
}

function PropertyCard({ property, onOpen }: { property: Property; onOpen: () => void }) {
  return <article className="group"><button type="button" onClick={onOpen} className="block w-full text-left"><div className="overflow-hidden rounded-lg"><img src={property.image} alt={`${property.title} in ${property.location}, ${property.city}`} width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><div className="mt-4 flex items-baseline justify-between gap-3"><p className="font-mono text-sm text-brand">{property.price}</p><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{property.location}, {property.city}</span></div><h3 className="mt-1 font-display text-lg font-bold text-foreground">{property.title}</h3><div className="mt-2 flex items-center justify-between gap-3 font-mono text-[11px] text-ink-soft"><span>{property.beds} bed · {property.baths} bath · {property.size}</span><span className="text-foreground underline underline-offset-4 decoration-border transition-colors group-hover:decoration-brand">View Property</span></div></button></article>;
}

function PropertyDialog({ property, onClose }: { property: Property; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex justify-end bg-foreground/35" role="dialog" aria-modal="true" aria-labelledby="property-dialog-title"><button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close property details" /><aside className="relative z-10 flex h-full w-full max-w-[480px] flex-col overflow-y-auto bg-paper shadow-2xl"><div className="flex items-center justify-between border-b border-border p-6"><span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">Property detail</span><button type="button" onClick={onClose} className="font-mono text-[11px] uppercase tracking-widest text-ink-soft hover:text-foreground" aria-label="Close property detail">Close</button></div><div className="space-y-5 p-6"><img src={property.image} alt={`${property.title} detail`} width={1024} height={768} className="aspect-[16/10] w-full rounded-lg object-cover" /><div className="flex items-baseline justify-between gap-4"><p className="font-mono text-lg text-brand">{property.price}</p><span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">{property.status} · {property.location}</span></div><h2 id="property-dialog-title" className="font-display text-2xl font-bold text-foreground">{property.title}</h2><p className="font-body text-lg leading-relaxed text-ink-soft">{property.description}</p><div className="grid grid-cols-3 gap-3 font-mono text-[11px]">{[[property.beds, 'Bedrooms'], [property.baths, 'Bathrooms'], [property.size, 'Floor area']].map(([value, label]) => <div key={String(label)} className="border border-border p-3"><p className="font-display text-base font-bold text-foreground">{value}</p><p className="mt-1 text-ink-soft">{label}</p></div>)}</div><a href={whatsappUrl} className="block bg-brand px-5 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground hover:bg-brand/85">WhatsApp about this property</a><a href={phoneUrl} className="block border border-border px-5 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-foreground hover:border-foreground">Book a viewing</a></div></aside></div>;
}

function AreaList({ city, areas }: { city: string; areas: string[][] }) {
  return <div><h3 className="font-display text-xl font-bold text-foreground">{city}</h3><ul className="mt-4 space-y-2 font-body text-lg text-ink-soft">{areas.map(([area, count], index) => <li key={area} className={`flex justify-between gap-4 ${index < areas.length - 1 ? 'border-b border-border pb-2' : ''}`}><span>{area}</span><span className="font-mono text-[11px]">{count}</span></li>)}</ul></div>;
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return <div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{title}</p><ul className="mt-3 space-y-2 font-body text-foreground">{items.map((item) => <li key={item}><a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="hover:text-brand">{item}</a></li>)}</ul></div>;
}