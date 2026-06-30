import { CheckCircle2Icon } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function AlertBasic({title, description}: {title: string; description: string[]}) {
    return (
        <Alert className="w-full">
            <CheckCircle2Icon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {
                    description.map((desc: string, id) => (
                        <p key={id}>{desc}</p>
                    ))
                }
            </AlertDescription>

        </Alert>
    )
}
