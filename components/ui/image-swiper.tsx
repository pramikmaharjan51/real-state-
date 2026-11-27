"use client";
import * as React from 'react';
import { motion, useMotionValue, useReducedMotion, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
interface ImageSwiperProps extends React.HTMLAttributes<HTMLDivElement>{images:string[];imageAlts?:string[];onIndexChange?:(i:number)=>void;}
export function ImageSwiper({images,imageAlts,className,onIndexChange,...props}:ImageSwiperProps){
 const [imgIndex,setImgIndex]=React.useState(0);const dragX=useMotionValue(0);const reduced=useReducedMotion();const [failed,setFailed]=React.useState<Record<number,boolean>>({});
 React.useEffect(()=>{setImgIndex(i=>Math.min(i,Math.max(0,images.length-1)))},[images.length]);
 const go=(i:number)=>{const next=Math.max(0,Math.min(images.length-1,i));setImgIndex(next);onIndexChange?.(next)};
 if(!images.length)return <div className="h-full w-full grid place-items-center rounded-xl bg-muted">No images</div>;
 return <div className={cn('swiper-window group relative h-full w-full overflow-hidden rounded-xl bg-muted',className)} {...props}>
 <motion.div drag="x" dragConstraints={{left:0,right:0}} dragElastic={.14} dragMomentum={false} style={{x:dragX}} onDragEnd={(_,info)=>{if(info.offset.x< -32)go(imgIndex+1);else if(info.offset.x>32)go(imgIndex-1);animate(dragX,0,{duration:reduced?0:.17})}} className="h-full cursor-grab active:cursor-grabbing">
 <motion.div className="flex h-full w-full" animate={{x:`-${imgIndex*100}%`}} transition={reduced?{duration:0}:{type:'spring',damping:25,stiffness:180}}>
 {images.map((src,i)=><div key={src+i} className="relative h-full w-full shrink-0 overflow-hidden bg-muted">{failed[i]?<div className="grid h-full place-items-center text-xs text-muted-foreground">Photo unavailable</div>:<img src={src} alt={imageAlts?.[i]??'Illustrative architecture'} draggable={false} loading={i===0?'lazy':'lazy'} decoding="async" onError={()=>setFailed(old=>({...old,[i]:true}))} className="pointer-events-none h-full w-full object-cover"/>}</div>)}
 </motion.div></motion.div>
 {images.length>1&&<><div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-3"><Button aria-label="Previous image" type="button" size="icon" variant="ghost" disabled={imgIndex===0} className="swiper-nav pointer-events-auto h-9 w-9 rounded-full" onClick={()=>go(imgIndex-1)}><ChevronLeft size={18}/></Button><Button aria-label="Next image" type="button" size="icon" variant="ghost" disabled={imgIndex===images.length-1} className="swiper-nav pointer-events-auto h-9 w-9 rounded-full" onClick={()=>go(imgIndex+1)}><ChevronRight size={18}/></Button></div><div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center"><div className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">{images.map((_,i)=><button key={i} type="button" className="swipe-dot" aria-label={`Photo ${i+1}`} aria-current={i===imgIndex} onClick={()=>go(i)}/>)}<span className="ml-1" aria-live="polite">{imgIndex+1}/{images.length}</span></div></div></>}
 </div>
}
