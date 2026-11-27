"use client";
import * as React from 'react';
import {cn} from '@/lib/utils';
interface PerspectiveFlipCardProps {className?:string;front:React.ReactNode;back:React.ReactNode;h?:string;w?:string;flipped?:boolean;}
/** Adapted Card 14: gallery-safe controlled flip; both faces retain perspective depth. */
export function PerspectiveFlipCard({className,front,back,h='h-[500px]',w='w-full',flipped=false}:PerspectiveFlipCardProps){
 const frontRef=React.useRef<HTMLDivElement>(null),backRef=React.useRef<HTMLDivElement>(null);
 React.useEffect(()=>{frontRef.current?.toggleAttribute('inert',flipped);backRef.current?.toggleAttribute('inert',!flipped)},[flipped]);
 return <div className={cn('group/p-card [perspective:2000px]',h,w,className)}>
 <div className="flip-inner relative h-full w-full rounded-2xl [transform-style:preserve-3d]" data-flipped={flipped}>
 <div ref={frontRef} aria-hidden={flipped} className="flip-face absolute inset-0 size-full rounded-2xl border border-border bg-card text-card-foreground [transform-style:preserve-3d] [backface-visibility:hidden]"><div className="size-full p-3 [transform-style:preserve-3d]">{front}</div></div>
 <div ref={backRef} aria-hidden={!flipped} className="flip-face absolute inset-0 size-full rounded-2xl border border-border bg-card text-card-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]"><div className="flex size-full flex-col items-center justify-center p-5 text-center [transform-style:preserve-3d]">{back}</div></div>
 </div></div>
}
export default PerspectiveFlipCard;
