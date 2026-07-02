"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function HeroBanner() {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Card className={'p-0 overflow-hidden'}>
                            <CardContent className="flex items-center justify-center p-0">
                                <Image src={'https://gmedia.playstation.com/is/image/SIEPDC/Grand-Theft-Auto-VI-pre-order-homepage-hero-desktop-03-24jun26$en?$2400px$'} alt={'gta6'} height={1000} width={1000} className={'w-full'} />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={'hidden md:flex'} />
            <CarouselNext className={'hidden md:flex'} />
        </Carousel>
    )
}
