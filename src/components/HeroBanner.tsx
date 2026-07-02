import * as React from "react"
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
        <Carousel className="w-full h-fit bg-red-600">
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
            {/*<CarouselPrevious className={'left-10'} />*/}
            {/*<CarouselNext className={'right-10'} />*/}
        </Carousel>
    )
}
