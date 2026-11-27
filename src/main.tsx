import React from 'react';
import {createRoot} from 'react-dom/client';
import { ArrowRight, ArrowLeft, Building2, MapPin, Layers3, BriefcaseBusiness, Images, Sparkles } from 'lucide-react';
import { PerspectiveFlipCard } from '@/components/ui/card-14';
import { ImageSwiper } from '@/components/ui/image-swiper';
import { CardTitle } from '@/components/ui/card';
import './globals.css';
const assets=[{"image":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=82","alt":"Illustrative office architecture","name":"Office","description":"Professional workplaces","features":["Office space","Workplace strategy","Leasing & sales"],"extra":["photo-1497366754035-f200968a6e72","photo-1497366811353-6870744d04b2"]},{"image":"https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=82","alt":"Illustrative multifamily architecture","name":"Multifamily","description":"Residential investment assets","features":["Residential assets","Income property","Investment sales"],"extra":["photo-1600607687939-ce8a6c25118c","photo-1600566753086-00f18fb6b3ea"]},{"image":"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=82","alt":"Illustrative retail architecture","name":"Retail","description":"Spaces for commerce","features":["Retail space","Tenant demand","Leasing & sales"],"extra":["photo-1604719312566-8912e9227c6a","photo-1555529669-e69e7aa0ba9a"]},{"image":"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=82","alt":"Illustrative industrial architecture","name":"Industrial","description":"Logistics and flex space","features":["Industrial assets","Logistics & flex","Leasing & sales"],"extra":["photo-1587293852726-70cdb56c2866","photo-1565610222536-ef125c59da2e"]},{"image":"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=82","alt":"Illustrative hospitality architecture","name":"Hospitality","description":"Hotel and hospitality assets","features":["Hospitality","Operating assets","Investment sales"],"extra":["photo-1542314831-068cd1dbfeeb","photo-1611892440504-42a792e24d32"]},{"image":"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82","alt":"Illustrative land architecture","name":"Land","description":"Development and investment sites","features":["Development sites","Land strategy","Acquisition"],"extra":["photo-1470071459604-3b5ec3a7fe05","photo-1501785888041-af3ef285b470"]}];
const listing='https://svn.com/properties/?companyId=36';
const photo=(id:string)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1000&q=80';
type Asset=typeof assets[number];
function EstateCard({asset,index}:{asset:Asset;index:number}){
 const [flipped,setFlipped]=React.useState(false);
 const [imageIndex,setImageIndex]=React.useState(0);
 const frontButton=React.useRef<HTMLButtonElement>(null),backButton=React.useRef<HTMLButtonElement>(null);
 const [focusSide,setFocusSide]=React.useState(false);
 const hoverTimer=React.useRef<ReturnType<typeof setTimeout>|null>(null);
 const autoFlip=React.useRef(false);
 const clear=()=>{if(hoverTimer.current){clearTimeout(hoverTimer.current);hoverTimer.current=null}};
 React.useEffect(()=>()=>{if(hoverTimer.current)clearTimeout(hoverTimer.current)},[]);
 React.useEffect(()=>{if(!focusSide)return;const t=setTimeout(()=>{(flipped?backButton:frontButton).current?.focus();setFocusSide(false)},matchMedia('(prefers-reduced-motion:reduce)').matches?0:390);return()=>clearTimeout(t)},[flipped,focusSide]);
 const flip=(next:boolean,focus=true)=>{clear();autoFlip.current=false;setFlipped(next);if(focus)setFocusSide(true)};
 const imgs=[asset.image,...asset.extra.map(photo)];
 const front=<div className="flex size-full flex-col [transform-style:preserve-3d]">
 <div className="relative h-[244px] shrink-0 w-full [transform:translateZ(18px)] [transform-style:preserve-3d]"><ImageSwiper images={imgs} imageAlts={[asset.alt,...asset.extra.map(()=>asset.name+' visual inspiration — illustrative photograph')]} onIndexChange={setImageIndex}/><span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/70 bg-background/90 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-foreground shadow-sm"><Images className="mr-1.5 inline size-3.5"/> ILLUSTRATIVE</span></div>
 <div className="flex flex-1 flex-col justify-between gap-3 px-3 pb-3 pt-5 [transform-style:preserve-3d]">
 <div className="space-y-2 [transform:translateZ(20px)]" onPointerEnter={e=>{if(e.pointerType==='mouse'&&!matchMedia('(prefers-reduced-motion:reduce)').matches){clear();hoverTimer.current=setTimeout(()=>{autoFlip.current=true;setFlipped(true)},950)}}} onPointerLeave={clear}>
 <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.12em] text-primary"><span>Asset / {String(index+1).padStart(2,'0')}</span><span>SVN Network</span></div>
 <CardTitle className="estate-title">{asset.name}</CardTitle><p className="estate-copy text-muted-foreground">{asset.description}</p>
 <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={13}/> Southern California market</div>
 </div>
 <div className="mt-auto [transform:translateZ(12px)]"><p className="estate-copy mb-3 text-[11px] text-muted-foreground">Swipe photos · {imageIndex+1} of {imgs.length}</p><button ref={frontButton} type="button" className="flip-action w-full" onClick={()=>flip(true)}>Explore asset details <ArrowRight size={16}/></button></div>
 </div></div>;
 const icons=[Building2,Layers3,BriefcaseBusiness];
 const back=<div className="flex size-full flex-col items-center justify-between gap-4 py-3 [transform-style:preserve-3d]">
 <div className="space-y-2 [transform:translateZ(24px)]"><div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary"><Sparkles size={14}/> Commercial perspective</div><h3 className="estate-title">{asset.name}</h3><p className="estate-copy text-muted-foreground">Explore opportunities with SVN’s commercial real estate network.</p></div>
 <div className="grid w-full grid-cols-3 gap-2 [transform:translateZ(32px)]">{asset.features.map((f,i)=>{const Icon=icons[i];return <div className="back-feature" key={f}><Icon size={21} className="text-primary"/><span>{f}</span></div>})}</div>
 <div className="space-y-2 [transform:translateZ(22px)]"><h4 className="text-sm font-bold text-foreground">Pricing & availability</h4><p className="estate-copy text-muted-foreground">Check official listings for current pricing, availability and property-specific information.</p></div>
 <div className="w-full space-y-2 [transform:translateZ(20px)]"><a href={listing} target="_blank" rel="noopener noreferrer" className="backAction">Find official listings <ArrowRight size={15}/></a><button ref={backButton} type="button" className="flip-action w-full" onClick={()=>flip(false)}><ArrowLeft size={15}/> Back to photo gallery</button></div></div>;
 return <article aria-label={asset.name+' asset category'} onPointerLeave={()=>{clear();if(autoFlip.current){autoFlip.current=false;setFlipped(false)}}} onKeyDown={e=>{if(e.key==='Escape'&&flipped){e.preventDefault();flip(false)}}}><PerspectiveFlipCard className="w-full" front={front} back={back} flipped={flipped} h="h-[510px]" w="w-full"/></article>
}
function EstateGallery(){return <div className="estate-grid">{assets.map((asset,index)=><EstateCard key={asset.name} asset={asset} index={index}/>)}</div>}
const root=document.getElementById('estate-cards');if(root)createRoot(root).render(<EstateGallery/>);

import { DiscoveryWorkspace, InvestmentWorkspace, AdvisorGuide } from './premium';
for(const [id,Component] of [['property-discovery',DiscoveryWorkspace],['investment-workspace',InvestmentWorkspace],['advisor-guide',AdvisorGuide]] as const){const node=document.getElementById(id);if(node)createRoot(node).render(<Component/>);}
